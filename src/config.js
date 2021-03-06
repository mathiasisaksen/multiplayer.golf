const gameConfig = {
    golfBallRadius: 1,
    relativeMaxSpeed: 60,
    frictionPerTime: 0.4,
    relativeSpeedThreshold: 1.6,
    maxDirectionLineLength: 20,
    framesPerSecond: 60,
    gravity: Infinity,
    directionLineStartColor: 'hsl(120, 100%, 50%)',
    directionLineEndColor: 'hsl(0, 100%, 50%)',
    interpolationsPerStep: 5,
    announcementDuration: 1,
    coverPriority: {wind: 1, bridge: 2, water: 3, sand: 4}
};

const svgConfig = {
    golfBallAttributes: {'fill': 'white', 'stroke-width': 5, 'stroke': 'black', 'stroke-opacity': '0'},
    
    directionLineAttributes: {'stroke': gameConfig.directionLineStartColor, 'stroke-width': 0.5, 'fill': 'none', 'stroke-linecap': 'round'},
    // The boundary is divided into two components.
    // This is done to ensure that the drawn course is 
    // equal to the internal representation
    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 2, 'fill': 'none'},
    boundaryAttributesInner: {'stroke-width': 0, 'fill': 'url(#grass-pattern)'},
    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},
    sandAttributes: {'stroke-width': 0},
    waterAttributes: {'stroke-width': 0},
    bridgeAttributes: {'stroke-width': 0},
    windAttributes: {'stroke-width': 0},
    holeAttributes: {'r': 2.6*gameConfig.golfBallRadius, 'fill': 'black', 'stroke': 'white', 'stroke-width': 0.1*gameConfig.golfBallRadius},
    // The amount of padding added to the viewbox, based on the AABB of the course
    extentPadding: 0.1,
    // When zooming with the scroll, by how much should each scroll zoom?
    zoomFactor: 0.9,
    // When zooming, the center of the viewbox is interpolated between the old
    // center and the position of the mouse. How much weight should be given to
    // the mouse position?
    centerMouseInterpolation: 0.1,
    scrollDelay: 0.02,
    circlePatternSize: 20
};
svgConfig.boundaryAttributesInner['stroke-width'] = 0;
svgConfig.obstacleAttributes['stroke-width'] = 0;
//svgConfig.boundaryAttributesOuter['stroke-width'] = 0;

const webSocketConfig = {
    host: 'ws.multiplayer.golf',
    //host: 'localhost',
    port: 5600,
};

const menuConfig = {
    transitionDuration: 0.5,
};

const playerConfig = {
    maxNameLength: 20
}

const sidebarConfig = {
    userNameSaturation: 50,
    userNameBrightness: 60,
}

export { gameConfig, svgConfig, webSocketConfig, menuConfig, sidebarConfig, playerConfig };