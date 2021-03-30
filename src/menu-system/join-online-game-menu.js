import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const joinOnlineGameMenu = Menu('join-online-game-menu');

const startButton = joinOnlineGameMenu.addButton('start-button', 'Start game');
joinOnlineGameMenu.addRestrictedEventListener(startButton,
     'click', () => console.log('start'));

const backButton = joinOnlineGameMenu.addButton('back-button', 'Go back');
joinOnlineGameMenu.addRestrictedEventListener(backButton,
     'click', () => MenuController.setMenu(onlineGameMenu, false));

joinOnlineGameMenu.setTitle('Join online game', ['title-small']);

joinOnlineGameMenu.createMenuElement();

export default joinOnlineGameMenu;