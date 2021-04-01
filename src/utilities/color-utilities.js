
function interpolateColors(hslColor1, hslColor2, weight) {
    const hsl1 = _parseHSLString(hslColor1);
    const hsl2 = _parseHSLString(hslColor2);

    const s = (1 - weight)*hsl1.s + weight*hsl2.s;
    const l = (1 - weight)*hsl1.l + weight*hsl2.l;

    let hueDiff = hsl2.h - hsl1.h;
    const hueDelta = Math.abs(hueDiff) > 180 ? (hueDiff < 0 ? 360 : -360) : 0;
    hueDiff += hueDelta;
    const h = hsl1.h + weight * hueDiff;
    
    let hslString = `hsl(${h}, ${s}%, ${l}%)`;
    return(hslString);
}

function _parseHSLString(hslString) {
    let hsl = hslString
        .slice(4)
        .slice(0, -1)
        .split(',')
        .map(elem => parseFloat(elem.trim().replace("%", "")));
    return({h: hsl[0], s: hsl[1], l: hsl[2]});
}

function generateRandomColor(hue, saturation, luminosity) {
    if (!hue) hue = 360*Math.random();
    if (!saturation) saturation = 100*Math.random();
    if (!luminosity) luminosity = 100*Math.random();
    return(`hsl(${hue}, ${saturation}%, ${luminosity}%)`);
}

function generateDistinctColor(index, saturation, luminosity) {
    let hue;
    if (index <= 2) {
        hue = 360 * (index - 1) / 2;
    } else {
        let exponent = Math.ceil(Math.log2(index));
        let numerator = 2*(index - 2**(exponent - 1)) - 1;
        hue = 360 * numerator / 2**exponent;
    }
    return(`hsl(${hue}, ${saturation}%, ${luminosity}%)`);
}

export { interpolateColors, generateRandomColor, generateDistinctColor };