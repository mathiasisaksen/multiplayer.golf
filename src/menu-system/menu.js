import * as menuUtils from './menu-utilities';

function Menu(id) {
    const elements = [];
    let titleElement;
    let menuElement;
    let isActive = true;

    function addButton(id, text, classArray = []) {
        const newButton = menuUtils.createButton(id, text, classArray);
        newButton.addRestrictedEventListener = function(eventName, callback) {
            function restrictedHandler(event) {
                if (!isActive) return;
                callback(event);    
            }
            newButton.addEventListener(eventName, restrictedHandler);
        }
        elements.push(newButton);
        return(newButton);
    }

    function addCustomElement(element) {
        elements.pussh(newButton);
    }

    function setTitle(titleInnerHTML, classArray = []) {
        titleElement = menuUtils.createTitleElement(titleInnerHTML, classArray);
    }

    function createMenuElement() {
        menuElement = menuUtils.createMenuElement(id, titleElement, elements);
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
         setNotActive, addCustomElement })
}

export default Menu;