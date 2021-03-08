import * as mathUtilities from './math-utilities';

const GameMechanics = function(course, golfBall) {
    const boundaryVertices = course.getBoundaryVertices();
    // Create loop to simplify computations
    boundaryVertices.push(boundaryVertices[0]);
    let edges = [];
    for (let i = 1; i < boundaryVertices.length; i++) {
        edges.push({start: boundaryVertices[i-1], end: boundaryVertices[i]});
    }

    const obstacles = course.getObstacles();
    obstacles?.forEach(obstacleVertices => {
        obstacleVertices.push(obstacleVertices[0]);
        for (let i = 1; i < obstacleVertices.length; i++) {
            edges.push({start: obstacleVertices[i-1], end: obstacleVertices[i]});
        }
    })
    console.log(edges);

    function step() {
        const oldPosition = golfBall.getPosition();
        const speed = golfBall.getSpeed();
        const direction = golfBall.getDirection();
        console.log("speed", speed)
        console.log("direction", direction);
        let dt = 0.001;
        let change = {}
        change.x = speed*Math.cos(direction);
        change.y = speed*Math.sin(direction);
        //console.table(change);
        const newPosition = mathUtilities.addVectors(oldPosition, change);
        golfBall.setPosition(newPosition);
    }
    setInterval(step, 100);
}

export default GameMechanics;