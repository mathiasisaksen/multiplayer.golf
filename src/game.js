import GolfBall from './golf-ball';
import Course from './course';
import GameMechanics from './game-mechanics';
import * as svgUtilities from './svg-utilities';
import * as mUtils from './math-utilities';
import { svgConfig, gameConfig } from './config';
import * as colorUtils from './color-utilities';
import { generateCourse } from './generate-course';

function Game(rootSVGElement) {
    let courseData;
    let golfBall;
    let course;
    let gameMechanics;

    let directionLineElement;
    let directionLineVector;

    const _computeSVGPosition = svgUtilities.createSVGPositionComputer(rootSVGElement);

    function _setNewGolfBall(courseData) {
        golfBall = GolfBall(courseData, 0, 0, rootSVGElement);
        golfBall.initialize();
        golfBall.addEventListener('mousedown', _handleGolfBallMouseDown);
    }
    
    function getGolfBall() {
        return(golfBall);
    }

    function _setNewCourse(courseData) {
        course = Course(courseData, rootSVGElement);
        course.initialize();
    }

    function getCourse() {
        return(course);
    }

    const setGameContent = (newCourseData) => {
        courseData = newCourseData;
        _setNewCourse(courseData);
        _setNewGolfBall(courseData);
        console.log(this);
        gameMechanics = GameMechanics(obj);
        //golfBall.setSpeed(20);
        //_executeShot();
    }

    function generateNewCourse() {
        console.log(this);
        const newCourseData = generateCourse();
        setGameContent(newCourseData);
    }

    function _handleGolfBallMouseDown() {
        console.log(golfBall.checkUserClickable());
        if (!golfBall.checkUserClickable()) return;
        const golfBallPosition = golfBall.getPosition();
        directionLineElement = svgUtilities.drawLine(rootSVGElement, 
            golfBallPosition, golfBallPosition,
            svgConfig.directionLineAttributes, ['direction-line']);
            
        rootSVGElement.addEventListener('mousemove', _handleGolfBallMouseMove);
        rootSVGElement.addEventListener('mouseup', _handleGolfBallMouseUp);

        //rootSVGElement.addEventListener('touchmove', _handleGolfBallMouseMove);
        //rootSVGElement.addEventListener('touchend', _handleGolfBallMouseUp);
    }

    function _handleGolfBallMouseMove(event) {
        //const touch = event.changedTouches[0];
        //const clientPosition = _computeSVGPosition({x: touch.clientX, y: touch.clientY});
        let clientPosition = _computeSVGPosition({x: event.clientX, y: event.clientY});
        
        // A vector from the center of the golf ball to the position of the mouse
        directionLineVector = mUtils.subtractVectors(mUtils.Vector(clientPosition), 
            golfBall.getPosition());
        
        // If the length is longer than the maximum permitted value,
        // rescale to a vector of maximum permitted length,
        // and compute corresponding line end
        let lineEnd;
        if (directionLineVector.getLength() > gameConfig.maxDirectionLineLength) {
            const unitVector = directionLineVector.getNormalized();
            directionLineVector = mUtils.scaleVector(unitVector, gameConfig.maxDirectionLineLength);
            lineEnd = mUtils.addVectors(golfBall.getPosition(), directionLineVector);
        } else {
            lineEnd = clientPosition;
        }
        svgUtilities.setLineEnd(directionLineElement, lineEnd);
        
        // Interpolate color
        const lineColor = colorUtils.interpolateColors(gameConfig.directionLineStartColor, 
            gameConfig.directionLineEndColor, 
            directionLineVector.getLength() / gameConfig.maxDirectionLineLength);
        svgUtilities.setAttributes(directionLineElement, {stroke: lineColor});
    }

    function _handleGolfBallMouseUp() {
        rootSVGElement.removeEventListener('mousemove', _handleGolfBallMouseMove);
        rootSVGElement.removeEventListener('mouseup', _handleGolfBallMouseUp);
        //rootSVGElement.removeEventListener('touchmove', _handleGolfBallMouseMove);
        //rootSVGElement.removeEventListener('touchend', _handleGolfBallMouseUp);
        directionLineElement.remove();
        directionLineElement = null;
        if (!directionLineVector) return;

        computeGolfBallVelocity();
        golfBall.setNotUserClickable();
        directionLineVector = null;
        _executeShot();
    }

    function computeGolfBallVelocity() {
        // The direction of the ball is in the opposite direction of
        // directionLineVector
        const initialDirection = directionLineVector.getDirection() + Math.PI;
        const initialSpeed = gameConfig.maxSpeed * 
            directionLineVector.getLength() / gameConfig.maxDirectionLineLength;
        // Set directionLineVector to null, 
        console.log(`speed: ${initialSpeed}, direction: ${initialDirection}`);
        golfBall.setDirection(initialDirection);
        golfBall.setSpeed(initialSpeed);
    }

    function _executeShot() {
        gameMechanics.executeShot();
    }

    function playerFinished() {
        setTimeout(() => {
            cleanUpGame();
            generateNewCourse(1);
        }, 5000);
    }

    function cleanUpGame() {
        course?.destroy();
        golfBall?.destroy();
        course = null;
        golfBall = null;
        gameMechanics = null;
        courseData = null;
    }

    const obj = { setGameContent, getGolfBall, getCourse, playerFinished,
        generateNewCourse };
    return(obj);
}

export default Game;