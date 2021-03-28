import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';
import newOnlineGameMenu from './new-online-game-menu';
import joinOnlineGameMenu from './join-online-game-menu copy';

const onlineGameMenu = Menu('online-game-menu');

onlineGameMenu.addButton('new-game-button', 'Create new game')
    .addRestrictedEventListener('click', () => MenuController.setMenu(newOnlineGameMenu));

onlineGameMenu.addButton('join-game-button', 'Join game')
    .addRestrictedEventListener('click', () => MenuController.setMenu(joinOnlineGameMenu));

onlineGameMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(mainMenu, false));

onlineGameMenu.setTitle('Online game', ['title-small']);

onlineGameMenu.createMenuElement();

export default onlineGameMenu;