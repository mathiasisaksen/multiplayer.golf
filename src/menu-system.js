const emptyMenu = (() => {
    const menuContainer = document.querySelector('#menu-button-container');

    function emptyMenu() {
        menuContainer.innerHTML = '';
    }
    return(emptyMenu);
})()



const StartMenu = (() => {
    const singlePlayerButton = document.querySelector('#singleplayer-button');
    const multiPlayerButton = document.querySelector('#multiplayer-button');
    const onlineGameButton = document.querySelector('#online-button');
    singlePlayerButton.addEventListener('click', () => document.querySelector("#game-container").classList.toggle('hidden'));
    multiPlayerButton.addEventListener('click', () => console.log('multiplayer'));
    onlineGameButton.addEventListener('click', () => OnlineGameMenu.setupMenu());

})();

const OnlineGameMenu = (() => {
    const title = document.querySelector('#menu-title');
    function setupMenu() {
        emptyMenu();
        title.textContent = 'Online game';
    }
    return({ setupMenu })
})();

export { StartMenu };