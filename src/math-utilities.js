
function crossProduct2D(vector1, vector2) {
    return(vector1.x*vector2.y - vector2.x*vector1.y);
}

function addVectors(vector1, vector2) {
    const sumX = vector1.x + vector2.x;
    const sumY = vector1.y + vector2.y;
    return({x: sumX, y: sumY});
}


export { crossProduct2D, addVectors };