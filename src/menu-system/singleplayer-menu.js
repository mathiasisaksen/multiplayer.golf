import * as menuUtils from './menu-utilities';

const SingleplayerMenu = (() => {
    const backButton = menuUtils.createButton('back-button');
    const buttons = {};
    const titleInnerHTML = 'Singleplayer';

    singlePlayerButton.addEventListener('click', () => document.querySelector("#game-container").classList.toggle('hidden'));
    multiPlayerButton.addEventListener('click', () => console.log('multiplayer'));
    onlineGameButton.addEventListener('click', () => OnlineGameMenu.setupMenu());
    return({buttons, titleInnerHTML});
})();

export default SingleplayerMenu;