import Menu from './menu';
import MenuController from './menu-controller';
import singleplayerMenu from './singleplayer-menu';
import multiplayerMenu from './multiplayer-menu';
import onlineGameMenu from './online-game-menu';

const mainMenu = Menu('main-menu');

const singleplayerButton = mainMenu.addButton('singleplayer-button', 'Single-player');
mainMenu.addRestrictedEventListener(singleplayerButton, 
    'click', () => MenuController.setMenu(singleplayerMenu, true));

const multiplayerButton = mainMenu.addButton('multiplayer-button', 'Local multi-player');
mainMenu.addRestrictedEventListener(multiplayerButton,
    'click', () => MenuController.setMenu(multiplayerMenu, true));

const onlineButton = mainMenu.addButton('online-button', 'Online game');
mainMenu.addRestrictedEventListener(onlineButton,
    'click', () => MenuController.setMenu(onlineGameMenu, true));

const holeSVG = `<svg id="title-hole" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 260 260" xml:space="preserve">
<path d="M0.5,0.5v259h259V0.5H0.5z M130.5,234.5C72.2,234.5,25,187.3,25,129S72.2,23.5,130.5,23.5
	S236,70.7,236,129S188.8,234.5,130.5,234.5z"/>
</svg>`

mainMenu.setTitle(`Minig${holeSVG}lf`);

const aboutButton = document.createElement('div');
aboutButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="menu-about-button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 254 254">
<path d="M127,0.5C57.1,0.5,0.5,57.1,0.5,127S57.1,253.5,127,253.5S253.5,196.9,253.5,127
S196.9,0.5,127,0.5z M146.5,227h-36v-36h36V227z M189,112.6c-4.5,7.1-14.1,16.8-28.8,29c-7.6,6.3-12.3,11.7-14.2,15.5
c-1.8,3.8-2.7,11.9-2.5,20.9h-32.7c-0.1-4-0.1-7.8-0.1-8.9c0-10.6,1.8-19.5,5.3-26.3c3.5-6.8,10.5-14.6,21-23.2
c10.5-8.6,16.8-14.2,18.9-16.8c3.2-4.2,4.7-8.8,4.7-13.9c0-7-2.8-13-8.4-18c-5.6-5-13.2-7.5-22.7-7.5c-9.2,0-16.8,2.6-23,7.8
c-6.2,5.2-10.4,13.2-12.7,23.9L60.7,91c0.9-15.3,7.5-28.3,19.6-39c12.1-10.7,28-16,47.7-16c20.7,0,37.2,5.4,49.4,16.2
C189.6,63,195.7,75.6,195.7,90C195.7,97.9,193.5,105.5,189,112.6z"/>
</svg>`

mainMenu.addRestrictedEventListener(aboutButton, 
    'click', () => alert('about'));

mainMenu.addCustomElement(aboutButton);

mainMenu.createMenuElement();

export default mainMenu;