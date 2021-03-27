import MenuController from './menu-controller'
import * as menuUtils from './menu-utilities';
/*import SingleplayerMenu from './singleplayer-menu';
import MultiplayerMenu from './multiplayer-menu';
import OnlineGameMenu from './online-game-menu';*/

const mainMenu = (() => {
    const singlePlayerButton = menuUtils.createButton('singleplayer-button', 'Single-player');
    const multiPlayerButton = menuUtils.createButton('multiplayer-button', 'Local multi-player');
    const onlineGameButton = menuUtils.createButton('online-button', 'Online game');
    const buttons = [singlePlayerButton, multiPlayerButton, onlineGameButton];
    const titleInnerHTML = 'Minig<span id="title-hole">◘</span>lf<span id="title-flag">⛳️</span>';

    singlePlayerButton.addEventListener('click', () => document.querySelector("#game-container").classList.toggle('hidden'));
    multiPlayerButton.addEventListener('click', () => console.log('multiplayer'));
    onlineGameButton.addEventListener('click', () => console.log('online game'));
    return({buttons, titleInnerHTML});
})();

export default mainMenu;