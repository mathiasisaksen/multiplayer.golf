import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const joinOnlineGameMenu = Menu('join-online-game-menu');

joinOnlineGameMenu.addButton('start-button', 'Start game')
    .addRestrictedEventListener('click', () => console.log('start'));

joinOnlineGameMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(onlineGameMenu, false));

joinOnlineGameMenu.setTitle('Join online game', ['title-small']);

joinOnlineGameMenu.createMenuElement();

export default joinOnlineGameMenu;