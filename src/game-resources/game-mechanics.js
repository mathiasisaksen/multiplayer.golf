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

    let collisionData;
    let isRunning = false;
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
            const intersectionA = mUtils.computePathEdgeIntersection(outerPaths.pathA, edge);
            const intersectionB = mUtils.computePathEdgeIntersection(outerPaths.pathB, edge);
            if (intersectionA && intersectionB) {
                const canCollide = checkIfCollisionCanHappen(intersectionA, intersectionB);
                if (canCollide) {
                    // Compute collision
                    const collisionData = mUtils.computeMovingCircleEdgeIntersection(
                        golfBallPath, golfBall.getRadius(), edge);
                    if (collisionData.time > 0 && 
                            collisionData.time < earliestCollisionData.time) {
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
    
    function checkIfCollisionCanHappen(intersectionA, intersectionB) {
        if ((mUtils.isInRange(intersectionA.edgeParameter, 1, Infinity) && 
            mUtils.isInRange(intersectionB.edgeParameter, 1, Infinity)) ||
            (mUtils.isInRange(intersectionA.edgeParameter, -Infinity, 0) && 
            mUtils.isInRange(intersectionB.edgeParameter, -Infinity, 0))) {
                return(false);
            }
        return(mUtils.isInRange(intersectionA.pathParameter, 0, Infinity) ||
               mUtils.isInRange(intersectionB.pathParameter, 0, Infinity))
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
            performGolfBallStep(partialTimeStep);

            // Change direction due to collision, and perform rest of step
            golfBall.setDirection(collisionData.directionAfterCollision);
            const remainingTimeStep = timeStep - partialTimeStep;
            collisionData = null;
            checkIfWon();

            step(remainingTimeStep);
        } else {
            performGolfBallStep(timeStep);
            if (golfBall.getSpeed() < gameConfig.relativeSpeedThreshold*golfBall.getRadius()) {
                golfBall.setSpeed(0);
                isRunning = false;
            }
            checkIfWon();
        }
    }

    function performGolfBallStep(timeStep) {
        
        golfBall.step(timeStep);
        const allCovers = course.getCoversAtPosition(golfBall.getPosition().getCoordinates());
        if (allCovers.length > 0) {
            handleGolfBallOnCover(allCovers[0], timeStep);
            return;
        }

        const oldSpeed = golfBall.getSpeed();
        const frictionCoeff = - Math.log(1 - gameConfig.frictionPerTime);
        const newSpeed = (1 - frictionCoeff*timeStep)*oldSpeed;
        golfBall.setSpeed(newSpeed);

    }

    function handleGolfBallOnCover(cover, timeStep) {
        const oldSpeed = golfBall.getSpeed();
        if (cover.type === 'wind') {
            const speedChange = timeStep*cover.windStrength*golfBall.getRadius();
            golfBall.setSpeed(oldSpeed + speedChange);
        } else if (cover.type === 'bridge') {
            const frictionCoeff = - Math.log(1 - gameConfig.frictionPerTime);
            const newSpeed = (1 - frictionCoeff*timeStep)*oldSpeed;
            golfBall.setSpeed(newSpeed);
        } else if (cover.type === 'sand') {
            const frictionCoeff = - Math.log(1 - gameConfig.frictionPerTime);
            const newSpeed = 
                (1 - cover.frictionMultiplier*frictionCoeff*timeStep)*oldSpeed;
            golfBall.setSpeed(newSpeed);
        } else if (cover.type === 'water') {
            golfBall.setSpeed(0);
            isRunning = false;
            golfBall.moveToInitialPosition();
        }
    }

    function multipleSteps(timeStep, numberOfSteps) {
        for (let i = 0; i < numberOfSteps; i++) {
            if (!isRunning) return;
            step(timeStep / numberOfSteps);
        }
    }

    function stepLoop(timeStamp) {
        if (!isRunning) return;
        if (!previousTimeStamp) {
            previousTimeStamp = timeStamp;
        }
        let timeStep = (timeStamp - previousTimeStamp) / 1000;
        if (timeStep > (1 / gameConfig.framesPerSecond) && isRunning) {
            previousTimeStamp = timeStamp;
            const numberOfSteps = Math.round(timeStep * gameConfig.framesPerSecond);
            multipleSteps(timeStep, numberOfSteps * gameConfig.interpolationsPerStep);
        }

        if (isRunning) {
            window.requestAnimationFrame(stepLoop);
        } else {
            reset();
            game.setPlayerFinished(isFinished);
            game.golfBallStoppedMoving();
        }
    }

    function executePutt() {
        isRunning = true;
        isFinished = false;
        window.requestAnimationFrame(stepLoop);
    }

    function checkIfRunning() {
        return(isRunning);
    }

    function checkIfWon() {
        // In order to put, the distance between the center of the golf ball
        // and the center of the hole must be less than the radius of the hole,
        // and the velocity must be less than a certain limit
        const position = golfBall.getPosition();
        const speed = golfBall.getSpeed();
        if (mUtils.subtractVectors(position, hole.position).getLength() <= hole.radius &&
                                                            speed < upperPuttVelocity) {
            isRunning = false;
            isFinished = true;
            golfBall.setPosition(hole.position);
        }
    }

    function reset() {
        collisionData = null;
        isRunning = false;
        previousTimeStamp = null;
    }

    return({ step, multipleSteps, stepLoop, 
        executePutt, checkIfRunning });
}

export default GameMechanics;