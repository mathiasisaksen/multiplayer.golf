import * as svgUtilities from './svg-utilities';
import { svgConfig } from './game-config';

// vertices is an object containing two arrays: boundary and obstacles
// boundary contains the vertices of the polygonal boundary, while
// obstacles contains zero or more array of vertices for internal obstacles
const Course = function(vertices) {
    const boundaryVertices = vertices.boundary;
    const obstacles = vertices.obstacles;

    function printVertices() {
        console.log(vertices);
    }

    function drawCourse(svgElement) {
        svgUtilities.drawPolygon(svgElement, boundaryVertices, svgConfig.boundaryAttributes);
        if (obstacles) {
            for (const obstacleVertices of obstacles) {
                svgUtilities.drawPolygon(svgElement, obstacleVertices, svgConfig.obstacleAttributes);
            }
        }
        /*for (let i = 1; i < numberOfVertices; i++) {
            svgUtilities.drawLine(svgElement, vertices[i - 1], vertices[i],
                svgConfig.lineAttributes)
        }*/
    }

    return({printVertices, drawCourse});
};

export default Course;