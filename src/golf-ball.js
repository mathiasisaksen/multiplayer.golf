import { svgConfig } from './game-config';
import * as svgUtilities from './svg-utilities';

const GolfBall = function(
        initialPosition, 
        initialDirection, 
        initialSpeed, 
        rootSVGElement) {

    let position = initialPosition;
    let direction = initialDirection;
    let speed = initialSpeed;
    let golfBallElement;
    const computeSVGPosition = svgUtilities.createSVGPositionComputer(rootSVGElement);

    function draw() {
        golfBallElement = svgUtilities.drawCircle(rootSVGElement, position, 
            svgConfig.golfBallAttributes, ['golf-ball']);
    }

    function setPosition(newPosition) {
        position = newPosition;
        svgUtilities.setCirclePosition(golfBallElement, position);
    }

    function addEventListeners() {
        function handleMouseMove(event) {
            //const touch = event.changedTouches[0];
            //const position = computeSVGPosition({x: touch.clientX, y: touch.clientY});
            const position = computeSVGPosition({x: event.clientX, y: event.clientY});
            setPosition(position);
        }
        function handleMovementStart() {
            
            rootSVGElement.addEventListener('mousemove', handleMouseMove);
            rootSVGElement.addEventListener('mouseup', handleMovementEnd);

            //rootSVGElement.addEventListener('touchmove', handleMouseMove);
            //rootSVGElement.addEventListener('touchend', handleMovementEnd);
        }
        function handleMovementEnd() {
            rootSVGElement.removeEventListener('mousemove', handleMouseMove);
            rootSVGElement.removeEventListener('mouseup', handleMovementEnd);

            //rootSVGElement.removeEventListener('touchmove', handleMouseMove);
            //rootSVGElement.removeEventListener('touchend', handleMovementEnd);
        }
        golfBallElement.addEventListener('mousedown', handleMovementStart);
        //golfBallElement.addEventListener('touchstart', handleMovementStart);
    }

    function initialize() {
        draw();
        addEventListeners();
    }

    return({ draw, setPosition, initialize })

}

export { GolfBall };