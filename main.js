/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/course.js":
/*!***********************!*\
  !*** ./src/course.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _svg_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg-utilities */ \"./src/svg-utilities.js\");\n/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-config */ \"./src/game-config.js\");\n/* harmony import */ var _math_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math-utilities */ \"./src/math-utilities.js\");\n\n\n\n\n// vertices is an object containing two arrays: boundary and obstacles\n// boundary contains the vertices of the polygonal boundary, while\n// obstacles contains zero or more array of vertices for internal obstacles\nconst Course = function(vertices, rootSVGElement) {\n    const boundaryVertices = vertices.boundary;\n    const obstacles = vertices.obstacles;\n    const courseElement = _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.createGroupElement(['course-container']);\n    rootSVGElement.append(courseElement);\n\n    let edges = [];\n\n    function computeEdges() {\n        const boundaryVerticesLooped = [...boundaryVertices];\n        boundaryVerticesLooped.push(boundaryVerticesLooped[0]);\n    \n        // Create array of edges from both boundary and inner obstacles\n        for (let i = 1; i < boundaryVerticesLooped.length; i++) {\n            const a = boundaryVerticesLooped[i-1];\n            const b = boundaryVerticesLooped[i];\n            edges.push(_math_utilities__WEBPACK_IMPORTED_MODULE_2__.Edge(_math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(a.x, a.y), _math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(b.x, b.y)));\n        }\n        obstacles?.forEach(obstacleVertices => {\n            const obstacleVerticesLooped = [...obstacleVertices];\n            obstacleVerticesLooped.push(obstacleVerticesLooped[0]);\n            for (let i = 1; i < obstacleVerticesLooped.length; i++) {\n                const a = obstacleVerticesLooped[i-1];\n                const b = obstacleVerticesLooped[i];\n            edges.push(_math_utilities__WEBPACK_IMPORTED_MODULE_2__.Edge(_math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(a.x, a.y), _math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(b.x, b.y)));\n            }\n        })\n    \n    }\n    \n    function printVertices() {\n        console.log(vertices);\n    }\n\n    function draw() {\n        _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.drawPolygon(courseElement, boundaryVertices, \n            _game_config__WEBPACK_IMPORTED_MODULE_1__.svgConfig.boundaryAttributesOuter, ['course-boundary', 'course-boundary-outer']);\n        _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.drawPolygon(courseElement, boundaryVertices, \n            _game_config__WEBPACK_IMPORTED_MODULE_1__.svgConfig.boundaryAttributesInner, ['course-boundary', 'course-boundary-inner']);\n        boundaryVertices.forEach(vertex => _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'red', 'stroke-width': 0 }));\n        obstacles?.forEach(obstacleVertices => {\n            _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.drawPolygon(courseElement, obstacleVertices, \n                _game_config__WEBPACK_IMPORTED_MODULE_1__.svgConfig.obstacleAttributes, ['course-obstacle']);\n            obstacleVertices.forEach(vertex => _svg_utilities__WEBPACK_IMPORTED_MODULE_0__.drawCircle(courseElement, vertex, {'r': 0.5, fill: 'blue', 'stroke-width': 0 }));\n            }\n        )\n    }\n\n    function initialize() {\n        computeEdges();\n        draw();\n    }\n\n    function getBoundaryVertices() {\n        return(boundaryVertices);\n    }\n\n    function getObstacles() {\n        return(obstacles);\n    }\n\n    function getEdges() {\n        return(edges);\n    }\n\n    return({ draw, initialize, getBoundaryVertices, getObstacles, getEdges });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Course);\n\n//# sourceURL=webpack://minigolf/./src/course.js?");

/***/ }),

/***/ "./src/game-config.js":
/*!****************************!*\
  !*** ./src/game-config.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameConfig\": () => (/* binding */ gameConfig),\n/* harmony export */   \"svgConfig\": () => (/* binding */ svgConfig)\n/* harmony export */ });\nconst gameConfig = {\n    golfBallRadius: 2,\n    speedThreshold: 0.001\n};\n\nconst svgConfig = {\n    golfBallAttributes: {'r': gameConfig.golfBallRadius, 'fill': 'black', opacity: 0.5},\n    // The boundary is divided into two components.\n    // The outer draws the boundary, while the inner ensures that the inner area is white\n    // for the golf ball\n    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 6, 'fill': 'none'},\n    boundaryAttributesInner: {'stroke': 'white', 'fill': 'white'},\n    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},\n};\nsvgConfig.boundaryAttributesInner['stroke-width'] = 0;\nsvgConfig.obstacleAttributes['stroke-width'] = 0;\n\n\n\n//# sourceURL=webpack://minigolf/./src/game-config.js?");

