const gameConfig = {
    golfBallRadius: 2,
    maxSpeed: 40,
    frictionPerTime: 0.5,
    speedThreshold: 0.5,
    maxDirectionLineLength: 20,
    framesPerSecond: 60,

    directionLineStartColor: 'hsl(120, 100%, 50%)',
    directionLineEndColor: 'hsl(0, 100%, 50%)',

    interpolationsPerStep: 5,
};

const svgConfig = {
    golfBallAttributes: {'r': gameConfig.golfBallRadius, 'fill': 'white', 'stroke-width': 5, 'stroke': 'black', 'stroke-opacity': '0'},
    // The boundary is divided into two components.
    // The outer draws the boundary, while the inner ensures that the inner area is white
    // for the golf ball
    directionLineAttributes: {'stroke': gameConfig.directionLineStartColor, 'stroke-width': 1, 'fill': 'none', 'stroke-linecap': 'round'},
    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 4, 'fill': 'none'},
    boundaryAttributesInner: {'stroke': 'white', 'fill': '#3ab93a'},
    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},
    holeAttributes: {'r': 1.25*gameConfig.golfBallRadius, 'fill': 'black'},
};
svgConfig.boundaryAttributesInner['stroke-width'] = 0;
svgConfig.obstacleAttributes['stroke-width'] = 0;

export { gameConfig, svgConfig };