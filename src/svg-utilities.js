
const XMLNS = 'http://www.w3.org/2000/svg';

function setAttributes(element, attributes) {
    for (const name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
}

function drawLine(svgElement, startPoint, endPoint, attributes) {
    attributes.x1 = startPoint.x;
    attributes.y1 = startPoint.y;
    attributes.x2 = endPoint.x;
    attributes.y2 = endPoint.y;

    const lineElement = document.createElementNS(XMLNS, 'line');
    lineElement.classList.add('course-boundary');
    setAttributes(lineElement, attributes);

    svgElement.append(lineElement);
    
}

function drawPolygon(svgElement, vertices, attributes) {
    // Format expected by SVG polygon: x1,y1 x2,y2,...
    const vertexString = vertices.map(vertex => `${vertex.x},${vertex.y}`).join(" ");
    attributes.points = vertexString;

    const polygonElement = document.createElementNS(XMLNS, 'polygon');
    polygonElement.classList.add('course-boundary');
    setAttributes(polygonElement, attributes);

    svgElement.append(polygonElement);
}

export { drawLine, drawPolygon };