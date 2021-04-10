import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';
import OnlineGameHandler from './online-game-handler/online-game-handler';

const queryParameters = new URLSearchParams(window.location.search);
const gameIdParameter = queryParameters.get('game-id');

if (gameIdParameter) {
    const playerName = "Mathias";
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

MenuController.setMenu(mainMenu, true, true);
