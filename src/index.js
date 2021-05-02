import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';name
import OnlineGameHandler from './online-game-handler/online-game-handler';
import inputBox from './menu-system/input-box';
import Game from './game-resources/game';
import rootSVGElement from './svg-setup';
import SingleplayerGame from './game-resources/singleplayer-game';
import Sidebar from './sidebar/sidebar';
import multiplayerMenu from './menu-system/multiplayer-menu';

const queryParameters = new URLSearchParams(window.location.search);
const gameIdParameter = queryParameters.get('game-id');

if (gameIdParameter) {
    inputBox('Please enter a name',  [{fieldName: 'name', text: 'Name:'}], 
        [{text: 'Ok', callback: handleNameMenu}, {text: 'Cancel'}]);

    function handleNameMenu(event, fieldValues) {
        let playerName = fieldValues['name'];
        console.log(fieldValues);
        OnlineGameHandler.setPlayerName(playerName);
        const wsClient = OnlineGameHandler.createWSClient();
        wsClient.addEventListener('open', () => {
            const message = {};
            message.eventName = 'joinRequest';
            message.data = {
                playerName,
                gameId: gameIdParameter
        };
        OnlineGameHandler.sendMessage(JSON.stringify(message));
    }
    );
    }
}

const copyLinkButton = document.querySelector('#copy-link-button');
copyLinkButton.addEventListener('click', handleCopyLink);
function handleCopyLink() {
    navigator.clipboard.writeText(
        `${window.location.href.split('?')[0]}?game-id=${OnlineGameHandler.getGameId()}`
    );
}

MenuController.setMenu(multiplayerMenu, true, true);
/*MenuController.setMenu(mainMenu, true, true);
MenuController.hide();

const game = new SingleplayerGame(rootSVGElement);
game.generateNewCourse();
game.show();
Sidebar.show();
*/