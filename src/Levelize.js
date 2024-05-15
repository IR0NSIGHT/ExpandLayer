//script.name=Levelize v0.1 by IR0NSIGHT;
//script.description=Set all cyan positions to the specified heightlevel

//script.param.targetLevel.type=integer
//script.param.targetLevel.description=heightlevel that all cyan blocks will receive
//script.param.targetLevel.optional=false
//script.param.targetLevel.default=62
//script.param.targetLevel.displayName=heightlevel

//script.param.setWater.type=boolean
//script.param.setWater.description=set water level instead of terrain height
//script.param.setWater.optional=false
//script.param.setWater.default=false
//script.param.setWater.displayName=setWater

var start = {x: 128 * dimension.getLowestX(), y: 128 * dimension.getLowestY()};
var end = {
    x: 128 * (dimension.getHighestX() + 1) - 1,
    y: 128 * (dimension.getHighestY() + 1) - 1,
};

function getAnnotationAt(p) {
    return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y)
}

var targetHeight = params["targetLevel"];
print("bring all cyan blocks to level " + targetHeight)

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

function isCyan(x,y) {
    return getAnnotationAt({x: x, y: y}) === annotationColor.CYAN;
}

var useWaterLevel = params["setWater"];

function setLevel(x,y) {
    if (!useWaterLevel)
        dimension.setHeightAt(x, y, targetHeight);
    else
        dimension.setWaterLevelAt(x, y, targetHeight)
}


var i = 0;
for (var x = start.x; x < end.x; x++) {
    for (var y = start.y; y < end.y; y++) {
        if (isCyan(x,y)) {
            i++;
            setLevel(x,y)
        }
    }
}
print("levelled " + i + " points");