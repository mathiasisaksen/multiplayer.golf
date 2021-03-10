import * as mUtils from './math-utilities';
import { gameConfig } from './game-config';
import * as svgUtilities from './svg-utilities';

const GameMechanics = function(course, golfBall) {
    
    // Create array of edges from both boundary and inner obstacles
    const edges = course.getEdges();
    let collisionData;

    function computeNextCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);

        // Paths that outline the extent covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, gameConfig.golfBallRadius);
        
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
                if (canCollide) {
                    // Compute collision
                    const collisionData = mUtils.computeMovingCircleEdgeIntersection(
                        golfBallPath, gameConfig.golfBallRadius, edge);
                    if (collisionData.time < earliestCollisionData.time) {
                        earliestCollisionData = collisionData;
                    }
                }
            } 
        }
        const collisionPointCenterVector = mUtils.subtractVectors(earliestCollisionData.collisionPoint, 
            earliestCollisionData.collisionCenter)
        let newDirectionVector = mUtils.vectorReflection(directionVector,
            collisionPointCenterVector);
        newDirectionVector = mUtils.scaleVector(newDirectionVector, -1);
        const directionAfterCollision = Math.atan2(newDirectionVector.getY(), newDirectionVector.getX());
        earliestCollisionData.directionAfterCollision = directionAfterCollision;
        return(earliestCollisionData);

    }
    
    function step(timeStep) {
        if (!collisionData) {
            collisionData = computeNextCollision();
        }

        const distanceToCollision = mUtils.VectorDistance(golfBall.getPosition(), 
            collisionData.collisionCenter);
        const nextStepLength = golfBall.getSpeed()*timeStep;

        if (nextStepLength > distanceToCollision) {
            // Partial step
            const partialStepTime = distanceToCollision / golfBall.getSpeed();
            golfBall.step(partialStepTime);

            // Change direction due to collision, and perform rest of step
            golfBall.setDirection(collisionData.directionAfterCollision);
            const remainingStepTime = timeStep - partialStepTime;
            golfBall.step(remainingStepTime);

            collisionData = null;
        } else {
            golfBall.step(timeStep);
        }
    }

    function multipleSteps(timeStep, numberOfSteps) {
        for (let i = 0; i < numberOfSteps; i++) {
            step(timeStep);
        }
    }
    setInterval(() => multipleSteps(0.1/10, 10), 1000/60);
    //setInterval(() => step(0.1), 1000/60);
}

export default GameMechanics;