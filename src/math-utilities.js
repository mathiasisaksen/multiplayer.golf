
function crossProduct2D(vector1, vector2) {
    return(vector1.getX()*vector2.getY() - vector2.getX()*vector1.getY());
}

function addVectors(vector1, vector2) {
    const sumX = vector1.getX() + vector2.getX();
    const sumY = vector1.getY() + vector2.getY();
    return(Vector(sumX, sumY));
}

function Vector(x, y) {

    function getX() {
        return(x);
    }

    function setX(newX) {
        x = newX;
    }

    function getY() {
        return(y);
    }

    function setY(newY) {
        y = newY;
    }

    function getPerpendicular() {
        return(Vector(-y, x));
    }

    return({ getX, setX, getY, setY, getPerpendicular })
}


export { crossProduct2D, addVectors, Vector };