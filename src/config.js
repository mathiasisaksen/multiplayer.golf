const gameConfig = {
    golfBallRadius: 0.8,
    maxSpeed: 40,
    frictionPerTime: 0.5,
    speedThreshold: 0.5,
    maxDirectionLineLength: 20,
    framesPerSecond: 60,
    gravity: Infinity,

    directionLineStartColor: 'hsl(120, 100%, 50%)',
    directionLineEndColor: 'hsl(0, 100%, 50%)',

    interpolationsPerStep: 5,
};

const svgConfig = {
    golfBallAttributes: {'r': gameConfig.golfBallRadius, 'fill': 'white', 'stroke-width': 5, 'stroke': 'black', 'stroke-opacity': '0'},
    // The boundary is divided into two components.
    // This is done to ensure that the drawn course is 
    // equal to the internal representation
    directionLineAttributes: {'stroke': gameConfig.directionLineStartColor, 'stroke-width': 0.5, 'fill': 'none', 'stroke-linecap': 'round'},
    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 2, 'fill': 'none'},
    boundaryAttributesInner: {'stroke': 'white', 'fill': '#3ab93a'},
    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},
    holeAttributes: {'r': 1.25*gameConfig.golfBallRadius, 'fill': 'black'},
    // The amount of padding added to the viewbox, based on the AABB of the course
    extentPadding: 0.1,
    // When zooming with the scroll, by how much should each scroll zoom?
    zoomFactor: 0.9,
    // When zooming, the center of the viewbox is interpolated between the old
    // center and the position of the mouse. How much weight should be given to
    // the mouse position?
    centerMouseInterpolation: 0.1,
    scrollDelay: 0.02,
};
svgConfig.boundaryAttributesInner['stroke-width'] = 0;
svgConfig.obstacleAttributes['stroke-width'] = 0;
//svgConfig.boundaryAttributesOuter['stroke-width'] = 0;

const webSocketConfig = {
    host: 'localhost',
    port: 5678,
};

const menuConfig = {
    transitionDuration: 0.5,
};

const messageBoxConfig = {
    userNameSaturation: 50,
    userNameBrightness: 50,
}

export { gameConfig, svgConfig, webSocketConfig, menuConfig, messageBoxConfig };