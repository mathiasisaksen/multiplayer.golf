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

    function draw() {
        golfBallElement = svgUtilities.drawCircle(rootSVGElement, position, 
            svgConfig.golfBallAttributes, ['golf-ball']);
    }

    function setPosition(newPosition) {
        position = newPosition;
        svgUtilities.setCirclePosition(golfBallElement, position);
    }
    return({ draw, setPosition })

}

export { GolfBall };