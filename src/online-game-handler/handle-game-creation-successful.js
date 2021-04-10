import MenuController from "../menu-system/menu-controller";
import PlayerList from "../sidebar/player-list";
import Sidebar from "../sidebar/sidebar";
import OnlineGameHandler from "./online-game-handler";

function handleGameCreationSuccessful(data) {
    console.log(data);
    const onlineGame = OnlineGameHandler.createGame();
    onlineGame.setGameContent(data.courseData);
    onlineGame.setCurrentPlayer(data.currentPlayer);
    onlineGame.setCurrentCourseName(data.courseName);
    
    OnlineGameHandler.setPlayerId(data.playerId);
    OnlineGameHandler.setGameId(data.gameId);

    for (const playerName of data.playerNames) {
        PlayerList.addPlayer(playerName);
    }
    OnlineGameHandler.showGame();
}

export default handleGameCreationSuccessful;