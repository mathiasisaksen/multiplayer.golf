import * as mUtils from './math-utilities';
import { gameConfig } from './game-config';

const GameMechanics = function(course, golfBall) {
    const boundaryVertices = course.getBoundaryVertices();
    // Create loop to simplify computations
    boundaryVertices.push(boundaryVertices[0]);
    let edges = [];
    
    for (let i = 1; i < boundaryVertices.length; i++) {
        const a = boundaryVertices[i-1];
        const b = boundaryVertices[i];
        edges.push(mUtils.Edge(mUtils.Vector(a.x, a.y), mUtils.Vector(b.x, b.y)));
    }

    const obstacles = course.getObstacles();
    obstacles?.forEach(obstacleVertices => {
        obstacleVertices.push(obstacleVertices[0]);
        for (let i = 1; i < obstacleVertices.length; i++) {
        const a = obstacleVertices[i-1];
        const b = obstacleVertices[i];
        edges.push(mUtils.Edge(mUtils.Vector(a.x, a.y), mUtils.Vector(b.x, b.y)));
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
        const newPosition = mUtils.addVectors(oldPosition, change);
        golfBall.setPosition(newPosition);
    }
    //setInterval(step, 100);
}

export default GameMechanics;