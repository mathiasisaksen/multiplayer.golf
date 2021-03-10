import * as mUtils from './math-utilities';
import { gameConfig } from './game-config';
import * as svgUtilities from './svg-utilities';

const GameMechanics = function(course, golfBall) {
    
    // Create array of edges from both boundary and inner obstacles
    const edges = course.getEdges();
    
    console.log(edges);

    function computeNextCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);

        // Paths that outline the extent covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, gameConfig.golfBallRadius);
        //console.log(outerPaths.pathA.getString());
        //console.log(outerPaths.pathB.getString());
        
        const rootSVGElement = document.querySelector("#game-container");
        // collisionData contains three properties: "Time" of collision (based
        // on unit vector, not actual time), location of collision, and center of
        // golf ball at collision
        let earliestCollisionData = {time: Infinity};
        for (const edge of edges) {
            const start = edge.getStartVertex();
            const end = edge.getEndVertex();
            
            const interSectionA = mUtils.computePathEdgeIntersection(outerPaths.pathA, edge);
            const interSectionB = mUtils.computePathEdgeIntersection(outerPaths.pathB, edge);
            let color; //
            if (interSectionA && interSectionB) {
                const canCollide = 
                    (mUtils.isInRange(interSectionA.edgeParameter, 0, 1) && 
                    mUtils.isInRange(interSectionA.pathParameter, 0, Infinity)) ||
                    (mUtils.isInRange(interSectionB.edgeParameter, 0, 1) && 
                    mUtils.isInRange(interSectionB.pathParameter, 0, Infinity))
                color = canCollide ? "green" : "red"; //
                svgUtilities.drawLine(rootSVGElement, start, end, {'stroke': color, 'stroke-width': 1}); //
                if (canCollide) {
                    // Compute collision
                    const collisionData = mUtils.computeMovingCircleEdgeIntersection(
                        golfBallPath, gameConfig.golfBallRadius, edge);
                    if (collisionData.time < earliestCollisionData.time) {
                        earliestCollisionData = collisionData;
                    }
                    //console.log(`Collision point: ${collisionData.collisionPoint.getString()}, golf ball center: ${collisionData.collisionCenter.getString()}`);
                    svgUtilities.drawCircle(rootSVGElement, collisionData.collisionCenter, {'r': 1, 'fill': 'green'}); //
                    svgUtilities.drawCircle(rootSVGElement, collisionData.collisionPoint, {'r': 1, 'fill': 'orange'}); //
                }
            } 
        }
        console.log(earliestCollisionData.collisionCenter.getString());
        return(earliestCollisionData);

    }
    computeNextCollision();
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