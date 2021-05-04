import * as svgUtils from './utilities/svg-utilities';
import { svgConfig } from './config';

const rootSVGElement = document.querySelector('#svg-container');
let timeOfLastScroll = new Date().getTime();

let mouseX = rootSVGElement.clientWidth / 2;
let mouseY = rootSVGElement.clientHeight / 2;

function handleSVGScrollZoom(event) {
    const currentTime = new Date().getTime();
    if (currentTime - timeOfLastScroll < 1000*svgConfig.scrollDelay) return;

    const positionComputer = svgUtils.createSVGPositionComputer(this);
    const mousePosition = positionComputer({x: event.clientX, y: event.clientY});
    const oldViewBox = this.getAttribute('viewBox')
        .split(' ')
        .map(elem => parseFloat(elem));
    
    let newViewBox;
    let deltaYNorm = event.deltaY > 0 ? 1: -1;
    if (deltaYNorm < 0) {
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            svgConfig.zoomFactor, svgConfig.centerMouseInterpolation);
    } else {
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            1 / svgConfig.zoomFactor, 0);
    }
        
    this.setAttribute('viewBox', newViewBox.join(' '));
    timeOfLastScroll = currentTime;
}

function handleSVGScrollKey(event) {
    let zoomDirection;
    if (event.key === '+') {
        zoomDirection = 1;
    } else if (event.key === '-') {
        zoomDirection = -1;
    } else {
        return;
    }
    
    const positionComputer = svgUtils.createSVGPositionComputer(this);
    const mousePosition = positionComputer({x: mouseX, y: mouseY});
    const oldViewBox = this.getAttribute('viewBox')
        .split(' ')
        .map(elem => parseFloat(elem));
    
    let newViewBox;
    if (zoomDirection > 0) {
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            svgConfig.zoomFactor, svgConfig.centerMouseInterpolation);
    } else {
        newViewBox = svgUtils.computeNewViewBox(oldViewBox, mousePosition, 
            1 / svgConfig.zoomFactor, 0);
    }
        
    this.setAttribute('viewBox', newViewBox.join(' '));
}

function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function handleSVGMouseDown(event) {
    let initialPosition = rootSVGElement.createSVGPoint();
    initialPosition.x = event.clientX;
    initialPosition.y = event.clientY;

    let svgCTM = rootSVGElement.getScreenCTM().inverse();
    let initialSVGPosition = initialPosition.matrixTransform(svgCTM);

    function handleSVGMouseMove(event) {
        
        const viewBox = rootSVGElement.getAttribute('viewBox')
            .split(' ')
            .map(elem => parseFloat(elem));

        // Current position of pointer
        let currentPosition = rootSVGElement.createSVGPoint();
        currentPosition.x = event.clientX;
        currentPosition.y = event.clientY;

        let currentSVGPosition = currentPosition.matrixTransform(svgCTM);

        // How far has the pointer moved since the last move?
        let amountX = currentSVGPosition.x - initialSVGPosition.x;
        let amountY = currentSVGPosition.y - initialSVGPosition.y;

        // Update lower left corner of viewbox
        viewBox[0] -= amountX;
        viewBox[1] -= amountY;
        
        rootSVGElement.setAttribute('viewBox', viewBox.join(' '));
        initialSVGPosition = currentSVGPosition;
    }

    function handleSVGMouseUp() {
        window.removeEventListener('mousemove', handleSVGMouseMove);
        window.removeEventListener('mouseup', handleSVGMouseUp);
    }
    
    window.addEventListener('mousemove', handleSVGMouseMove);
    window.addEventListener('mouseup', handleSVGMouseUp);
    
}

rootSVGElement.addEventListener('wheel', handleSVGScrollZoom);
window.addEventListener('keydown', handleSVGScrollKey.bind(rootSVGElement));
rootSVGElement.addEventListener('mousemove', handleMouseMove);

rootSVGElement.addEventListener('mousedown', handleSVGMouseDown);

export default rootSVGElement;