import {mapDimensions} from "./MapUtility";
import {log} from "./log";
import {annotateAll, annotationColor, getAnnotationAt} from "./annotate";
import {getNeighbourPoints, point} from "./point";
import {makeSet} from "./SeenSet";
import {assert} from "./assert";

log("Hello World!")
log("script params: " + JSON.stringify(params))
log("map dimensions:" + JSON.stringify(mapDimensions()))

const {start, end} = mapDimensions()
const startAnnotation = annotationColor.CYAN
const expandedAnnotation = annotationColor.ORANGE
const isStartAnnotated = (p: point) => {
    return getAnnotationAt(p) == startAnnotation
}

const canBeExpanded = (p: point) => !isStartAnnotated(p) && getAnnotationAt(p) == 0

const {iterations, chance} = params
log(`iterations: ${iterations}, chance: ${chance}`)
const getOpenList = () => {
    const open: point[] = []
    for (let x = start.x; x < end.x; x++) {
        for (let y = start.y; y < end.y; y++) {
            const p = {x: x, y: y}
            if (isStartAnnotated(p)) {
                open.push(p)
            }
        }
    }
    return open;
}

log("run parameters:" + JSON.stringify(params));

let open: point[] = getOpenList();
for (let i = 0; i < params.iterations; i++) {
    const next: point[] = [];
    const seen = makeSet()
    open.forEach(seen.add)

    open.forEach(p => assert(!canBeExpanded(p), "yeah its fucked 1"))

    log(`processing ${open.length} points in iteration ${i}`)
    for (let p of open) {
        const expansion = getNeighbourPoints(p).filter(seen.hasNot).filter(canBeExpanded)
        const pass = Math.random() < params.chance
        if (!pass) {
            expansion.forEach(seen.add)
            continue;
        }
        next.push(...expansion)
        annotateAll(expansion, expandedAnnotation)
        expansion.forEach(p => assert(getAnnotationAt(p) == expandedAnnotation, "yeah its fucked"))
    }
    open = next;

}
