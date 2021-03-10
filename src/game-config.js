const gameConfig = {
    golfBallRadius: 2,
    speedThreshold: 0.001
};

const svgConfig = {
    golfBallAttributes: {'r': gameConfig.golfBallRadius, 'fill': 'black'},
    // The boundary is divided into two components.
    // The outer draws the boundary, while the inner ensures that the inner area is white
    // for the golf ball
    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 6, 'fill': 'none'},
    boundaryAttributesInner: {'stroke': 'white', 'fill': 'white'},
    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},
};
svgConfig.boundaryAttributesInner['stroke-width'] = 0;
svgConfig.obstacleAttributes['stroke-width'] = 0;

export { gameConfig, svgConfig };