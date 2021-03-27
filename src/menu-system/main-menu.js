import Menu from './menu';
import MenuController from './menu-controller';
import singleplayerMenu from './singleplayer-menu';
import multiplayerMenu from './multiplayer-menu';
import onlineGameMenu from './online-game-menu';

const mainMenu = Menu();

mainMenu.addButton('singleplayer-button', 'Single-player')
    .addRestrictedEventListener('click', () => MenuController.setMenu(singleplayerMenu, true));

mainMenu.addButton('multiplayer-button', 'Local multi-player')
    .addRestrictedEventListener('click', () => MenuController.setMenu(multiplayerMenu, true));

mainMenu.addButton('online-button', 'Online game')
    .addRestrictedEventListener('click', () => MenuController.setMenu(onlineGameMenu, true));

mainMenu.setTitle('Minig<span id="title-hole">◘</span>lf');

mainMenu.createMenuElement();

export default mainMenu;