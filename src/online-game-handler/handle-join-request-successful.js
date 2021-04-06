import OnlineGame from "../game-resources/online-game";
import MenuController from "../menu-system/menu-controller";
import PlayerList from "../sidebar/player-list";
import Sidebar from "../sidebar/sidebar";
import OnlineGameHandler from "./online-game-handler";

function handleJoinRequestSuccessful(onlineGame, data) {
    console.log(data);
    onlineGame.show();
    onlineGame.setGameContent(data.courseData);
    Sidebar.show();
    MenuController.hide();
    OnlineGameHandler.setPlayerId(data.playerId);
    OnlineGameHandler.setGameId(data.gameId);

    for (const playerName of data.playerNames) {
        PlayerList.addPlayer(playerName);
    }

    onlineGame.setCurrentPlayer(data.currentPlayer);
    const position = data.golfBallPosition;
    onlineGame.setGolfBallPosition(position.x, position.y);
}

export default handleJoinRequestSuccessful;