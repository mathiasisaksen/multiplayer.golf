import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const newOnlineGameMenu = Menu('new-online-game-menu');

const startButton = newOnlineGameMenu.addButton('start-button', 'Start game');
newOnlineGameMenu.addRestrictedEventListener(startButton,
    'click', () => console.log('start'));

const backButton = newOnlineGameMenu.addButton('back-button', 'Go back');
newOnlineGameMenu.addRestrictedEventListener(backButton,
    'click', () => MenuController.setMenu(onlineGameMenu, false));

newOnlineGameMenu.setTitle('New online game', ['title-small']);

newOnlineGameMenu.createMenuElement();

export default newOnlineGameMenu;