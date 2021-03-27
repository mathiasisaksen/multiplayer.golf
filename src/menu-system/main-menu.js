import MenuController from './menu-controller';
import * as menuUtils from './menu-utilities';
import singleplayerMenu from './singleplayer-menu';
import multiplayerMenu from './multiplayer-menu';
import onlineGameMenu from './online-game-menu';

const mainMenu = (() => {
    const singlePlayerButton = menuUtils.createButton('singleplayer-button', 'Single-player');
    const multiPlayerButton = menuUtils.createButton('multiplayer-button', 'Local multi-player');
    const onlineGameButton = menuUtils.createButton('online-button', 'Online game');
    const buttons = [singlePlayerButton, multiPlayerButton, onlineGameButton];
    const titleInnerHTML = 'Minig<span id="title-hole">◘</span>lf';
    const titleElement = menuUtils.createTitleElement(titleInnerHTML);
    const menuElement = menuUtils.createMenuElement(titleElement, buttons);
    let isActive = true;

    singlePlayerButton.addEventListener('click', () => {
        if (!isActive) return;
        MenuController.setMenu(singleplayerMenu, true);
    });

    multiPlayerButton.addEventListener('click', () => {
        if (!isActive) return;
        MenuController.setMenu(multiplayerMenu, true);
    });

    onlineGameButton.addEventListener('click', () => {
        if (!isActive) return;
        MenuController.setMenu(onlineGameMenu, true);
    });

    function setActive() {
        isActive = true;
    }

    function setNotActive() {
        isActive = false;
    }

    return({ buttons, menuElement, setActive, setNotActive });
})();

export default mainMenu;