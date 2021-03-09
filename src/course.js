import * as svgUtilities from './svg-utilities';
import { svgConfig } from './game-config';
import * as mUtils from './math-utilities'

// vertices is an object containing two arrays: boundary and obstacles
// boundary contains the vertices of the polygonal boundary, while
// obstacles contains zero or more array of vertices for internal obstacles
const Course = function(vertices, rootSVGElement) {
    const boundaryVertices = vertices.boundary;
    const obstacles = vertices.obstacles;
    const courseElement = svgUtilities.createGroupElement(['course-container']);
    rootSVGElement.append(courseElement);

    let edges = [];

    function computeEdges() {
        const boundaryVerticesLooped = [...boundaryVertices];
        boundaryVerticesLooped.push(boundaryVerticesLooped[0]);
    
        // Create array of edges from both boundary and inner obstacles
        for (let i = 1; i < boundaryVerticesLooped.length; i++) {
            const a = boundaryVerticesLooped[i-1];
            const b = boundaryVerticesLooped[i];
            edges.push(mUtils.Edge(mUtils.Vector({x: a.x, y: a.y}), mUtils.Vector({x: b.x, y: b.y})));
        }
        obstacles?.forEach(obstacleVertices => {
            const obstacleVerticesLooped = [...obstacleVertices];
            obstacleVerticesLooped.push(obstacleVerticesLooped[0]);
            for (let i = 1; i < obstacleVerticesLooped.length; i++) {
                const a = obstacleVerticesLooped[i-1];
                const b = obstacleVerticesLooped[i];
            edges.push(mUtils.Edge(mUtils.Vector({x: a.x, y: a.y}), mUtils.Vector({x: b.x, y: b.y})));
            }
        })
    
    }
    
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
        computeEdges();
        console.log(edges.map(edge => edge.getString()));
        draw();
    }

    function getBoundaryVertices() {
        return(boundaryVertices);
    }

    function getObstacles() {
        return(obstacles);
    }

    function getEdges() {
        return(edges);
    }

    return({ draw, initialize, getBoundaryVertices, getObstacles, getEdges });
};

export default Course;