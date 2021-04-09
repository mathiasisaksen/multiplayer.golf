import OnlineGame from "../game-resources/online-game";
import MenuController from "../menu-system/menu-controller";
import PlayerList from "../sidebar/player-list";
import Sidebar from "../sidebar/sidebar";
import OnlineGameHandler from "./online-game-handler";

function handleJoinRequestSuccessful(data) {
    console.log(data);
    OnlineGameHandler.setPlayerId(data.playerId);
    OnlineGameHandler.setGameId(data.gameId);
    const onlineGame = OnlineGameHandler.createGame();
    onlineGame.show();
    onlineGame.setGameContent(data.courseData);
    Sidebar.show();
    MenuController.hide();

    for (const playerName of data.playerNames) {
        PlayerList.addPlayer(playerName);
    }

    onlineGame.setCurrentPlayer(data.currentPlayer);
    const position = data.golfBallPosition;
    console.log(position);
    onlineGame.setGolfBallPosition(position);
}

export default handleJoinRequestSuccessful;