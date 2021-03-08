
// Represents a general two-dimensional vector (or point)
function Vector(x, y) {
    let _x = x;
    let _y = y;
    let _length;

    function getX() {
        return(_x);
    }

    function setX(newX) {
        _x = newX;
    }

    function getY() {
        return(_y);
    }

    function setY(newY) {
        _y = newY;
    }

    function getCoordinates() {
        return({x: _x, y: _y})
    }

    function getPerpendicular() {
        return(Vector(-_y, _x));
    }

    function getLength() {
        if (!_length) {
            _length = Math.sqrt(_x**2 + _y**2)
        }
        return(_length);
    }

    function normalize() {
        const length = getLength();
        if (length == 0) return;
        _x /= length;
        _y /= length;
    }

    function getNormalized() {
        return(Vector(_x / getLength(), _y / getLength()));
    }

    function getString() {
        return(`[x: ${_x}, y: ${y}]`)
    }
    return({ getX, setX, getY, setY, getPerpendicular, getLength, normalize,
            getCoordinates, getNormalized, getString })
}

function crossProduct2D(vector1, vector2) {
    return(vector1.getX()*vector2.getY() - vector2.getX()*vector1.getY());
}

function addVectors(vector1, vector2) {
    const sumX = vector1.getX() + vector2.getX();
    const sumY = vector1.getY() + vector2.getY();
    return(Vector(sumX, sumY));
}

function subtractVectors(vector1, vector2) {
    const differenceX = vector1.getX() - vector2.getX();
    const differenceY = vector1.getY() - vector2.getY();
    return(Vector(differenceX, differenceY));
}

function scaleVector(vector, scalar) {
    const scaledX = scalar*vector.getX();
    const scaledY = scalar*vector.getY();
    return(Vector(scaledX, scaledY));
}

function createUnitVector(direction) {
    return(Vector(Math.cos(direction), Math.sin(direction)));
}

// Represents an edge in a polygon
function Edge(startVertex, endVertex) {
    let _startVertex = startVertex;
    let _endVertex = endVertex;
    let _diffVector = subtractVectors(_endVertex, _startVertex);

    function getLength() {
        return(_diffVector.getLength());
    }

    function getStartVertex() {
        return(_startVertex);
    }

    function getEndVertex() {
        return(_endVertex);
    }

    function getDifferenceVector() {
        return(_diffVector);
    }

    function getString() {
        return(`Start: ${_startVertex.getString()}, end: ${_endVertex.getString()}`)
    }
    
    return({ getLength, getStartVertex, getEndVertex, getDifferenceVector });
}

// A path describes the motion of the ball
function Path(initialPoint, directionVector) {
    let _initialPoint = initialPoint;
    let _directionVector = directionVector;

    function getInitialPoint() {
        return(_initialPoint);
    }

    function getDirectionVector() {
        return(_directionVector);
    }

    function getPositionAtTime(time) {
        return(addVectors(_initialPoint, scaleVector(_directionVector, time)));
    }

    function getString() {
        return(`Initial point: ${_initialPoint.getString()}, direction: ${_directionVector.getString()}`)
    }

    return({ getInitialPoint, getDirectionVector, getPositionAtTime, getString });
}

// Useful reference: Intersection of two line segments
function computePathEdgeIntersection(path, edge) {
    // Path is on the form pathStart + pathVector*t, where t >= 0
    const pathStart = path.getInitialPoint();
    const pathVector = path.getDirectionVector();

    // Edge is on form edgeStart + edgeVector*u, where 0 <= s <= 1
    const edgeStart = edge.getStartVertex();
    const edgeVector = edge.getDifferenceVector();

    // Intersection when t = (edgeStart - pathStart) × edgeVector / (pathVector × edgeVector)
    //                or u = (edgeStart - pathStart) × pathVector / (pathVector × edgeVector)
    const startDiff = subtractVectors(edgeStart, pathStart);
    const denominator = crossProduct2D(pathVector, edgeVector);
    const t = crossProduct2D(startDiff, edgeVector) / denominator;
    const u = crossProduct2D(startDiff, pathVector) / denominator;
    const intersectionPoint = path.getPositionAtTime(t);
    return({ intersectionPoint, pathParameter: t, edgeParameter: u});
}

// Given a circle and a path, returns the two paths that are parallel to the 
// original path and tangetial to the circle. These will go in the same 
// direction, but start in different points
function getParallelPaths(path, radius) {
    const directionVector = path.getDirectionVector();
    const unitPerpVector = directionVector.getNormalized().getPerpendicular();

    const initialPointA = addVectors(path.getInitialPoint(), scaleVector(unitPerpVector, radius));
    const initialPointB = subtractVectors(path.getInitialPoint(), scaleVector(unitPerpVector, radius));
    return({pathA: Path(initialPointA, directionVector), pathB: Path(initialPointB, directionVector)})
}

export { Vector, crossProduct2D, addVectors, 
    subtractVectors, createUnitVector, Edge, Path,
    computePathEdgeIntersection, getParallelPaths };