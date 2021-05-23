import * as svgUtils from './utilities/svg-utilities';
import { svgConfig } from './config';

const XMLNS = 'http://www.w3.org/2000/svg';
const rootSVGElement = document.querySelector('#svg-container');
let timeOfLastScroll = new Date().getTime();

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

rootSVGElement.addEventListener('mousedown', handleSVGMouseDown);

function setupCirclePattern(patternElement, colors) {
    const size = svgConfig.circlePatternSize;
    
    const background = document.createElementNS(XMLNS, 'rect');
    background.setAttribute("x", 0);
    background.setAttribute("y", 0);
    background.setAttribute("width", 1);
    background.setAttribute("height", 1);
    background.setAttribute("fill", colors[0]);
    patternElement.appendChild(background);
    const xArray = [...Array(size + 1).keys()];
    xArray.sort((a, b) => Math.random() - 0.5);
    const yArray = [...Array(size + 1).keys()];
    yArray.sort((a, b) => Math.random() - 0.5);

    for (let i = 0; i < size + 1; i++) {
        const x = xArray[i] / size;
        for (let j = 0; j < size + 1; j++) {
            const y = yArray[j] / size;

            const colorIndex = Math.floor(Math.random() * colors.length);
            const circle = document.createElementNS(XMLNS, 'circle');
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 1 / size);
            circle.setAttribute("fill", colors[colorIndex]);
            patternElement.appendChild(circle);
        }
    }
}

// Setup grass pattern
const grassElement = document.querySelector("#grass-pattern");
const grassColors = ["#81B214", "#82B313", "#82B312", "#83B411", "#83B510", 
        "#83B610", "#84B60F", "#84B70E", "#85B80D", "#86B80C", "#86B90C", 
        "#86BA0B", "#87BB0A", "#88BB09", "#88BC08", "#89BD08", "#89BD07", 
        "#8ABE06", "#8ABF05", "#8BC005"];
setupCirclePattern(grassElement, grassColors);

// Setup sand pattern
/*const sandElement = document.querySelector("#sand-pattern");
const sandColors = ["#bfb882", "#c4bc8d", "#cec69d", "#d6cfaf", "#dbd3b8", "#dedabe"]
setupCirclePattern(sandElement, sandColors);*/

export default rootSVGElement;