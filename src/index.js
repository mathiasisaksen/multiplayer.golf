import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';name
import OnlineGameHandler from './online-game-handler/online-game-handler';
import inputBox from './menu-system/input-box';

const queryParameters = new URLSearchParams(window.location.search);
const gameIdParameter = queryParameters.get('game-id');
if (gameIdParameter) {
    inputBox(`Joining game '${gameIdParameter}', please enter a name`,  [{fieldName: 'name', text: 'Name:'}], 
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

MenuController.setMenu(mainMenu, true, true);
/*MenuController.hide();
let game = new SingleplayerGame(rootSVGElement);
game.loadRandomCourses(14);
game.loadNextCourse();
game.setNumberOfCourses(14);
game.show();*/