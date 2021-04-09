import { playerConfig } from '../config';
import OnlineGameHandler from '../online-game-handler/online-game-handler';
import { checkValidId } from '../utilities/online-utilities';
import dialogBox from './dialog-box';
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
    <div id="create-game-id-label" class="option-label">Game ID</div>
    <textarea id="create-game-id-input" rows="1" placeholder="optional"></textarea>
</div>`;
newOnlineGameMenu.addCustomElement(gameIdContainer);
const gameIdInput = gameIdContainer.querySelector('#create-game-id-input');

const numCoursesContainer = document.createElement('div');
numCoursesContainer.innerHTML = `
<div id="create-number-courses" class="menu-inner-option-container menu-text-option">
    <div id="create-number-courses-label" class="option-label">Number of holes</div>
    <textarea id="create-number-courses-input" rows="1" placeholder="must be ≥ 1"></textarea>
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

    if (!playerName) {
        dialogBox('Please enter a name', 
            [{text: 'Ok'}]);
    } else if (playerName.length > playerConfig.maxNameLength) {
        dialogBox('The name entered is too long', 
        [{text: 'Ok'}]);
    } else if (!numCourses || numCourses < 1) {
        dialogBox('The number of holes must be a number greater than 0', 
        [{text: 'Ok'}]);
    } else if (gameId && !checkValidId(gameId)) {
        dialogBox('The game ID can only consist of letters, numbers and hyphens (-)', 
        [{text: 'Ok'}]);
    } else {
        OnlineGameHandler.setPlayerName(playerName);
        const wsClient = OnlineGameHandler.createWSClient();
        wsClient.addEventListener('open', () => 
            sendCreateGameMessage(playerName, gameId, numCourses));
    }
}

function sendCreateGameMessage(playerName, gameId, numCourses) {
    const message = {};
    message.eventName = 'newOnlineGame';
    message.data = {
        playerName,
        gameId,
        isGameIdSpecified: Boolean(gameId),
        numberOfCourses: numCourses
    };
    OnlineGameHandler.sendMessage(JSON.stringify(message));
}



export default newOnlineGameMenu;