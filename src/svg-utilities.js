
const XMLNS = 'http://www.w3.org/2000/svg';

function createSVGPositionComputer(rootSVGElement) {
    const point = rootSVGElement.createSVGPoint();
    function computeSVGPosition(clientPosition) {
        point.x = clientPosition.x;
        point.y = clientPosition.y;
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
    attributes.x1 = startPoint.x || startPoint.getX();
    attributes.y1 = startPoint.y || startPoint.getY();
    attributes.x2 = endPoint.x || endPoint.getX();
    attributes.y2 = endPoint.y || endPoint.getY();

    const lineElement = createGeneralElement('line', attributes, classArray);

    parentSVGElement.append(lineElement);
    return(lineElement);
    
}

function drawPolygon(parentSVGElement, vertices, attributes, classArray) {
    // Format expected by SVG polygon: x1,y1 x2,y2,...
    const vertexString = vertices
        .map(vertex => `${vertex.x || vertex.getX() },${vertex.y || vertex.getY()}`)
        .join(" ");
    attributes.points = vertexString;

    const polygonElement = createGeneralElement('polygon', attributes, classArray);

    parentSVGElement.append(polygonElement);
    return(polygonElement);
}

function drawCircle(parentSVGElement, center, attributes, classArray) {
    attributes.cx = center.x || center.getX();
    attributes.cy = center.y || center.getY();

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

function setLineEnd(lineElement, endPosition) {
    setAttributes(lineElement, {'x2': endPosition.x || endPosition.getX(), 
        'y2': endPosition.y || endPosition.getY()});
}

function setSVGExtent(rootSVGElement, extent, padding) {
    const width = extent.xMax - extent.xMin;
    const height = extent.yMax - extent.yMin;

    const xMinPadded = extent.xMin - padding*width;
    const yMinPadded = extent.yMin - padding*height;
    const widthPadded = (1 + 2*padding)*width;
    const heightPadded = (1 + 2*padding)*height;
    const viewBoxString = `${xMinPadded} ${yMinPadded} ${widthPadded} ${heightPadded}`;
    rootSVGElement.setAttribute('viewBox', viewBoxString);
}

export { setAttributes, drawLine, drawPolygon, drawCircle, createGroupElement, 
    setCirclePosition, setLineEnd, createSVGPositionComputer,
    setSVGExtent };