//script.name=RemoveCyanX v0.1 by IR0NSIGHT;
//script.description=Remove annotation cyan from any percentage of marked blocks on the whole map;

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

var cyanValue = 9;
for (var x = start.x; x < end.x; x++) {
    for (var y = start.y; y < end.y; y++) {
        if ((getAnnotationAt({x: x, y: y}) === cyanValue) && Math.random() > params.chance) { //cyan
            dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, 0);
        }
    }
}