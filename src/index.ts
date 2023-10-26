import { mapDimensions } from "./MapUtility";
import { log } from "./log";
import { annotateAll, annotationColor, colorByString, colorByValue as colorNameByValue, getAnnotationAt } from "./annotate";
import { getNeighbourPoints, point } from "./point";
import { makeSet } from "./SeenSet";

log("Hello World!")
log("script params: " + JSON.stringify(params))
log("map dimensions:" + JSON.stringify(mapDimensions()))

const { start, end } = mapDimensions()
const startAnnotation = annotationColor.CYAN
const expandedAnnotation = annotationColor.ORANGE
const isStartAnnotated = (p: point) => {
    return getAnnotationAt(p) == startAnnotation
}

const colorListFromString = (usercolors: string): number[] => {
    const colorstrings = usercolors.toLowerCase().split(" ").join("").split(",");
    const colorList = colorstrings.map(a => ({ name: a, value: colorByString(a) }));
    const illegals = colorList.filter(a => a.value == undefined);
    if (illegals.length != 0)
        throw TypeError("unknown colors given:" + illegals.map(a => a.name).toString())

    return colorList.map(a => a.value!);
}

const colorByIteration = (i: number): number => {
    return colorList[Math.max(0, Math.min(i, colorList.length - 1))];
}

const colorList = colorListFromString(params.colors);
log("color list:" + colorList + " => " + colorList.map(colorNameByValue));
for (let i = 0; i < params.iterations; i++) {
    log("layer " + i + " => " + colorByIteration(i))
}



const canBeExpanded = (p: point) => !isStartAnnotated(p) && getAnnotationAt(p) == 0

const { iterations, chance, colors } = params
log(`iterations: ${iterations}, chance: ${chance}, colors: ${colors}`)
const getOpenList = () => {
    const open: point[] = []
    for (let x = start.x; x < end.x; x++) {
        for (let y = start.y; y < end.y; y++) {
            const p = { x: x, y: y }
            if (isStartAnnotated(p)) {
                open.push(p)
            }
        }
    }
    return open;
}

log("run parameters:" + JSON.stringify(params));

let open: point[] = getOpenList();
let layers = []
for (let i = 0; i < params.iterations; i++) {
    const next: point[] = [];
    const seen = makeSet()
    open.forEach(seen.add)

    log(`processing ${open.length} points in iteration ${i}`)
    const color = colorByIteration(i);
    for (let p of open) {
        const expansion = getNeighbourPoints(p).filter(seen.hasNot).filter(canBeExpanded)
        const pass = Math.random() < params.chance
        expansion.forEach(seen.add)
        if (!pass) {
            continue;
        }
        next.push(...expansion)

    }
    layers.push({ points: [...open], idx: i });
    open = next;
}

layers.reverse().forEach(l => {
    const color =  colorByIteration(l.idx)
    log("annotate layer " + l.idx + " with color " + colorNameByValue(color))
    annotateAll(l.points, color)
}
)
