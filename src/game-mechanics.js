import * as mUtils from './math-utilities';
import { gameConfig } from './game-config';

const GameMechanics = function(course, golfBall) {
    const boundaryVertices = course.getBoundaryVertices();
    // Create loop to simplify computations
    boundaryVertices.push(boundaryVertices[0]);
    
    // Create array of edges from both boundary and inner obstacles
    let edges = course.getEdges();
    
    console.log(edges);

    function computeCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);

        // Paths that outline the area covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, gameConfig.golfBallRadius);
        console.log(outerPaths.pathA.getString());
        console.log(outerPaths.pathB.getString());
    }
    computeCollision();
    function step(timeStep) {
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
        const newPosition = mUtils.addVectors(oldPosition, change);
        golfBall.setPosition(newPosition);
    }
    //setInterval(step, 100);
}

export default GameMechanics;