import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';
import OnlineGameHandler from './online-game-handler/online-game-handler';
import inputBox from './menu-system/input-box';

const queryParameters = new URLSearchParams(window.location.search);
const gameIdParameter = queryParameters.get('game-id');

if (gameIdParameter) {
    inputBox('Please enter a name',  ['Name'], 
        [{text: 'Ok', callback: handleNameMenu}, {text: 'Cancel'}]);

    function handleNameMenu(event, fieldValues) {
        let playerName = fieldValues['Name'];
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

MenuController.setMenu(mainMenu, true, true);
