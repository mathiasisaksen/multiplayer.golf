import * as svgUtilities from './svg-utilities';
import { svgConfig } from './game-config';

console.log(svgConfig)
const Course = function(vertices, looped = false) {
    if (!looped) {
        vertices.push(vertices[0]);
    }
    const numberOfVertices = vertices.length;

    function printVertices() {
        console.log(vertices);
    }

    function drawCourse(svgElement) {
        for (let i = 1; i < numberOfVertices; i++) {
            svgUtilities.drawLine(svgElement, vertices[i - 1], vertices[i],
                svgConfig.lineAttributes)
        }
    }

    return({printVertices, drawCourse});
};

export default Course;