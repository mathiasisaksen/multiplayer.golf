
const XMLNS = 'http://www.w3.org/2000/svg';

function createSVGPositionComputer(rootSVGElement) {
    const point = rootSVGElement.createSVGPoint();

    function computeSVGPosition(event) {
        point.x = event.clientX;
        point.y = event.clientY;
        return(point.matrixTransform(rootSVGElement.getScreenCTM().inverse()));
    }
    return(computeSVGPosition);
}

function setAttributes(element, attributes) {
    if (!attributes) return;
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}

function createGeneralElement(type, attributes, classArray) {
    const element = document.createElementNS(XMLNS, type);
    classArray?.forEach(className => element.classList.add(className));
    setAttributes(element, attributes);
    return(element);
}

function drawLine(parentSVGElement, startPoint, endPoint, attributes, classArray) {
    attributes.x1 = startPoint.x;
    attributes.y1 = startPoint.y;
    attributes.x2 = endPoint.x;
    attributes.y2 = endPoint.y;

    const lineElement = createGeneralElement('line', attributes, classArray);

    parentSVGElement.append(lineElement);
    return(lineElement);
    
}

function drawPolygon(parentSVGElement, vertices, attributes, classArray) {
    // Format expected by SVG polygon: x1,y1 x2,y2,...
    const vertexString = vertices.map(vertex => `${vertex.x},${vertex.y}`).join(" ");
    attributes.points = vertexString;

    const polygonElement = createGeneralElement('polygon', attributes, classArray);

    parentSVGElement.append(polygonElement);
    return(polygonElement);
}

function drawCircle(parentSVGElement, center, attributes, classArray) {
    attributes.cx = center.x;
    attributes.cy = center.y;

    const circleElement = createGeneralElement('circle', attributes, classArray);

    parentSVGElement.append(circleElement);
    return(circleElement);
}

function createGroupElement(classArray) {
    const groupElement = createGeneralElement('g', null, classArray);
    return(groupElement);
}

function setCirclePosition(circleElement, position) {
    setAttributes(circleElement, {cx: position.x, cy: position.y});
}

export { drawLine, drawPolygon, drawCircle, createGroupElement, setCirclePosition, createSVGPositionComputer };