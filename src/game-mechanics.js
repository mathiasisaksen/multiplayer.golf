import * as mUtils from './math-utilities';
import { gameConfig } from './config';
import * as svgUtilities from './svg-utilities';

const GameMechanics = function(course, golfBall) {
    
    // Create array of edges from both boundary and inner obstacles
    const edges = course.getEdges();
    const hole = course.getHole();
    let collisionData;
    let isRunning = false;
    let previousTimeStamp;

    function computeNextCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);

        // Paths that outline the extent covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, gameConfig.golfBallRadius);
        
        
        // collisionData contains four properties: "Time" of collision (based
        // on unit vector, not actual time), location of collision, center of
        // golf ball at collision, and direction of golf ball after collision
        let earliestCollisionData = {time: Infinity};
        for (const edge of edges) {
            const interSectionA = mUtils.computePathEdgeIntersection(outerPaths.pathA, edge);
            const interSectionB = mUtils.computePathEdgeIntersection(outerPaths.pathB, edge);
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

        // If the next step is longer than the distance to the collision,
        // we'll split it into two steps: a partial step equal to the distance
        // to the collision, and a post-collision step using the remaining time
        if (nextStepLength > distanceToCollision) {
            // Partial step
            const partialStepTime = distanceToCollision / golfBall.getSpeed();
            golfBall.step(partialStepTime);

            // Change direction due to collision, and perform rest of step
            golfBall.setDirection(collisionData.directionAfterCollision);
            const remainingStepTime = timeStep - partialStepTime;
            collisionData = null;
            checkIfWon();

            step(remainingStepTime);
        } else {
            golfBall.step(timeStep);
            const oldSpeed = golfBall.getSpeed();
            const newSpeed = (1 - gameConfig.frictionPerTime*timeStep)*oldSpeed;
            golfBall.setSpeed(newSpeed);
            if (golfBall.getSpeed() < gameConfig.speedThreshold) {
                golfBall.setSpeed(0);
                reset();
            }
            checkIfWon();
        }
    }

    function multipleSteps(timeStep, numberOfSteps) {
        for (let i = 0; i < numberOfSteps; i++) {
            step(timeStep / numberOfSteps);
        }
    }

    function stepLoop(timeStamp) {
        if (!previousTimeStamp) {
            previousTimeStamp = timeStamp;
        }
        let timeStep = (timeStamp - previousTimeStamp) / 1000;
        if (timeStep > (1 / gameConfig.framesPerSecond) && checkIfRunning()) {
            previousTimeStamp = timeStamp;
            multipleSteps(timeStep, gameConfig.interpolationsPerStep);
            golfBall.update();
        }

        if (checkIfRunning()) {
            window.requestAnimationFrame(stepLoop);
        }
    }

    function enableRunning() {
        isRunning = true;
    }

    function checkIfRunning() {
        return(isRunning);
    }

    function checkIfWon() {
        const position = golfBall.getPosition();
        const hole = course.getHole();
        if (mUtils.subtractVectors(position, hole.position).getLength() <= hole.radius) {
            console.log("hole");
        }
    }

    function reset() {
        collisionData = null;
        isRunning = false;
        previousTimeStamp = null;
    }

    //setInterval(() => multipleSteps(0.0167/10, 10), 1000/60);
    /*setInterval(() => step(1/25), 1000/25);*/
    return({ step, multipleSteps, stepLoop, enableRunning, checkIfRunning });
}

export default GameMechanics;