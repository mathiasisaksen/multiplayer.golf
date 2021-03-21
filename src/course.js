import * as svgUtilities from './svg-utilities';
import { gameConfig, svgConfig } from './config';
import * as mUtils from './math-utilities'

// vertices is an object containing two arrays: boundary and obstacles
// boundary contains the vertices of the polygonal boundary, while
// obstacles contains zero or more array of vertices for internal obstacles
const Course = function(courseData, rootSVGElement) {
    const _boundaryVertices = courseData.boundary;
    const _obstacles = courseData.obstacles;
    const _holePosition = mUtils.Vector(courseData.hole.position);
    const _holeRadius = courseData.hole.radius;
    let _courseElement;
    const _courseAABB = {xMin: Infinity, xMax: -Infinity, 
        yMin: Infinity, yMax: -Infinity};

    let edges = [];

    function _computeEdgesAndAABB() {
        const boundaryVerticesLooped = [..._boundaryVertices];
        boundaryVerticesLooped.push(boundaryVerticesLooped[0]);
    
        // Create array of edges from both boundary and inner obstacles
        for (let i = 1; i < boundaryVerticesLooped.length; i++) {
            const a = boundaryVerticesLooped[i-1];
            const b = boundaryVerticesLooped[i];
            edges.push(mUtils.Edge(mUtils.Vector({x: a.x, y: a.y}), mUtils.Vector({x: b.x, y: b.y})));

            _courseAABB.xMin = Math.min(_courseAABB.xMin, a.x);
            _courseAABB.xMax = Math.max(_courseAABB.xMax, a.x);
            _courseAABB.yMin = Math.min(_courseAABB.yMin, a.y);
            _courseAABB.yMax = Math.max(_courseAABB.yMax, a.y);

        }
        _obstacles?.forEach(obstacleVertices => {
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
        console.log(courseData);
    }

    function draw() {
        svgUtilities.drawPolygon(_courseElement, _boundaryVertices, 
            svgConfig.boundaryAttributesOuter, ['course-boundary', 'course-boundary-outer']);
        svgUtilities.drawPolygon(_courseElement, _boundaryVertices, 
            svgConfig.boundaryAttributesInner, ['course-boundary', 'course-boundary-inner']);
        //boundaryVertices.forEach(vertex => svgUtilities.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'red', 'stroke-width': 0 }));
        _obstacles?.forEach(obstacleVertices => {
            svgUtilities.drawPolygon(_courseElement, obstacleVertices, 
                svgConfig.obstacleAttributes, ['course-obstacle']);
            //obstacleVertices.forEach(vertex => svgUtilities.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'blue', 'stroke-width': 0 }));
            }
        )
        const holeAttributes = svgConfig.holeAttributes;
        holeAttributes.r = _holeRadius;
        svgUtilities.drawCircle(_courseElement, _holePosition, holeAttributes, ['course-hole']);
    }

    function destroy() {
        _courseElement.remove();
    }

    function initialize() {
        _courseElement = svgUtilities.createGroupElement(['course-container']);
        rootSVGElement.append(_courseElement);
        _computeEdgesAndAABB();
        draw();
        console.log(getCourseAABB());
    }

    function getBoundaryVertices() {
        return(_boundaryVertices);
    }

    function getObstacles() {
        return(_obstacles);
    }

    function getEdges() {
        return(edges);
    }

    function getHole() {
        return({position: _holePosition, radius: _holeRadius});
    }

    function getCourseAABB() {
        return(_courseAABB);
    }

    return({ draw, initialize, getBoundaryVertices, getObstacles, getEdges,
        getHole, destroy, getCourseAABB });
};

export default Course;