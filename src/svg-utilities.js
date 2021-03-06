
const XMLNS = 'http://www.w3.org/2000/svg';

function setAttributes(element, attributes) {
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}

function drawLine(svgElement, startPoint, endPoint, attributes, classArray) {
    attributes.x1 = startPoint.x;
    attributes.y1 = startPoint.y;
    attributes.x2 = endPoint.x;
    attributes.y2 = endPoint.y;

    const lineElement = document.createElementNS(XMLNS, 'line');
    classArray?.forEach(className => lineElement.classList.add(className));
    setAttributes(lineElement, attributes);

    svgElement.append(lineElement);
    
}

function drawPolygon(svgElement, vertices, attributes, classArray) {
    // Format expected by SVG polygon: x1,y1 x2,y2,...
    const vertexString = vertices.map(vertex => `${vertex.x},${vertex.y}`).join(" ");
    attributes.points = vertexString;

    const polygonElement = document.createElementNS(XMLNS, 'polygon');
    classArray?.forEach(className => polygonElement.classList.add(className));
    setAttributes(polygonElement, attributes);

    svgElement.append(polygonElement);
}

function createGroupElement(classArray) {
    const groupElement = document.createElementNS(XMLNS, 'g');
    classArray?.forEach(className => groupElement.classList.add(className));
    return(groupElement);
}

export { drawLine, drawPolygon, createGroupElement };