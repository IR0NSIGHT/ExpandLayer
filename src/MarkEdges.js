//script.name=RemoveCyanX v0.1 by IR0NSIGHT;
//script.description=Mark all edges that are yellow and border magenta annotation with red annotation

//script.param.chance.type=float
//script.param.chance.description=Chance for any cyan block to not be removed. 0.5 = 50%
//script.param.chance.optional=false
//script.param.chance.default=0.5
//script.param.chance.displayName=Chance to pass

var start = {x: 128 * dimension.getLowestX(), y: 128 * dimension.getLowestY()};
var end = {
    x: 128 * (dimension.getHighestX() + 1) - 1,
    y: 128 * (dimension.getHighestY() + 1) - 1,
};

function getAnnotationAt(p) {
    return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y)
}

var annotationColor = {
    NONE: 0,
    WHITE: 1,
    ORANGE: 2,
    MAGENTA: 3,
    LIGHTBLUE: 4,
    YELLOW: 5,
    LIME: 6,
    PINK: 7,
    LIGHTGREY: 8,
    CYAN: 9,
    PURPLE: 10,
    BLUE: 11,
    BROWN: 12,
    GREEN: 13,
    RED: 14,
    BLACK: 15
};

function isMagenta(x,y) {
    return getAnnotationAt({x: x, y: y}) === annotationColor.MAGENTA;
}

function isYellow(x,y) {
    return getAnnotationAt({x: x, y: y}) === annotationColor.YELLOW;
}

function makeRed(x,y) {
    dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, annotationColor.CYAN);
}
var i = 0;
for (var x = start.x; x < end.x; x++) {
    for (var y = start.y; y < end.y; y++) {
        if (isYellow(x,y) && (
            isMagenta(x+1,y) || isMagenta(x-1,y) || isMagenta(x,y+1) || isMagenta(x,y-1)
        )) {
            i++;
            makeRed(x,y)
        }
    }
}
print("found " + i + " borders");