/***/ }),

/***/ "./src/game-mechanics.js":
/*!*******************************!*\
  !*** ./src/game-mechanics.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _math_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-utilities */ \"./src/math-utilities.js\");\n/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-config */ \"./src/game-config.js\");\n\n\n\nconst GameMechanics = function(course, golfBall) {\n    const boundaryVertices = course.getBoundaryVertices();\n    // Create loop to simplify computations\n    boundaryVertices.push(boundaryVertices[0]);\n    \n    // Create array of edges from both boundary and inner obstacles\n    let edges = course.getEdges();\n    \n    console.log(edges);\n\n    function computeCollision() {\n        const golfBallPosition = golfBall.getPosition();\n        const golfBallDirection = golfBall.getDirection();\n        const directionVector = _math_utilities__WEBPACK_IMPORTED_MODULE_0__.createUnitVector(golfBallDirection);\n        const golfBallPath = _math_utilities__WEBPACK_IMPORTED_MODULE_0__.Path(golfBallPosition, directionVector);\n\n        // Paths that outline the area covered by the motion of the golf ball\n        const outerPaths = _math_utilities__WEBPACK_IMPORTED_MODULE_0__.getParallelPaths(golfBallPath, _game_config__WEBPACK_IMPORTED_MODULE_1__.gameConfig.golfBallRadius);\n        console.log(outerPaths.pathA.getString());\n        console.log(outerPaths.pathB.getString());\n    }\n    computeCollision();\n    function step(timeStep) {\n        const oldPosition = golfBall.getPosition();\n        const speed = golfBall.getSpeed();\n        const direction = golfBall.getDirection();\n        console.log(\"speed\", speed)\n        console.log(\"direction\", direction);\n        let dt = 0.001;\n        let change = {}\n        change.x = speed*Math.cos(direction);\n        change.y = speed*Math.sin(direction);\n        //console.table(change);\n        const newPosition = _math_utilities__WEBPACK_IMPORTED_MODULE_0__.addVectors(oldPosition, change);\n        golfBall.setPosition(newPosition);\n    }\n    //setInterval(step, 100);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameMechanics);\n\n//# sourceURL=webpack://minigolf/./src/game-mechanics.js?");

/***/ }),

