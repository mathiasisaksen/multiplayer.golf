import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const newOnlineGameMenu = Menu('new-online-game-menu');

const playerNameContainer = document.createElement('div');
playerNameContainer.innerHTML = `
<div id="create-player-name" class="menu-inner-option-container menu-text-option">
    <div id="create-player-name-label" class="option-label">Your name</div>
    <textarea id="create-player-name-input" rows="1" placeholder="max 20 characters"></textarea>
</div>`;
newOnlineGameMenu.addCustomElement(playerNameContainer);
const nameInput = playerNameContainer.querySelector('#create-player-name-input');

const gameIdContainer = document.createElement('div');
gameIdContainer.innerHTML = `
<div id="create-game-id" class="menu-inner-option-container menu-text-option">
    <div id="create-game-id-label" class="option-label">Game ID (optional)</div>
    <textarea id="create-game-id-input" rows="1"></textarea>
</div>`;
newOnlineGameMenu.addCustomElement(gameIdContainer);
const gameIdInput = gameIdContainer.querySelector('#create-game-id-input');

const numCoursesContainer = document.createElement('div');
numCoursesContainer.innerHTML = `
<div id="create-number-courses" class="menu-inner-option-container menu-text-option">
    <div id="create-number-courses-label" class="option-label">Number of holes</div>
    <textarea id="create-number-courses-input" rows="1"></textarea>
</div>`;
newOnlineGameMenu.addCustomElement(numCoursesContainer);
const numCoursesInput = numCoursesContainer.querySelector('#create-number-courses-input');

const createButton = newOnlineGameMenu.addButton('create-button', 'Create game');
newOnlineGameMenu.addRestrictedEventListener(createButton,
    'click', handleCreateGame);

const backButton = newOnlineGameMenu.addButton('back-button', 'Go back');
newOnlineGameMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(onlineGameMenu, false));

newOnlineGameMenu.setTitle('New online game', ['title-small']);

newOnlineGameMenu.createMenuElement();

function handleCreateGame() {
    const playerName = nameInput.value;
    const gameId = gameIdInput.value;
    const numCourses = numCoursesInput.value;
    
}


export default newOnlineGameMenu;