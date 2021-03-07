import * as svgUtilities from './svg-utilities';
import { svgConfig } from './game-config';

// vertices is an object containing two arrays: boundary and obstacles
// boundary contains the vertices of the polygonal boundary, while
// obstacles contains zero or more array of vertices for internal obstacles
const Course = function(vertices, rootSVGElement) {
    const boundaryVertices = vertices.boundary;
    const obstacles = vertices.obstacles;
    const courseElement = svgUtilities.createGroupElement(['course-container']);
    rootSVGElement.append(courseElement);

    function printVertices() {
        console.log(vertices);
    }

    function draw() {
        svgUtilities.drawPolygon(courseElement, boundaryVertices, 
            svgConfig.boundaryAttributesOuter, ['course-boundary', 'course-boundary-outer']);
        svgUtilities.drawPolygon(courseElement, boundaryVertices, 
            svgConfig.boundaryAttributesInner, ['course-boundary', 'course-boundary-inner']);
        boundaryVertices.forEach(vertex => svgUtilities.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'red', 'stroke-width': 0 }));
        obstacles?.forEach(obstacleVertices => {
            svgUtilities.drawPolygon(courseElement, obstacleVertices, 
                svgConfig.obstacleAttributes, ['course-obstacle']);
            obstacleVertices.forEach(vertex => svgUtilities.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'blue', 'stroke-width': 0 }));
            }
        )
    }

    function initialize() {
        draw();
    }

    function getBoundaryVertices() {
        return(boundaryVertices);
    }

    function getObstacles() {
        return(obstacles);
    }

    return({ draw, initialize, getBoundaryVertices, getObstacles });
};

export default Course;