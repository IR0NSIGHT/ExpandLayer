//script.name=RemoveCyanX v0.1 by IR0NSIGHT;
//script.description=Mark all edges that are yellow and border magenta annotation with red annotation

//script.param.chance.type=float
//script.param.chance.description=Chance for any cyan block to not be removed. 0.5 = 50%
//script.param.chance.optional=false
//script.param.chance.default=0.5
//script.param.chance.displayName=Chance to pass

//Chat gpt timer stuff
var startTime,
    running = false,
    elapsedTime = 0

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - elapsedTime;
    } else {
        running = false;
    }
}

function updateTime() {
    var currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    var milliseconds = Math.floor((time % 1000) / 10);
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    milliseconds = (milliseconds < 10 ? '0' : '') + milliseconds;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    hours = (hours < 10 ? '0' : '') + hours;

    print(hours + ':' + minutes + ':' + seconds + '.' + milliseconds);
}

function resetStopwatch() {
    running = false;
    elapsedTime = 0;
    displayTime(elapsedTime);
}

//--------------------




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

var makeSet = function () {
    var seenSet = new java.util.HashSet(); // Assuming java.util.HashSet is available in the environment

    var stringifyPoint = function (pos) {
        return JSON.stringify([pos.x, pos.y]);
    };

    var markSeen = function (pos) {
        seenSet.add(stringifyPoint(pos));
    };

    var isSeen = function (pos) {
        return seenSet.contains(stringifyPoint(pos));
    };

    return {
        add: markSeen,
        has: isSeen,
        hasNot: function (a) {
            return !isSeen(a);
        }
    };
};


function isStartPoint(x, y) {
    return getAnnotationAt({x: x, y: y}) === annotationColor.CYAN;
}

function isNotAnnotated(x, y) {
    return getAnnotationAt({x: x, y: y}) === annotationColor.NONE;
}

function markRed(x, y) {
    dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, annotationColor.RED);
}

function markOrange(x, y) {
    dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, annotationColor.ORANGE);
}

function setHeight(point, height) {
    dimension.setHeightAt(point.x, point.y, height)
}

function applyProfile(points, height) {
    for (var i = 0; i < points.length; i++) {
        setHeight(points[i], height)
    }
}

var borderSeenSet = makeSet();
function getUnmarkedNeighbours(pointArray) {
    var border = [];
    for (var i = 0; i < pointArray.length; i++) {
        var point = pointArray[i];
        borderSeenSet.add(point)
    }

    function addBorder(point) {
        border.push(point)
        borderSeenSet.add(point)
    }

    function pushIfWanted(point) {
        if (borderSeenSet.hasNot(point))
            addBorder(point)
    }

    //iterate all points and get neighbours
    for (var i = 0; i < pointArray.length; i++) {
        var point = pointArray[i];
        pushIfWanted({x: point.x + 1, y: point.y})
        pushIfWanted({x: point.x - 1, y: point.y})
        pushIfWanted({x: point.x, y: point.y + 1})
        pushIfWanted({x: point.x, y: point.y - 1})
    }

    return border
}


var startPoints = [];
var i = 0;
for (var x = start.x; x < end.x; x++) {
    for (var y = start.y; y < end.y; y++) {
        if (isStartPoint(x, y)) {
            startPoints.push({x: x, y: y})
        }
    }
}

var profile = [62, 62, 62, 63, 63, 63, 64, 65, 66, 67, 69, 71, 75]

for (var i = 0; i < profile.length; i++) {
    print("iterate border " + i + ", " + startPoints.length + " points")
    startStopwatch()
    applyProfile(startPoints, profile[i])
    print("time to apply profile to " + startPoints.length + "points:")
    updateTime()
    startPoints = getUnmarkedNeighbours(startPoints)
    print("getting next layer:")
    updateTime()
    if (startPoints.length > 50000)
        break;
}
