import Menu from './menu';
import MenuController from './menu-controller';
import mainMenu from './main-menu';

const onlineGameMenu = Menu('online-game-menu');

onlineGameMenu.addButton('start-button', 'Start game')
    .addRestrictedEventListener('click', () => console.log('start'));

onlineGameMenu.addButton('back-button', 'Go back')
    .addRestrictedEventListener('click', () => MenuController.setMenu(mainMenu, false));

onlineGameMenu.setTitle('Online game', ['title-small']);

onlineGameMenu.createMenuElement();

export default onlineGameMenu;