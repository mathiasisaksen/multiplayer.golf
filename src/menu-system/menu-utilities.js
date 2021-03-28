function createMenuElement(id, titleElement, elementArray) {
    const menuElement = document.createElement('div');
    menuElement.setAttribute('id', id);
    menuElement.classList.add('menu');
    menuElement.appendChild(titleElement);

    const elementContainer = document.createElement('div');
    elementContainer.classList.add('menu-element-container');

    for (const element of elementArray) {
        elementContainer.appendChild(element);
    }
    menuElement.appendChild(elementContainer);
    
    return(menuElement);
}

function createTitleElement(titleInnerHTML, classArray = []) {
    const titleElement = document.createElement('div');
    titleElement.innerHTML = titleInnerHTML;
    titleElement.setAttribute('id', 'menu-title');
    classArray.push('not-selectable');
    classArray.forEach(className => titleElement.classList.add(className));
    return(titleElement);
}

function createButton(id, text, classArray = []) {
    const buttonElement = document.createElement('div');
    buttonElement.setAttribute('id', id);
    buttonElement.textContent = text;
    classArray = classArray.concat(['menu-button', 'not-selectable']);
    classArray.forEach(className => buttonElement.classList.add(className));
    return(buttonElement);
}



export { createMenuElement, createTitleElement, createButton };