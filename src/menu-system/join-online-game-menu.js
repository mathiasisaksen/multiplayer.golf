import { playerConfig } from '../config';
import OnlineGameHandler from '../online-game-handler/online-game-handler';
import { checkValidId } from '../utilities/online-utilities';
import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const joinOnlineGameMenu = Menu('join-online-game-menu');

const playerNameContainer = document.createElement('div');
playerNameContainer.innerHTML = `
<div id="create-player-name" class="menu-inner-option-container menu-text-option">
    <div id="create-player-name-label" class="option-label">Your name</div>
    <textarea id="create-player-name-input" rows="1" placeholder="max 20 characters"></textarea>
</div>`;
joinOnlineGameMenu.addCustomElement(playerNameContainer);
const nameInput = playerNameContainer.querySelector('#create-player-name-input');

const gameIdContainer = document.createElement('div');
gameIdContainer.innerHTML = `
<div id="create-game-id" class="menu-inner-option-container menu-text-option">
    <div id="create-game-id-label" class="option-label">Game ID</div>
    <textarea id="create-game-id-input" rows="1"></textarea>
</div>`;
joinOnlineGameMenu.addCustomElement(gameIdContainer);
const gameIdInput = gameIdContainer.querySelector('#create-game-id-input');

const joinButton = joinOnlineGameMenu.addButton('join-button', 'Join game');
joinOnlineGameMenu.addRestrictedEventListener(joinButton,
     'click', handleJoinGame);

const backButton = joinOnlineGameMenu.addButton('back-button', 'Go back');
joinOnlineGameMenu.addRestrictedEventListener(backButton,
     'click', () => MenuController.setMenu(onlineGameMenu, false));

joinOnlineGameMenu.setTitle('Join online game', ['title-small']);

joinOnlineGameMenu.createMenuElement();

function handleJoinGame() {
    const playerName = nameInput.value;
    const gameId = gameIdInput.value;
 
    if (!playerName) {
        dialogBox('Please enter a name', 
            [{text: 'Ok'}]);
    } else if (playerName.length > playerConfig.maxNameLength) {
        dialogBox('The name entered is too long', 
        [{text: 'Ok'}]);
    } else if (gameId && !checkValidId(gameId)) {
        dialogBox('The game ID can only consist of letters, numbers and hyphens (-)', 
        [{text: 'Ok'}]);
    } else {
        OnlineGameHandler.setPlayerName(playerName);
        const wsClient = OnlineGameHandler.createWSClient();
        wsClient.addEventListener('open', () => 
            sendJoinGameMessage(playerName, gameId));
    }
}
 
function sendJoinGameMessage(playerName, gameId) {
    const message = {};
    message.eventName = 'joinRequest';
    message.data = {
        playerName,
        gameId
    };
    OnlineGameHandler.sendMessage(JSON.stringify(message));
}
 
export default joinOnlineGameMenu;