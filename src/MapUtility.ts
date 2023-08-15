export function log(mssg: string) {
    //@ts-ignore
    print(mssg);
}

export type point = { x: number; y: number };

export const mapDimensions = (): { start: point; end: point } => {
    return {
        start: {x: 128 * dimension.getLowestX(), y: 128 * dimension.getLowestY()},
        end: {
            x: 128 * (dimension.getHighestX() + 1) - 1,
            y: 128 * (dimension.getHighestY() + 1) - 1,
        },
    };
}