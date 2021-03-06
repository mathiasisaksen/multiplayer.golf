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
            svgConfig.boundaryAttributes, ["course-boundary"]);
        obstacles?.forEach(obstacleVertices => {
            svgUtilities.drawPolygon(courseElement, obstacleVertices, 
                svgConfig.obstacleAttributes, ["course-obstacle"]);
            }
        )
    }

    return({printVertices, draw});
};

export default Course;