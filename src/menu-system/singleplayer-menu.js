import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';
import Sidebar from '../sidebar/sidebar';
import SingleplayerGame from '../game-resources/singleplayer-game';
import rootSVGElement from '../svg-setup';
import dialogBox from './dialog-box';

const singleplayerMenu = Menu('singeplayer-menu');

//<div id="singleplayer-numcourse-container" class="menu-option-container">
const numberOfCoursesContainer = document.createElement('div');
numberOfCoursesContainer.innerHTML = `
<div id="singleplayer-numcourse-container" class="menu-option-container">
    <div id="singleplayer-numcourse-input-container" class="menu-inner-option-container menu-text-option">
        <div id="singleplayer-numcourse-label" class="option-label">Number of courses</div>
        <textarea id="singleplayer-numcourses-input" rows="1" placeholder="number > 0"></textarea>
    </div>
</div>
`
singleplayerMenu.addCustomElement(numberOfCoursesContainer);

const numberOfCoursesElement = numberOfCoursesContainer.querySelector('#singleplayer-numcourses-input');

const startButton = singleplayerMenu.addButton('start-button', 'Start game');
singleplayerMenu.addRestrictedEventListener(startButton,
     'click', handleNewGame);

function handleNewGame() {
    const numCourses = parseInt(numberOfCoursesElement.value);
    if (!numCourses) {
        dialogBox('The number of courses must be a number greater than 0', [{text: 'Ok'}]);
        return;
    }
    let game = new SingleplayerGame(rootSVGElement);
    game.generateNewCourse();
    MenuController.hide();
    game.show();
    Sidebar.show();
    Sidebar.singleplayerSetup();
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
}

const backButton = singleplayerMenu.addButton('back-button', 'Go back');
singleplayerMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(mainMenu, false));

singleplayerMenu.setTitle('Single-player game', ['title-small']);

singleplayerMenu.createMenuElement();

const menuElement = singleplayerMenu.getMenuElement();
menuElement.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleNewGame();
    singleplayerMenu.clearInput();
});

export default singleplayerMenu;