/***/ "./src/golf-ball.js":
/*!**************************!*\
  !*** ./src/golf-ball.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _game_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-config */ \"./src/game-config.js\");\n/* harmony import */ var _svg_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg-utilities */ \"./src/svg-utilities.js\");\n/* harmony import */ var _math_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math-utilities */ \"./src/math-utilities.js\");\n\n\n\n\nconst GolfBall = function(\n        initialPosition, \n        initialSpeed, \n        initialDirection, \n        rootSVGElement) {\n    \n    let position = _math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(initialPosition);\n    let speed = initialSpeed;\n    let direction = initialDirection;\n    let _golfBallElement;\n    const _computeSVGPosition = _svg_utilities__WEBPACK_IMPORTED_MODULE_1__.createSVGPositionComputer(rootSVGElement);\n\n    function draw() {\n        _golfBallElement = _svg_utilities__WEBPACK_IMPORTED_MODULE_1__.drawCircle(rootSVGElement, position.getCoordinates(), \n            _game_config__WEBPACK_IMPORTED_MODULE_0__.svgConfig.golfBallAttributes, ['golf-ball']);\n    }\n\n    function getPosition() {\n        return(position);\n    }\n\n    function setPosition(newPosition) {\n        position = newPosition;\n        _svg_utilities__WEBPACK_IMPORTED_MODULE_1__.setCirclePosition(_golfBallElement, position.getCoordinates());\n    }\n\n    function getSpeed() {\n        return(speed);\n    }\n\n    function setSpeed(newSpeed) {\n        speed = newSpeed;\n    }\n\n    function getDirection() {\n        return(direction);\n    }\n\n    function setDirection(newDirection) {\n        direction = newDirection;\n    }\n\n    function _addEventListeners() {\n        function _handleMouseMove(event) {\n            //const touch = event.changedTouches[0];\n            //const position = computeSVGPosition({x: touch.clientX, y: touch.clientY});\n            const position = _computeSVGPosition({x: event.clientX, y: event.clientY});\n            setPosition(_math_utilities__WEBPACK_IMPORTED_MODULE_2__.Vector(position));\n        }\n        function _handleMovementStart() {\n            \n            rootSVGElement.addEventListener('mousemove', _handleMouseMove);\n            rootSVGElement.addEventListener('mouseup', _handleMovementEnd);\n\n            //rootSVGElement.addEventListener('touchmove', handleMouseMove);\n            //rootSVGElement.addEventListener('touchend', handleMovementEnd);\n        }\n        function _handleMovementEnd() {\n            rootSVGElement.removeEventListener('mousemove', _handleMouseMove);\n            rootSVGElement.removeEventListener('mouseup', _handleMovementEnd);\n\n            //rootSVGElement.removeEventListener('touchmove', handleMouseMove);\n            //rootSVGElement.removeEventListener('touchend', handleMovementEnd);\n        }\n        _golfBallElement.addEventListener('mousedown', _handleMovementStart);\n        //golfBallElement.addEventListener('touchstart', handleMovementStart);\n    }\n\n    function initialize() {\n        draw();\n        _addEventListeners();\n    }\n\n\n    return({ initialize, draw, \n        getPosition, setPosition, \n        getSpeed, setSpeed,\n        getDirection, setDirection })\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GolfBall);\n\n//# sourceURL=webpack://minigolf/./src/golf-ball.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _course__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./course */ \"./src/course.js\");\n/* harmony import */ var _golf_ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./golf-ball */ \"./src/golf-ball.js\");\n/* harmony import */ var _game_mechanics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-mechanics */ \"./src/game-mechanics.js\");\n\n\n\n\nconst rootSVGElement = document.querySelector('#game-container');\n\nconst course = (0,_course__WEBPACK_IMPORTED_MODULE_0__.default)({\n    boundary: [\n    {x: 10, y: 40},\n    {x: 30, y: 40},\n    {x: 30, y: 45},\n    {x: 65, y: 45},\n    {x: 65, y: 40},\n    {x: 90, y: 40},\n    {x: 90, y: 60},\n    {x: 65, y: 60},\n    {x: 65, y: 55},\n    {x: 30, y: 55},\n    {x: 30, y: 60},\n    {x: 10, y: 60}],\n    obstacles: [\n        [\n            {x: 15, y: 45},\n            {x: 25, y: 45},\n            {x: 25, y: 55},\n            {x: 15, y: 55}]]\n    },\n    rootSVGElement);\ncourse.initialize();\n\nconst golfBall = (0,_golf_ball__WEBPACK_IMPORTED_MODULE_1__.default)({x: 20, y: 20}, 2, 1, rootSVGElement);\ngolfBall.initialize();\n\nconst gameMechanics = (0,_game_mechanics__WEBPACK_IMPORTED_MODULE_2__.default)(course, golfBall);\n/*setInterval(() => {golfBall.setPosition({\n    x: 100*Math.random(),\n    y: 100*Math.random()\n})}, 1000);*/\n\n//# sourceURL=webpack://minigolf/./src/index.js?");

/***/ }),

