import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';
import newOnlineGameMenu from './new-online-game-menu';
import joinOnlineGameMenu from './join-online-game-menu';

const onlineGameMenu = Menu('online-game-menu');

const newGameButton = onlineGameMenu.addButton('new-game-button', 'Create new game');
onlineGameMenu.addRestrictedEventListener(newGameButton,
    'click', () => MenuController.setMenu(newOnlineGameMenu));

const joinGameButton = onlineGameMenu.addButton('join-game-button', 'Join game');
onlineGameMenu.addRestrictedEventListener(joinGameButton,
    'click', () => MenuController.setMenu(joinOnlineGameMenu));

const backButton = onlineGameMenu.addButton('back-button', 'Go back');
onlineGameMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(mainMenu, false));

onlineGameMenu.setTitle('Online game', ['title-small']);

onlineGameMenu.createMenuElement();

export default onlineGameMenu;