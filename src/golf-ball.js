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
        golfBallElement.addEventListener('click', event => {
            const position = computeSVGPosition(event);
            setPosition(position);
        });
    }

    function setPosition(newPosition) {
        position = newPosition;
        svgUtilities.setCirclePosition(golfBallElement, position);
    }


    
    return({ draw, setPosition })

}

export { GolfBall };