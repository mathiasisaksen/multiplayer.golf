
function checkValidId(name) {
    const nameArray = [...name.toLowerCase()];
    const isValid = nameArray.every(char => {
        const c = char.charCodeAt(0);
        return((c >= 97 && c <= 122) || (c >= 48 && c <= 57) || c === 45);
    });
    return(isValid);
}

export { checkValidId };