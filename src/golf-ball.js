import { gameConfig, svgConfig } from './config';
import * as svgUtilities from './svg-utilities';
import * as mUtils from './math-utilities'

const GolfBall = function(
        courseData, 
        initialSpeed, 
        initialDirection, 
        rootSVGElement) {
    
    let position = mUtils.Vector(courseData.initialGolfBallPosition);
    let speed = initialSpeed;
    let direction = initialDirection;
    let _unitDirectionVector = mUtils.createUnitVector(direction);
    let _golfBallElement;

    function draw() {
        _golfBallElement = svgUtilities.drawCircle(rootSVGElement, position.getCoordinates(), 
            svgConfig.golfBallAttributes, ['golf-ball']);
    }

    function getPosition() {
        return(position);
    }

    function setPosition(newPosition) {
        position = newPosition;
    }

    function getSpeed() {
        return(speed);
    }

    function setSpeed(newSpeed) {
        speed = newSpeed;
    }

    function getDirection() {
        return(direction);
    }

    function setDirection(newDirection) {
        direction = newDirection;
        _unitDirectionVector = mUtils.createUnitVector(direction)
    }

    function step(timeStep) {
        const stepSize = speed*timeStep;
        let newPosition = position;
        newPosition.setX(newPosition.getX() + stepSize*_unitDirectionVector.getX());
        newPosition.setY(newPosition.getY() + stepSize*_unitDirectionVector.getY());
        setPosition(newPosition);
    }

    function initialize() {
        draw();
    }

    function update() {
        svgUtilities.setCirclePosition(_golfBallElement, position.getCoordinates());
    }

    function destroy() {
        _golfBallElement.remove();
    }

    function addEventListener(eventName, callback) {
        _golfBallElement.addEventListener(eventName, callback);
    }

    function removeEventListener(eventName, callback) {
        _golfBallElement.removeEventListener(eventName, callback);
    }


    return({ initialize, draw, 
        getPosition, setPosition, 
        getSpeed, setSpeed,
        getDirection, setDirection,
        destroy, step, update,
        addEventListener, removeEventListener })

}

export default GolfBall;