import { gameConfig, svgConfig } from '../config';
import * as svgUtilities from '../utilities/svg-utilities';
import * as mUtils from '../utilities/math-utilities';

const GolfBall = function(
        courseData, 
        initialSpeed, 
        initialDirection, 
        rootSVGElement) {
    
    let {initialPosition, radius} = courseData.golfBall;
    let position = mUtils.Vector(initialPosition);
    let speed = initialSpeed;
    let direction = initialDirection;
    radius = radius ?? gameConfig.golfBallRadius;
    
    let _unitDirectionVector = mUtils.createUnitVector(direction);
    let _golfBallElement;
    let _isUserClickable = false;

    function draw() {
        _golfBallElement = svgUtilities.drawCircle(rootSVGElement, position.getCoordinates(),
        radius, svgConfig.golfBallAttributes, ['golf-ball']);
    }

    function getPosition() {
        return(position);
    }

    function setPosition(newPosition) {
        position = newPosition;
        update();
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
        _unitDirectionVector = mUtils.createUnitVector(direction);
    }

    function getRadius() {
        return(radius);
    }

    function setRadius(newRadius) {
        radius = newRadius;
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
        setUserClickable();
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

    function setUserClickable() {
        _isUserClickable = true;
        _golfBallElement.classList.add('user-clickable');
    }

    function setNotUserClickable() {
        _isUserClickable = false;
        _golfBallElement.classList.remove('user-clickable');
    }
    
    function checkUserClickable() {
        return(_isUserClickable);
    }

    function moveToInitialPosition() {
        position = mUtils.Vector(initialPosition);
        setPosition(position);
    }

    function reset() {
        moveToInitialPosition();
        setSpeed(0);
        setDirection(0);
    }

    function getInitialPosition() {
        return(mUtils.Vector(initialPosition));
    }

    return({ initialize, draw, 
        getPosition, setPosition, 
        getSpeed, setSpeed,
        getDirection, setDirection,
        getRadius, setRadius,
        destroy, step, update,
        addEventListener, removeEventListener,
        setUserClickable, setNotUserClickable,
        checkUserClickable, moveToInitialPosition, reset,
        getInitialPosition });

}

export default GolfBall;