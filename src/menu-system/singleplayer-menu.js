import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';

const singleplayerMenu = Menu('singeplayer-menu');

//<div id="singleplayer-numcourse-container" class="menu-option-container">
const numberOfCoursesContainer = document.createElement('div');
numberOfCoursesContainer.innerHTML = `
<div id="singleplayer-numcourse-container" class="menu-option-container">
    <div class='menu-options-header'>Number of courses</div>
    <div id="singleplayer-numcourse-input-container" class="menu-inner-option-container">
        <textarea rows="1" id="singleplayer-numcourses-input"></textarea>
        <div id="singleplayer-numcourses-increase" class="menu-button">+</div>
        <div id="singleplayer-numcourses-decrease" class="menu-button">-</div>
        <div id="singleplayer-numcourses-infinite" class="menu-button">∞</div>
    </div>
</div>
`
singleplayerMenu.addCustomElement(numberOfCoursesContainer);

singleplayerMenu.addButton('start-button', 'Start game')
    .addRestrictedEventListener('click', () => {
        const gameElement = document.querySelector('#game-container');
        gameElement.classList.remove('hidden');
        MenuController.removeMenu();
    });

singleplayerMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(mainMenu, false));

singleplayerMenu.setTitle('Single-player game', ['title-small']);

singleplayerMenu.createMenuElement();

export default singleplayerMenu;