/***/ "./src/math-utilities.js":
/*!*******************************!*\
  !*** ./src/math-utilities.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector),\n/* harmony export */   \"crossProduct2D\": () => (/* binding */ crossProduct2D),\n/* harmony export */   \"addVectors\": () => (/* binding */ addVectors),\n/* harmony export */   \"subtractVectors\": () => (/* binding */ subtractVectors),\n/* harmony export */   \"createUnitVector\": () => (/* binding */ createUnitVector),\n/* harmony export */   \"Edge\": () => (/* binding */ Edge),\n/* harmony export */   \"Path\": () => (/* binding */ Path),\n/* harmony export */   \"computePathEdgeIntersection\": () => (/* binding */ computePathEdgeIntersection),\n/* harmony export */   \"getParallelPaths\": () => (/* binding */ getParallelPaths)\n/* harmony export */ });\n\n// Represents a general two-dimensional vector (or point)\nfunction Vector({x, y}) {\n    let _x = x;\n    let _y = y;\n    let _length;\n\n    function getX() {\n        return(_x);\n    }\n\n    function setX(newX) {\n        _x = newX;\n    }\n\n    function getY() {\n        return(_y);\n    }\n\n    function setY(newY) {\n        _y = newY;\n    }\n\n    function getCoordinates() {\n        return({x: _x, y: _y})\n    }\n\n    function getPerpendicular() {\n        return(Vector({x: -_y, y: _x}));\n    }\n\n    function getLength() {\n        if (!_length) {\n            _length = Math.sqrt(_x**2 + _y**2)\n        }\n        return(_length);\n    }\n\n    function normalize() {\n        const length = getLength();\n        if (length == 0) return;\n        _x /= length;\n        _y /= length;\n    }\n\n    function getNormalized() {\n        return(Vector({x: _x / getLength(), y: _y / getLength()}));\n    }\n\n    function getString() {\n        return(`[x: ${_x}, y: ${y}]`)\n    }\n    return({ getX, setX, getY, setY, getPerpendicular, getLength, normalize,\n            getCoordinates, getNormalized, getString })\n}\n\nfunction crossProduct2D(vector1, vector2) {\n    return(vector1.getX()*vector2.getY() - vector2.getX()*vector1.getY());\n}\n\nfunction addVectors(vector1, vector2) {\n    const sumX = vector1.getX() + vector2.getX();\n    const sumY = vector1.getY() + vector2.getY();\n    return(Vector({x: sumX, y: sumY}));\n}\n\nfunction subtractVectors(vector1, vector2) {\n    const differenceX = vector1.getX() - vector2.getX();\n    const differenceY = vector1.getY() - vector2.getY();\n    return(Vector({x: differenceX, y: differenceY}));\n}\n\nfunction scaleVector(vector, scalar) {\n    const scaledX = scalar*vector.getX();\n    const scaledY = scalar*vector.getY();\n    return(Vector({x: scaledX, y: scaledY}));\n}\n\nfunction createUnitVector(direction) {\n    return(Vector({x: Math.cos(direction), y: Math.sin(direction)}));\n}\n\n// Represents an edge in a polygon\nfunction Edge(startVertex, endVertex) {\n    let _startVertex = startVertex;\n    let _endVertex = endVertex;\n    let _diffVector = subtractVectors(_endVertex, _startVertex);\n\n    function getLength() {\n        return(_diffVector.getLength());\n    }\n\n    function getStartVertex() {\n        return(_startVertex);\n    }\n\n    function getEndVertex() {\n        return(_endVertex);\n    }\n\n    function getDifferenceVector() {\n        return(_diffVector);\n    }\n\n    function getString() {\n        return(`Start: ${_startVertex.getString()}, end: ${_endVertex.getString()}`)\n    }\n    \n    return({ getLength, getStartVertex, getEndVertex, getDifferenceVector });\n}\n\n// A path describes the motion of the ball\nfunction Path(initialPoint, directionVector) {\n    let _initialPoint = initialPoint;\n    let _directionVector = directionVector;\n\n    function getInitialPoint() {\n        return(_initialPoint);\n    }\n\n    function getDirectionVector() {\n        return(_directionVector);\n    }\n\n    function getPositionAtTime(time) {\n        return(addVectors(_initialPoint, scaleVector(_directionVector, time)));\n    }\n\n    function getString() {\n        return(`Initial point: ${_initialPoint.getString()}, direction: ${_directionVector.getString()}`)\n    }\n\n    return({ getInitialPoint, getDirectionVector, getPositionAtTime, getString });\n}\n\n// Useful reference: Intersection of two line segments\nfunction computePathEdgeIntersection(path, edge) {\n    // Path is on the form pathStart + pathVector*t, where t >= 0\n    const pathStart = path.getInitialPoint();\n    const pathVector = path.getDirectionVector();\n\n    // Edge is on form edgeStart + edgeVector*u, where 0 <= s <= 1\n    const edgeStart = edge.getStartVertex();\n    const edgeVector = edge.getDifferenceVector();\n\n    // Intersection when t = (edgeStart - pathStart) × edgeVector / (pathVector × edgeVector)\n    //                or u = (edgeStart - pathStart) × pathVector / (pathVector × edgeVector)\n    const startDiff = subtractVectors(edgeStart, pathStart);\n    const denominator = crossProduct2D(pathVector, edgeVector);\n    const t = crossProduct2D(startDiff, edgeVector) / denominator;\n    const u = crossProduct2D(startDiff, pathVector) / denominator;\n    const intersectionPoint = path.getPositionAtTime(t);\n    return({ intersectionPoint, pathParameter: t, edgeParameter: u});\n}\n\n// Given a circle and a path, returns the two paths that are parallel to the \n// original path and tangetial to the circle. These will go in the same \n// direction, but start in different points\nfunction getParallelPaths(path, radius) {\n    const directionVector = path.getDirectionVector();\n    const unitPerpVector = directionVector.getNormalized().getPerpendicular();\n\n    const initialPointA = addVectors(path.getInitialPoint(), scaleVector(unitPerpVector, radius));\n    const initialPointB = subtractVectors(path.getInitialPoint(), scaleVector(unitPerpVector, radius));\n    return({pathA: Path(initialPointA, directionVector), pathB: Path(initialPointB, directionVector)})\n}\n\n\n\n//# sourceURL=webpack://minigolf/./src/math-utilities.js?");

