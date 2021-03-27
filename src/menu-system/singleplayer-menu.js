import MenuController from './menu-controller';
import * as menuUtils from './menu-utilities';
import mainMenu from './main-menu';

const singleplayerMenu = (() => {
    const startButton = menuUtils.createButton('start-button', 'Start game');
    const backButton = menuUtils.createButton('back-button', 'Go back');
    const buttons = [startButton, backButton];
    const titleInnerHTML = 'Single-player game';
    const titleElement = menuUtils.createTitleElement(titleInnerHTML, ['title-small']);
    const menuElement = menuUtils.createMenuElement(titleElement, buttons);
    let isActive = true;

    startButton.addEventListener('click', () => {
        if (!isActive) return;
        console.log('start');
    });
    backButton.addEventListener('click', () => {
        if (!isActive) return;
        MenuController.setMenu(mainMenu, false);
    });

    function setActive() {
        isActive = true;
    }
        
    function setNotActive() {
        isActive = false;
    }

        return({ buttons, menuElement, setActive, setNotActive });
})();

export default singleplayerMenu;