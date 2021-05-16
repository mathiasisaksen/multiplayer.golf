import * as svgUtilities from '../utilities/svg-utilities';
import { gameConfig, svgConfig } from '../config';
import * as mUtils from '../utilities/math-utilities'

// vertices is an object containing two arrays: boundary and obstacles
// boundary contains the vertices of the polygonal boundary, while
// obstacles contains zero or more array of vertices for internal obstacles
const Course = function(courseData, rootSVGElement) {
    const _boundaryVertices = courseData.boundary;
    const _obstacles = courseData.obstacles;
    const _covers = courseData.covers;
    const _holePosition = mUtils.Vector(courseData.hole.position);
    const _holeRadius = courseData.hole.radius;
    let _courseElement;
    const _courseAABB = {xMin: Infinity, xMax: -Infinity, 
        yMin: Infinity, yMax: -Infinity};

    let edges = [];

    // Vertices on boundary and obstacles should be in counter-clockwise
    // and clockwise order, respectively
    function _fixVertexOrientation() {
        if (_computePolygonOrientation(_boundaryVertices) < 0) {
            _boundaryVertices.reverse();
        }

        _obstacles?.forEach(obstacle => {
            if (_computePolygonOrientation(obstacle) > 0) {
                obstacle.reverse();
            }
        });
    }

    // Uses approach from https://en.wikipedia.org/wiki/Curve_orientation
    function _computePolygonOrientation(polygon) {
        const minXIndex = polygon.reduce((minIndex, curElem, curIndex, arr) => 
            minIndex = curElem.x < arr[minIndex].x ? curIndex : minIndex, 
            0);
        const prevIndex = minXIndex === 0 ? polygon.length - 1 : minXIndex - 1;
        const nextIndex = minXIndex === polygon.length - 1 ? 0 : minXIndex + 1;

        const vertexA = polygon[prevIndex];
        const vertexB = polygon[minXIndex];
        const vertexC = polygon[nextIndex];

        const determinant = (vertexB.x - vertexA.x)*(vertexC.y - vertexA.y) -
                            (vertexC.x - vertexA.x)*(vertexB.y - vertexA.y)
        return(Math.sign(determinant));
    }

    function _computeEdgesAndAABB() {
        const boundaryVerticesLooped = [..._boundaryVertices];
        boundaryVerticesLooped.push(boundaryVerticesLooped[0]);
    
        // Create array of edges from both boundary and inner obstacles
        for (let i = 1; i < boundaryVerticesLooped.length; i++) {
            const a = boundaryVerticesLooped[i-1];
            const b = boundaryVerticesLooped[i];
            edges.push(mUtils.Edge(
                mUtils.Vector(a), 
                mUtils.Vector(b)));

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
                edges.push(mUtils.Edge(
                    mUtils.Vector(a), 
                    mUtils.Vector(b)));
            }
        });

        _covers?.forEach(cover => {
            cover.AABB = cover.vertices.reduce((coverAABB, curVertex) => {
                coverAABB.xMin = Math.min(curVertex.x, coverAABB.xMin);
                coverAABB.xMax = Math.max(curVertex.x, coverAABB.xMax);
                coverAABB.yMin = Math.min(curVertex.y, coverAABB.yMin);
                coverAABB.yMax = Math.max(curVertex.y, coverAABB.yMax);
                return(coverAABB);
            }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
        });
    }

    function _sortCovers() {
        _covers?.sort((a, b) => 
            gameConfig.coverPriority[a.type] - gameConfig.coverPriority[b.type]);
    }
    
    function draw() {
        svgUtilities.drawPolygon(_courseElement, _boundaryVertices, 
            svgConfig.boundaryAttributesOuter, ['course-boundary', 'course-boundary-outer']);
        svgUtilities.drawPolygon(_courseElement, _boundaryVertices, 
            svgConfig.boundaryAttributesInner, ['course-boundary', 'course-boundary-inner']);

        // Draw first cover last (slice creates shallow copy)
        _covers?.slice().reverse().forEach(cover => {
            svgUtilities.drawPolygon(_courseElement, cover.vertices, 
                svgConfig[`${cover.type}Attributes`], 
                ['course-cover', `${cover.type}-cover`]);
            }
        );

        _obstacles?.forEach(obstacleVertices => {
            svgUtilities.drawPolygon(_courseElement, obstacleVertices, 
                svgConfig.obstacleAttributes, ['course-obstacle']);
            }
        );

        svgUtilities.drawCircle(_courseElement, _holePosition, _holeRadius, svgConfig.holeAttributes, ['course-hole']);
    }

    function destroy() {
        _courseElement.remove();
    }

    function initialize() {
        _courseElement = svgUtilities.createGroupElement(['course-container']);
        rootSVGElement.append(_courseElement);
        _fixVertexOrientation();
        _sortCovers();
        _computeEdgesAndAABB();
        draw();
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

    function getCoversAtPosition(position) {
        const result = [];
        _covers?.forEach(cover => {
            if (mUtils.isPointInPolygon(position, cover.vertices)) {
                result.push(cover);
            }
        });
        return(result);
    }

    return({ draw, initialize, getBoundaryVertices, getObstacles, getEdges,
        getHole, destroy, getCourseAABB, getCoversAtPosition });
};

export default Course;