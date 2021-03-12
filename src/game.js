import GolfBall from './golf-ball';
import Course from './course';
import GameMechanics from './game-mechanics';
import * as svgUtilities from './svg-utilities';
import * as mUtils from './math-utilities';
import { svgConfig, gameConfig } from './config';

function Game(rootSVGElement) {
    let golfBall;
    let course;
    let gameMechanics;

    let directionLineElement;
    let directionLineVector;

    const _computeSVGPosition = svgUtilities.createSVGPositionComputer(rootSVGElement);

    function _setNewGolfBall(initialPosition) {
        golfBall?.destroy();
        golfBall = GolfBall(initialPosition, 0, 0, rootSVGElement);
        golfBall.initialize();
        golfBall.addEventListener('mousedown', _handleGolfBallMouseDown);
    }

    function _setNewCourse(courseData) {
        course?.destroy();
        course = Course(courseData, rootSVGElement);
        course.initialize();
    }

    function setGameContent(courseData, initialPosition) {
        _setNewCourse(courseData);
        _setNewGolfBall(initialPosition);
        gameMechanics = GameMechanics(course, golfBall);
    }

    function _handleGolfBallMouseDown() {
        console.log(gameMechanics.checkIfRunning());
        if (gameMechanics.checkIfRunning()) return;
        const golfBallPosition = golfBall.getPosition();
        directionLineElement = svgUtilities.drawLine(rootSVGElement, 
            golfBallPosition, golfBallPosition,
            svgConfig.directionLineAttributes, ['direction-line']);
            
        rootSVGElement.addEventListener('mousemove', _handleGolfBallMouseMove);
        rootSVGElement.addEventListener('mouseup', _handleGolfBallMouseUp);

        //rootSVGElement.addEventListener('touchmove', handleMouseMove);
        //rootSVGElement.addEventListener('touchend', handleMovementEnd);
    }

    function _handleGolfBallMouseMove(event) {
        //const touch = event.changedTouches[0];
        //const position = computeSVGPosition({x: touch.clientX, y: touch.clientY});
        let clientPosition = _computeSVGPosition({x: event.clientX, y: event.clientY});
        directionLineVector = mUtils.subtractVectors(mUtils.Vector(clientPosition), 
            golfBall.getPosition());
        if (directionLineVector.getLength() > gameConfig.maxDirectionLineLength) {
            const unitVector = directionLineVector.getNormalized();
            directionLineVector = mUtils.scaleVector(unitVector, gameConfig.maxDirectionLineLength);
            clientPosition = mUtils.addVectors(golfBall.getPosition(), directionLineVector);
        } 
        svgUtilities.setLineEnd(directionLineElement, clientPosition);
    }

    function _handleGolfBallMouseUp() {
        rootSVGElement.removeEventListener('mousemove', _handleGolfBallMouseMove);
        rootSVGElement.removeEventListener('mouseup', _handleGolfBallMouseUp);
        _executeShot();
    }

    function _executeShot() {
        directionLineElement.remove();
        directionLineElement = null;
        // The direction of the ball is in the opposite direction of
        // directionLineVector
        const initialDirection = directionLineVector.getDirection() + Math.PI;
        const initialSpeed = gameConfig.maxSpeed * 
            directionLineVector.getLength() / gameConfig.maxDirectionLineLength;
        console.log(initialSpeed);
        golfBall.setDirection(initialDirection);
        golfBall.setSpeed(initialSpeed);

        gameMechanics.enableRunning();

        window.requestAnimationFrame(gameMechanics.stepLoop);
    }

    return({ setGameContent });
}

export default Game;