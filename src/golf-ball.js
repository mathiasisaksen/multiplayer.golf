import { svgConfig } from './game-config';
import * as svgUtilities from './svg-utilities';
import * as mUtils from './math-utilities'

const GolfBall = function(
        initialPosition, 
        initialSpeed, 
        initialDirection, 
        rootSVGElement) {
    
    let position = mUtils.Vector(initialPosition);
    let speed = initialSpeed;
    let direction = initialDirection;
    let _golfBallElement;
    const _computeSVGPosition = svgUtilities.createSVGPositionComputer(rootSVGElement);

    function draw() {
        _golfBallElement = svgUtilities.drawCircle(rootSVGElement, position.getCoordinates(), 
            svgConfig.golfBallAttributes, ['golf-ball']);
    }

    function getPosition() {
        return(position);
    }

    function setPosition(newPosition) {
        position = newPosition;
        svgUtilities.setCirclePosition(_golfBallElement, position.getCoordinates());
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
    }

    function _addEventListeners() {
        function _handleMouseMove(event) {
            //const touch = event.changedTouches[0];
            //const position = computeSVGPosition({x: touch.clientX, y: touch.clientY});
            const position = _computeSVGPosition({x: event.clientX, y: event.clientY});
            setPosition(mUtils.Vector(position));
        }
        function _handleMovementStart() {
            
            rootSVGElement.addEventListener('mousemove', _handleMouseMove);
            rootSVGElement.addEventListener('mouseup', _handleMovementEnd);

            //rootSVGElement.addEventListener('touchmove', handleMouseMove);
            //rootSVGElement.addEventListener('touchend', handleMovementEnd);
        }
        function _handleMovementEnd() {
            rootSVGElement.removeEventListener('mousemove', _handleMouseMove);
            rootSVGElement.removeEventListener('mouseup', _handleMovementEnd);

            //rootSVGElement.removeEventListener('touchmove', handleMouseMove);
            //rootSVGElement.removeEventListener('touchend', handleMovementEnd);
        }
        _golfBallElement.addEventListener('mousedown', _handleMovementStart);
        //golfBallElement.addEventListener('touchstart', handleMovementStart);
    }

    function initialize() {
        draw();
        _addEventListeners();
    }


    return({ initialize, draw, 
        getPosition, setPosition, 
        getSpeed, setSpeed,
        getDirection, setDirection })

}

export default GolfBall;