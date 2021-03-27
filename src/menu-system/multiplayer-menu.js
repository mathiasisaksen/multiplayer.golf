import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';

const multiplayerMenu = Menu();

multiplayerMenu.addButton('start-button', 'Start game')
    .addRestrictedEventListener('click', () => console.log('start'));

multiplayerMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(mainMenu, false));

multiplayerMenu.setTitle('Multi-player game', ['title-small']);

multiplayerMenu.createMenuElement();

export default multiplayerMenu;