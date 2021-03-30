import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';

const multiplayerMenu = Menu('multiplayer-menu');

const startButton = multiplayerMenu.addButton('start-button', 'Start game');
multiplayerMenu.addRestrictedEventListener(startButton,
    'click', () => console.log('start'));

const backButton = multiplayerMenu.addButton('back-button', 'Go back');
multiplayerMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(mainMenu, false));

multiplayerMenu.setTitle('Multi-player game', ['title-small']);

multiplayerMenu.createMenuElement();

export default multiplayerMenu;