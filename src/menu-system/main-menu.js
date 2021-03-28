import Menu from './menu';
import MenuController from './menu-controller';
import singleplayerMenu from './singleplayer-menu';
import multiplayerMenu from './multiplayer-menu';
import onlineGameMenu from './online-game-menu';

const mainMenu = Menu('main-menu');

mainMenu.addButton('singleplayer-button', 'Single-player')
    .addRestrictedEventListener('click', () => MenuController.setMenu(singleplayerMenu, true));

mainMenu.addButton('multiplayer-button', 'Local multi-player')
    .addRestrictedEventListener('click', () => MenuController.setMenu(multiplayerMenu, true));

mainMenu.addButton('online-button', 'Online game')
    .addRestrictedEventListener('click', () => MenuController.setMenu(onlineGameMenu, true));

const holeSVG = `<svg id="title-hole" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 260 260" xml:space="preserve">
<path d="M0.5,0.5v259h259V0.5H0.5z M130.5,234.5C72.2,234.5,25,187.3,25,129S72.2,23.5,130.5,23.5
	S236,70.7,236,129S188.8,234.5,130.5,234.5z"/>
</svg>`

mainMenu.setTitle(`Minig${holeSVG}lf`);

mainMenu.createMenuElement();

export default mainMenu;