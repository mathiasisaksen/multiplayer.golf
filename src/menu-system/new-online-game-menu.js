import Menu from './menu';
import MenuController from './menu-controller';
import onlineGameMenu from './online-game-menu';

const newOnlineGameMenu = Menu('new-online-game-menu');

newOnlineGameMenu.addButton('start-button', 'Start game')
    .addRestrictedEventListener('click', () => console.log('start'));

newOnlineGameMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(onlineGameMenu, false));

newOnlineGameMenu.setTitle('New online game', ['title-small']);

newOnlineGameMenu.createMenuElement();

export default newOnlineGameMenu;