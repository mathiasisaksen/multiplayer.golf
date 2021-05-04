import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';
import dialogBox from './dialog-box';
import { generateDistinctColor } from '../utilities/color-utilities';
import { sidebarConfig } from '../config';
import MultiplayerGame from '../game-resources/multiplayer-game';
import rootSVGElement from '../svg-setup';
import Sidebar from '../sidebar/sidebar';
import showAnnouncement from '../sidebar/show-announcement';

const multiplayerMenu = Menu('multiplayer-menu');

let players = [];

const numberOfCoursesContainer = document.createElement('div');
numberOfCoursesContainer.innerHTML = `<div>
<div id="multiplayer-numcourse-container" class="menu-option-container">
      <div id="multiplayer-numcourse-input-container" class="menu-inner-option-container menu-text-option">
          <div id="multiplayer-numcourse-label" class="option-label">Number of holes</div>
          <textarea id="multiplayer-numcourses-input" rows="1" placeholder="number > 0"></textarea>
      </div>
</div>`;

multiplayerMenu.addCustomElement(numberOfCoursesContainer);

const numberOfCoursesInput = numberOfCoursesContainer.querySelector('#multiplayer-numcourses-input');

const playerContainer = document.createElement('div');
playerContainer.innerHTML = `<div id="multiplayer-player-container" class="menu-option-container">
<div id="multiplayer-player-input-container" class="menu-inner-option-container menu-text-option">
  <div id="multiplayer-addplayer-button" class="option-button">Add player</div>
  <textarea id="multiplayer-addplayer-input" rows="1" placeholder="player name"></textarea>
</div>
<div id="multiplayer-player-list" class="disable-scrollbar">
</div>
</div>`

multiplayerMenu.addCustomElement(playerContainer);

const addPlayerButton = playerContainer.querySelector('#multiplayer-addplayer-button');
addPlayerButton.addEventListener('click', handleAddPlayer);

const playerInput = playerContainer.querySelector('#multiplayer-addplayer-input');
const playerListElement = playerContainer.querySelector('#multiplayer-player-list');

function handleAddPlayer() {
    const playerName = playerInput.value.trim();
    if (playerName === '') {
        dialogBox('The player name can not be empty', [{text: 'Ok'}]);
        return;
    } else if (players.some(name => name === playerName)) {
        dialogBox('The name has already been added', [{text: 'Ok'}]);
        return;
    }
    players.push(playerName);
    const playerColor = generateDistinctColor(players.length, 
        sidebarConfig.userNameSaturation, 
        sidebarConfig.userNameBrightness);
    
    const playerElement = document.createElement('div');
    playerElement.textContent = playerName;
    playerElement.classList.add('player-list-element');
    playerElement.style.backgroundColor = playerColor;
    playerListElement.appendChild(playerElement);

    playerInput.value = '';
    playerInput.focus();
}

const startButton = multiplayerMenu.addButton('start-button', 'Start game');

multiplayerMenu.addRestrictedEventListener(startButton,
    'click', handleStartGame);

function handleStartGame() {
    const numCourses = parseInt(numberOfCoursesInput.value);
    if (!numCourses) {
        dialogBox('The number of holes must be a number greater than 0', [{text: 'Ok'}]);
        return;
    } else if (players.length === 0) {
        dialogBox('At least one player must be added', [{text: 'Ok'}]);
        return;
    }

    let game = new MultiplayerGame(rootSVGElement);
    game.setPlayerList(players);
    game.generateNewCourse();
    game.setNumberOfCourses(numCourses);
    MenuController.hide();
    game.show();

    Sidebar.show();
    Sidebar.singleOrMultiplayerSetup();
    Sidebar.setCurrentCourse(1);
    Sidebar.setNumberOfCourses(numCourses);
    Sidebar.setExitCallback(() => {
        MenuController.show();
        game.hide();
        game.destroy();
        Sidebar.reset();
        Sidebar.hide();
        game = null;
    });
    setTimeout(() => showAnnouncement(`First player: ${game.getCurrentPlayer()}!`, () => {}), 0);
}
const backButton = multiplayerMenu.addButton('back-button', 'Go back');
multiplayerMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(mainMenu, false));

multiplayerMenu.setTitle('Multi-player game', ['title-small']);

multiplayerMenu.createMenuElement();

const menuElement = multiplayerMenu.getMenuElement();
menuElement.addEventListener('keydown', e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    
    if (e.target === playerInput) {
        handleAddPlayer();
    } else {
        handleStartGame();
    }
})

export default multiplayerMenu;