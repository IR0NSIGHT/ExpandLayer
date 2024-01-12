import {point} from "./point";
import {mapDimensions} from "./MapUtility";

const dims = mapDimensions();

//@ts-ignore
const annotations = org.pepsoft.worldpainter.layers.Annotations.INSTANCE;
const isCyanAnnotated = (p: point): boolean => {
    return dimension.getLayerValueAt(annotations, p.x, p.y) == 9;
};

type Tile = any
const TILE_SIZE_BITS = 7;
const SHIFT_AMOUNT = 1 << TILE_SIZE_BITS; // Equivalent to 128

export const findCyanPoints = () : point[] => {
    const annotatedTiles = filterForAnnotation(getAllTiles());
    return annotatedPoints(annotatedTiles);
}

const getAllTiles = (): Tile[] => {

//collect all tiles
    const tiles: Tile[] = []
    for (let x = dims.start.x>>TILE_SIZE_BITS; x < dims.end.x>>TILE_SIZE_BITS; x++) {
        for (let y = dims.start.y>>TILE_SIZE_BITS; y < dims.end.y>>TILE_SIZE_BITS; y++) {
            const tile = dimension.getTile(x, y)
            if (tile != null)
                tiles.push(tile)
        }
    }
    return tiles;
}

const filterForAnnotation = (tiles: Tile[]): Tile[] => {
    const annotatedTiles = tiles.filter((t) => t.hasLayer(annotations))
        .map(tile => {
            const start: point = {x: (tile.getX() << TILE_SIZE_BITS), y: (tile.y << TILE_SIZE_BITS)};
            return {
                start: start,
                end: {x: start.x + SHIFT_AMOUNT, y: start.y + SHIFT_AMOUNT},
            }
        })
    return annotatedTiles
}

const annotatedPoints = (annotatedTiles: Tile[]): point[] => {
    const startPoints: point[] = [];
    annotatedTiles.forEach((tile) => {
            for (let x = tile.start.x; x < tile.end.x; x++) {
                for (let y = tile.start.y; y < tile.end.y; y++) {
                    const point = {x: x, y: y};
                    if (isCyanAnnotated(point)) {
                        startPoints.push(point);
                    }
                }
            }
        }
    );
    return startPoints;
}
