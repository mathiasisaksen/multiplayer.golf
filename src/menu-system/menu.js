import * as menuUtils from './menu-utilities';

function Menu(id) {
    const elements = [];
    let titleElement;
    let menuElement;
    let isActive = false;

    function addButton(id, text, classArray = []) {
        const newButton = menuUtils.createButton(id, text, classArray);
        elements.push(newButton);
        return(newButton);
    }

    function addCustomElement(element) {
        elements.push(element);
    }

    function setTitle(titleInnerHTML, classArray = []) {
        titleElement = menuUtils.createTitleElement(titleInnerHTML, classArray);
    }

    function createMenuElement() {
        menuElement = menuUtils.createMenuElement(id, titleElement, elements);
    }

    function addRestrictedEventListener(element, eventName, callback) {
        function restrictedHandler(event) {
            if (!isActive) return;
            callback(event);    
        }
        element.addEventListener(eventName, restrictedHandler);
    }


    function getMenuElement() {
        return(menuElement);
    }

    function setActive() {
        isActive = true;
    }
       
    function setNotActive() {
        isActive = false;
    }
    return({ addButton, setTitle, createMenuElement, getMenuElement, setActive,
         setNotActive, addCustomElement, addRestrictedEventListener })
}

export default Menu;