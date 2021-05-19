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

const aboutContainer = document.createElement('div');
aboutContainer.setAttribute('id', 'about-container');
aboutContainer.classList.add('disable-scrollbar', 'hidden');
aboutContainer.innerHTML = `
              <svg id="about-exit-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 333 333">
                <circle id="about-exit-circle" cx="166.5" cy="166.5" r="166"></circle>
                <g>
                  <path id="about-exit-symbol" d="M90.3,63.9l75.7,77.3l75.7-77.3l25.5,26.3l-75.3,76.9l75.3,76.9l-25.9,26.3L166,193.3
		l-75.3,76.9l-25.9-26.3l75.3-76.9L64.8,90.2L90.3,63.9z"></path>
                </g>
              </svg> 
              <div id="about-content">
                <h3>
                  About
                </h3>
                <p>Made by Mathias Isaksen   •   <a href="https://www.instagram.com/st4yhome" target="_blank">Instagram</a>   •   GitHub: <a href="https://github.com/mathiasisaksen/minigolf" target="_blank">frontend</a>, <a href="https://github.com/mathiasisaksen/minigolf-backend" target="_blank">backend</a></p>
                <p>If you like the game and want to help cover server costs, feel free to <a href="https://www.buymeacoffee.com/st4yhome" target="_blank">buy me a cup of coffee</a> :)</p>
                <h3>
                  Instructions
                </h3>
                <p>Zoom in and out by scrolling up and down (works for both mouse and touchpad)</p>
                <p>Move around by clicking and dragging</p>
                <p>Execute a putt by clicking and dragging the golf ball in the direction opposite to the intended direction and letting go. The color of the line that appears indicates the strength of the putt. A putt can be cancelled by pressing Esc</p>
                <p>The four textures below affect the golf ball in different ways. Hover over each to read a description</p>
                <div id="cover-type-container">
                  <div class="tooltip" data-tooltip="Sand: Slows down the golf ball" data-location="top">
                   <svg xmlns="http://www.w3.org/2000/svg" class="about-cover-svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 4 2">
                    <defs>
                      <pattern id="about-sand-pattern" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" width="0.5" height="0.5" viewBox="0 0 1 1" patternTransform="rotate(135)">
                        <rect x="0.00" y="0" width="1" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.05" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.10" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.15" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.20" y="0" width="0.05" height="1" fill="#DED6BB"></rect>
                        <rect x="0.25" y="0" width="0.05" height="1" fill="#DCD3B7"></rect>
                        <rect x="0.30" y="0" width="0.05" height="1" fill="#D8CEAE"></rect>
                        <rect x="0.35" y="0" width="0.05" height="1" fill="#D0C49E"></rect>
                        <rect x="0.40" y="0" width="0.05" height="1" fill="#C8BA8D"></rect>
                        <rect x="0.45" y="0" width="0.05" height="1" fill="#C2B381"></rect>
                        <rect x="0.50" y="0" width="0.05" height="1" fill="#C2B381"></rect>
                        <rect x="0.55" y="0" width="0.05" height="1" fill="#C8BA8D"></rect>
                        <rect x="0.60" y="0" width="0.05" height="1" fill="#D0C49E"></rect>
                        <rect x="0.65" y="0" width="0.05" height="1" fill="#D8CEAE"></rect>
                        <rect x="0.70" y="0" width="0.05" height="1" fill="#DCD3B7"></rect>
                        <rect x="0.75" y="0" width="0.05" height="1" fill="#DED6BB"></rect>
                        <rect x="0.80" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.85" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.90" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                        <rect x="0.95" y="0" width="0.05" height="1" fill="#DFD7BD"></rect>
                      </pattern>
                    </defs>
                    <rect fill="url(#about-sand-pattern)" width="4" height="2"></rect>
                  </svg>
                </div>
                <div class="tooltip" data-tooltip="Water: Moves the golf ball back to the starting position" data-location="top">
                  <svg xmlns="http://www.w3.org/2000/svg" class="about-cover-svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 4 2">
                    <defs>
                      <pattern id="about-water-pattern" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1" patternTransform="rotate(135)">
                      <g>
                        <rect x="0.00" y="0" width="1" height="1" fill="#147399"></rect>
                        <rect x="0.05" y="0" width="0.05" height="1" fill="#147399"></rect>
                        <rect x="0.10" y="0" width="0.05" height="1" fill="#147399"></rect>
                        <rect x="0.15" y="0" width="0.05" height="1" fill="#147399"></rect>
                        <rect x="0.20" y="0" width="0.05" height="1" fill="#14739A"></rect>
                        <rect x="0.25" y="0" width="0.05" height="1" fill="#14749A"></rect>
                        <rect x="0.30" y="0" width="0.05" height="1" fill="#14749B"></rect>
                        <rect x="0.35" y="0" width="0.05" height="1" fill="#14749B"></rect>
                        <rect x="0.40" y="0" width="0.05" height="1" fill="#14759C"></rect>
                        <rect x="0.45" y="0" width="0.05" height="1" fill="#14769D"></rect>
                        <rect x="0.50" y="0" width="0.05" height="1" fill="#14779E"></rect>
                        <rect x="0.55" y="0" width="0.05" height="1" fill="#1578A0"></rect>
                        <rect x="0.60" y="0" width="0.05" height="1" fill="#157AA2"></rect>
                        <rect x="0.65" y="0" width="0.05" height="1" fill="#157CA5"></rect>
                        <rect x="0.70" y="0" width="0.05" height="1" fill="#167FA9"></rect>
                        <rect x="0.75" y="0" width="0.05" height="1" fill="#1783AE"></rect>
                        <rect x="0.80" y="0" width="0.05" height="1" fill="#1888B5"></rect>
                        <rect x="0.85" y="0" width="0.05" height="1" fill="#198EBE"></rect>
                        <rect x="0.90" y="0" width="0.05" height="1" fill="#1A97C9"></rect>
                        <rect x="0.95" y="0" width="0.05" height="1" fill="#1DA2D8"></rect>
                      </g>
                      <animate attributeName="x" values="0; 1" dur="2s" begin="0s" repeatCount="indefinite" fill="freeze"></animate>
                      </pattern>
                    </defs>
                    <rect fill="url(#about-water-pattern)" width="4" height="2"></rect>
                  </svg>
                </div>
                <div class="tooltip" data-tooltip="Wind: Increases the speed of the golf ball" data-location="top">
                  <svg xmlns="http://www.w3.org/2000/svg" class="about-cover-svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 4 2">
                    <defs>
                      <pattern id="about-wind-pattern" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1" patternTransform="rotate(225)">
                      <circle cx="0.25" cy="0.25" r="0.1" fill="#BFEFFF">
                        <animate attributeName="r" values="0.1; 0.2; 0.1" dur="2s" begin="0s" repeatCount="indefinite" fill="freeze"></animate>
                      </circle>
                      <circle cx="0.75" cy="0.25" r="0.11" fill="#BFEFFF">
                        <animate attributeName="r" values="0.1; 0.2; 0.1" dur="2s" begin="0.5s" repeatCount="indefinite" fill="freeze"></animate>
                      </circle>
                      <circle cx="0.75" cy="0.75" r="0.12" fill="#BFEFFF">
                        <animate attributeName="r" values="0.1; 0.2; 0.1" dur="2s" begin="1s" repeatCount="indefinite" fill="freeze"></animate>
                      </circle>
                      <circle cx="0.25" cy="0.75" r="0.13" fill="#BFEFFF">
                        <animate attributeName="r" values="0.1; 0.2; 0.1" dur="2s" begin="1.5s" repeatCount="indefinite" fill="freeze"></animate>
                      </circle>
                    </pattern>
                    </defs>
                    <rect fill="url(#about-wind-pattern)" width="4" height="2"></rect>
                  </svg>
                </div>
                <div class="tooltip" data-tooltip="Bridge: Makes it possible to cross sand and water" data-location="top">
                  <svg xmlns="http://www.w3.org/2000/svg" class="about-cover-svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 4 2">
                    <defs>
                      <pattern id="about-bridge-pattern" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" width="2" height="2" viewBox="0 0 1 1">
                      <rect x="0.00" y="0" width="1" height="1" fill="#AC7336"></rect>
                      <rect x="0.05" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.10" y="0" width="0.05" height="1" fill="#AC7336"></rect>
                      <rect x="0.15" y="0" width="0.05" height="1" fill="#AC7336"></rect>
                      <rect x="0.20" y="0" width="0.05" height="1" fill="#B07537"></rect>
                      <rect x="0.25" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.30" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.35" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.40" y="0" width="0.05" height="1" fill="#A36D33"></rect>
                      <rect x="0.45" y="0" width="0.05" height="1" fill="#20150A"></rect>
                      <rect x="0.50" y="0" width="0.05" height="1" fill="#271A0C"></rect>
                      <rect x="0.55" y="0" width="0.05" height="1" fill="#A66F34"></rect>
                      <rect x="0.60" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.65" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.70" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.75" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.80" y="0" width="0.05" height="1" fill="#B07637"></rect>
                      <rect x="0.85" y="0" width="0.05" height="1" fill="#B27738"></rect>
                      <rect x="0.90" y="0" width="0.05" height="1" fill="#B07537"></rect>
                      <rect x="0.95" y="0" width="0.05" height="1" fill="#B27738"></rect>
                    </pattern>
                    </defs>
                    <rect fill="url(#about-bridge-pattern)" width="4" height="2"></rect>
                  </svg>
                </div>
                </div>
              </div>
`;

mainMenu.addCustomElement(aboutContainer);

const aboutExitButton = aboutContainer.querySelector('#about-exit-button');
mainMenu.addRestrictedEventListener(aboutExitButton, 'click',
    () => aboutContainer.classList.add('hidden'));

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

mainMenu.addRestrictedEventListener(aboutButton, 'click', 
    () => aboutContainer.classList.remove('hidden'));

mainMenu.addCustomElement(aboutButton);

mainMenu.createMenuElement();

export default mainMenu;