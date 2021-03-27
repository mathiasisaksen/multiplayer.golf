
function createButton(id, text, classArray = ['menu-button', 'not-selectable']) {
    const buttonElement = document.createElement('div');
    buttonElement.setAttribute('id', id);
    buttonElement.textContent = text;
    classArray.forEach(className => buttonElement.classList.add(className));
    return(buttonElement);
}

export { createButton };