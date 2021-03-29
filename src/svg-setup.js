import * as svgUtils from './svg-utilities';
import { svgConfig } from './config';

const rootSVGElement = document.querySelector('#game-container');


function handleSVGScrollZoom(event) {
    const positionComputer = svgUtils.createSVGPositionComputer(this);
    const mousePosition = positionComputer({x: event.clientX, y: event.clientY});
    const oldViewBox = this.getAttribute('viewBox')
        .split(' ')
        .map(elem => parseFloat(elem));
    
    let newViewBox;
    let deltaYNorm = event.deltaY / 83.3;
    let zoomFactorNorm = 1 - Math.abs(deltaYNorm) * (1 - svgConfig.zoomFactor);
    console.log(zoomFactorNorm);
    if (deltaYNorm < 0) {
        let interpolationWeightNorm = Math.abs(deltaYNorm)*svgConfig.centerMouseInterpolation;
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            zoomFactorNorm, interpolationWeightNorm);
    } else {
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            1 / zoomFactorNorm, 0);
    }
        
    this.setAttribute('viewBox', newViewBox.join(' '));
}

function handleSVGMouseDown(event) {
    let initialPosition = {x: event.clientX , y: event.clientY};
    const courseElement = this.querySelector('.course-container');

    function handleSVGMouseMove(event) {
        const courseClientRect = courseElement.getBoundingClientRect();
        const courseSVGRect = courseElement.getBBox();

        const viewBox = this.getAttribute('viewBox')
            .split(' ')
            .map(elem => parseFloat(elem));

        // Current position of pointer
        const currentPosition = {x: event.clientX , y: event.clientY};

        // How far has the pointer moved since the last move?
        let amountX = currentPosition.x - initialPosition.x;
        let amountY = currentPosition.y - initialPosition.y;

        // Normalize to values between 0 and 1
        amountX =  amountX * courseSVGRect.width / courseClientRect.width;
        amountY =  amountY * courseSVGRect.height / courseClientRect.height;
        console.log(amountX, amountY);

        // Update lower left corner of viewbox
        viewBox[0] -= amountX;
        viewBox[1] -= amountY;
        
        this.setAttribute('viewBox', viewBox.join(' '));
        initialPosition = currentPosition;
    }

    function handleSVGMouseUp() {
        this.removeEventListener('mousemove', handleSVGMouseMove);
        this.removeEventListener('mouseup', handleSVGMouseUp);
    }
    
    this.addEventListener('mousemove', handleSVGMouseMove);
    this.addEventListener('mouseup', handleSVGMouseUp);
    
}

rootSVGElement.addEventListener('wheel', handleSVGScrollZoom);
rootSVGElement.addEventListener('mousedown', handleSVGMouseDown);

export default rootSVGElement;