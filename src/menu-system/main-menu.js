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

const holeSVG = `<svg version="1.1" viewBox="0 0 134.22 20.407" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(-6.3148 -145.57)">
 <path transform="translate(1.2816 2.8836)" d="m83.918 142.85v20.248h20.248v-20.248zm10.163 18.294c-4.5578 0-8.2479-3.69-8.2479-8.2479 0-4.5578 3.6901-8.2479 8.2479-8.2479s8.2479 3.69 8.2479 8.2479c0 4.5578-3.6901 8.2479-8.2479 8.2479z" stroke-width=".078179"/>
 <g stroke-width=".51348">
  <path transform="scale(1.0012 .99881)" d="m6.3073 165.84v-19.604h5.9239l3.557 13.372 3.5169-13.372h5.9373v19.604h-3.6774v-15.432l-3.8913 15.432h-3.8111l-3.8779-15.432v15.432z"/>
  <path transform="scale(1.0012 .99881)" d="m29.08 165.84v-19.604h3.9582v19.604z"/>
  <path transform="scale(1.0012 .99881)" d="m36.836 165.84v-19.604h3.8512l8.0233 13.091v-13.091h3.6774v19.604h-3.9715l-7.903-12.784v12.784z"/>
  <path transform="scale(1.0012 .99881)" d="m56.466 165.84v-19.604h3.9582v19.604z"/>
  <path transform="scale(1.0012 .99881)" d="m73.302 158.63v-3.3029h8.5315v7.8094q-1.2436 1.2035-3.6105 2.1262-2.3535 0.90931-4.7739 0.90931-3.0756 0-5.3623-1.2837-2.2866-1.2971-3.4367-3.6907-1.15-2.407-1.15-5.2285 0-3.0622 1.2837-5.4425 1.2837-2.3803 3.7576-3.6506 1.8855-0.97617 4.6936-0.97617 3.6506 0 5.6966 1.5378 2.0593 1.5244 2.6477 4.2256l-3.9314 0.73547q-0.41454-1.4442-1.5645-2.2733-1.1366-0.84245-2.8483-0.84245-2.5942 0-4.132 1.6448-1.5244 1.6448-1.5244 4.8809 0 3.4902 1.5512 5.2419 1.5512 1.7384 4.0652 1.7384 1.2436 0 2.4872-0.4814 1.257-0.49477 2.1529-1.1901v-2.4872z"/>
 </g>
 <g transform="scale(1.0012 .99881)" stroke-width=".53516">
  <path d="m108.99 166.18v-20.264h4.1252v16.822h10.257v3.4424z"/>
  <path d="m126.36 166.18v-20.431h14.006v3.4563h-9.8811v4.836h8.5292v3.4563h-8.5292v8.6825z"/>
 </g>
</g>
</svg>
`

mainMenu.setTitle(holeSVG);

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