/***/ }),

/***/ "./src/svg-utilities.js":
/*!******************************!*\
  !*** ./src/svg-utilities.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawLine\": () => (/* binding */ drawLine),\n/* harmony export */   \"drawPolygon\": () => (/* binding */ drawPolygon),\n/* harmony export */   \"drawCircle\": () => (/* binding */ drawCircle),\n/* harmony export */   \"createGroupElement\": () => (/* binding */ createGroupElement),\n/* harmony export */   \"setCirclePosition\": () => (/* binding */ setCirclePosition),\n/* harmony export */   \"createSVGPositionComputer\": () => (/* binding */ createSVGPositionComputer)\n/* harmony export */ });\n\nconst XMLNS = 'http://www.w3.org/2000/svg';\n\nfunction createSVGPositionComputer(rootSVGElement) {\n    const point = rootSVGElement.createSVGPoint();\n    function computeSVGPosition(clientPosition) {\n        point.x = clientPosition.x;\n        point.y = clientPosition.y;\n        return(point.matrixTransform(rootSVGElement.getScreenCTM().inverse()));\n    }\n    return(computeSVGPosition);\n}\n\nfunction setAttributes(element, attributes) {\n    if (!attributes) return;\n    for (const name in attributes) {\n        element.setAttribute(name, attributes[name]);\n    }\n}\n\nfunction createGeneralElement(type, attributes, classArray) {\n    const element = document.createElementNS(XMLNS, type);\n    classArray?.forEach(className => element.classList.add(className));\n    setAttributes(element, attributes);\n    return(element);\n}\n\nfunction drawLine(parentSVGElement, startPoint, endPoint, attributes, classArray) {\n    attributes.x1 = startPoint.x;\n    attributes.y1 = startPoint.y;\n    attributes.x2 = endPoint.x;\n    attributes.y2 = endPoint.y;\n\n    const lineElement = createGeneralElement('line', attributes, classArray);\n\n    parentSVGElement.append(lineElement);\n    return(lineElement);\n    \n}\n\nfunction drawPolygon(parentSVGElement, vertices, attributes, classArray) {\n    // Format expected by SVG polygon: x1,y1 x2,y2,...\n    const vertexString = vertices.map(vertex => `${vertex.x},${vertex.y}`).join(\" \");\n    attributes.points = vertexString;\n\n    const polygonElement = createGeneralElement('polygon', attributes, classArray);\n\n    parentSVGElement.append(polygonElement);\n    return(polygonElement);\n}\n\nfunction drawCircle(parentSVGElement, center, attributes, classArray) {\n    attributes.cx = center.x;\n    attributes.cy = center.y;\n\n    const circleElement = createGeneralElement('circle', attributes, classArray);\n\n    parentSVGElement.append(circleElement);\n    return(circleElement);\n}\n\nfunction createGroupElement(classArray) {\n    const groupElement = createGeneralElement('g', null, classArray);\n    return(groupElement);\n}\n\nfunction setCirclePosition(circleElement, position) {\n    setAttributes(circleElement, {cx: position.x, cy: position.y});\n}\n\n\n\n//# sourceURL=webpack://minigolf/./src/svg-utilities.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;