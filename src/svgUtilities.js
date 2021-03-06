
const XMLNS = 'http://www.w3.org/2000/svg';

function setAttributes(element, attributes) {
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}

function drawLine(svgElement, startPoint, EndPoint, attributes) {
    const lineElement = document.createElementNS(XMLNS, 'line');
    lineElement.classList.add('course-boundary');
    setAttributes(lineElement, attributes);

    svgElement.append(lineElement);
    
}

export { drawLine };