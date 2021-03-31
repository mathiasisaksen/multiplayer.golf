
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

export { interpolateColors };