import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';

const singleplayerMenu = Menu('singeplayer-menu');

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