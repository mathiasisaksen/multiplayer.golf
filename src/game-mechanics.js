import * as mUtils from './math-utilities';
import { gameConfig } from './game-config';
import * as svgUtilities from './svg-utilities';

const GameMechanics = function(course, golfBall) {
    
    // Create array of edges from both boundary and inner obstacles
    const edges = course.getEdges();
    
    console.log(edges);

    function classifyCollision() {

    }
    function computeCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);

        // Paths that outline the area covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, gameConfig.golfBallRadius);
        console.log(outerPaths.pathA.getString());
        console.log(outerPaths.pathB.getString());
        
        const rootSVGElement = document.querySelector("#game-container");
        for (const edge of edges) {
            const start = edge.getStartVertex();
            const end = edge.getEndVertex();
            
            const interSectionA = mUtils.computePathEdgeIntersection(outerPaths.pathA, edge);
            const interSectionB = mUtils.computePathEdgeIntersection(outerPaths.pathB, edge);
            console.log(interSectionA);
            let color;
            if (interSectionA && interSectionB) {
                color = (mUtils.isInRange(interSectionA.edgeParameter, 0, 1) && mUtils.isInRange(interSectionA.pathParameter, 0, Infinity)) ||
                    (mUtils.isInRange(interSectionB.edgeParameter, 0, 1) && mUtils.isInRange(interSectionB.pathParameter, 0, Infinity)) ? "green" : "red";
            } else {
                color = "red";
            }
            svgUtilities.drawLine(rootSVGElement, start, end, {'stroke': color, 'stroke-width': 1});

        }

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