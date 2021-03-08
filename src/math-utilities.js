
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

    return({ getX, setX, getY, setY, getPerpendicular, getLength, normalize })
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

function createUnitVector(direction) {
    return(Vector(Math.cos(direction), Math.sin(direction)));
}

function Edge(startVertex, endVertex) {
    let _startVertex = Vector(startVertex.x, startVertex.y);
    let _endVertex = Vector(endVertex.x, endVertex.y);
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

    return({ getLength, getStartVertex, getEndVertex });
}

export { Vector, crossProduct2D, addVectors, subtractVectors, createUnitVector, Edge };