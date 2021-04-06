import MenuController from "../menu-system/menu-controller";
import PlayerList from "../sidebar/player-list";
import Sidebar from "../sidebar/sidebar";
import OnlineGameHandler from "./online-game-handler";

function handleGameCreationSuccessful(onlineGame, data) {
    console.log(data);
    onlineGame.show();
    onlineGame.setGameContent(data.courseData);
    Sidebar.show();
    MenuController.hide();
    OnlineGameHandler.setPlayerId(data.playerId);
    OnlineGameHandler.setGameId(data.gameId);
    console.log(OnlineGameHandler.getGameId());
    console.log(OnlineGameHandler.getPlayerId());

    for (const playerName of data.playerNames) {
        PlayerList.addPlayer(playerName);
    }
}

export default handleGameCreationSuccessful;