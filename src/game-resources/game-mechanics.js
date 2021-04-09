import * as mUtils from '../utilities/math-utilities';
import { gameConfig } from '../config';

const GameMechanics = function(game) {
    const golfBall = game.getGolfBall();
    const course = game.getCourse();
    
    // Create array of edges from both boundary and inner obstacles
    const edges = course.getEdges();
    const hole = course.getHole();
    const upperPuttVelocity = Math.sqrt(gameConfig.gravity / (2*golfBall.getRadius())) *
        (2*hole.radius - golfBall.getRadius());
    console.log(upperPuttVelocity);

    let collisionData;
    let golfBallIsMoving = false;
    let isFinished = false;
    let previousTimeStamp;

    function computeNextCollision() {
        const golfBallPosition = golfBall.getPosition();
        const golfBallDirection = golfBall.getDirection();
        const directionVector = mUtils.createUnitVector(golfBallDirection);
        const golfBallPath = mUtils.Path(golfBallPosition, directionVector);
        // Paths that outline the extent covered by the motion of the golf ball
        const outerPaths = mUtils.getParallelPaths(golfBallPath, golfBall.getRadius());
        
        
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
                        golfBallPath, golfBall.getRadius(), edge);
                    if (collisionData.time < earliestCollisionData.time) {
                        earliestCollisionData = collisionData;
                    }
                }
            } 
        }
        const collisionPointCenterVector = mUtils.subtractVectors(earliestCollisionData.collisionPoint, 
            earliestCollisionData.collisionCenter);
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
            const partialTimeStep = distanceToCollision / golfBall.getSpeed();
            golfBall.step(partialTimeStep);
            const oldSpeed = golfBall.getSpeed();
            const newSpeed = (1 - gameConfig.frictionPerTime*partialTimeStep)*oldSpeed;
            golfBall.setSpeed(newSpeed);

            // Change direction due to collision, and perform rest of step
            golfBall.setDirection(collisionData.directionAfterCollision);
            const remainingTimeStep = timeStep - partialTimeStep;
            collisionData = null;
            checkIfWon();

            step(remainingTimeStep);
        } else {
            golfBall.step(timeStep);
            const oldSpeed = golfBall.getSpeed();
            const newSpeed = (1 - gameConfig.frictionPerTime*timeStep)*oldSpeed;
            golfBall.setSpeed(newSpeed);
            if (golfBall.getSpeed() < gameConfig.speedThreshold) {
                golfBall.setSpeed(0);
                golfBallIsMoving = false;
            }
            checkIfWon();
        }
    }

    function multipleSteps(timeStep, numberOfSteps) {
        for (let i = 0; i < numberOfSteps; i++) {
            if (!golfBallIsMoving) return;
            step(timeStep / numberOfSteps);
        }
    }

    function stepLoop(timeStamp) {
        if (!previousTimeStamp) {
            previousTimeStamp = timeStamp;
        }
        let timeStep = (timeStamp - previousTimeStamp) / 1000;
        if (timeStep > (1 / gameConfig.framesPerSecond) && golfBallIsMoving) {
            previousTimeStamp = timeStamp;
            multipleSteps(timeStep, gameConfig.interpolationsPerStep);
            golfBall.update();
        }

        if (golfBallIsMoving) {
            window.requestAnimationFrame(stepLoop);
        } else {
            reset();
            game.setPlayerFinished(isFinished);
            game.golfBallStoppedMoving();
        }
    }

    function executePutt() {
        golfBallIsMoving = true;
        isFinished = false;
        window.requestAnimationFrame(stepLoop);
    }

    function enableRunning() {
        golfBallIsMoving = true;
    }

    function checkIfRunning() {
        return(golfBallIsMoving);
    }

    function checkIfWon() {
        // In order to put, the distance between the center of the golf ball
        // and the center of the hole must be less than the radius of the hole,
        // and the velocity must be less than a certain limit
        const position = golfBall.getPosition();
        const speed = golfBall.getSpeed();
        if (mUtils.subtractVectors(position, hole.position).getLength() <= hole.radius &&
                                                            speed < upperPuttVelocity) {
            golfBallIsMoving = false;
            isFinished = true;
        }
    }

    function reset() {
        collisionData = null;
        golfBallIsMoving = false;
        previousTimeStamp = null;
    }

    return({ step, multipleSteps, stepLoop, 
        executePutt, enableRunning, checkIfRunning });
}

export default GameMechanics;