
const svgConfig = {
    golfBallAttributes: {'r': 2, 'fill': 'black'},
    // The boundary is divided into two components.
    // The outer draws the boundary, while the inner ensures that the polygon shown has "padding"
    // for the golf ball
    boundaryAttributesOuter: {'stroke': 'black', 'stroke-width': 6, 'fill': 'none'},
    boundaryAttributesInner: {'stroke': 'white', 'fill': 'white'},
    obstacleAttributes: {'stroke': 'white', 'fill': 'black'},
}
svgConfig.boundaryAttributesInner['stroke-width'] = 2*svgConfig.golfBallAttributes.r;
svgConfig.obstacleAttributes['stroke-width'] = 2*svgConfig.golfBallAttributes.r;
//svgConfig.obstacleAttributes['stroke-width'] = 0;

export { svgConfig };