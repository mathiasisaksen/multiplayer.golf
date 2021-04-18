import MenuController from "../menu-system/menu-controller";
import newOnlineGameMenu from "../menu-system/new-online-game-menu";
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
    Sidebar.setNumberOfCourses(data.numberOfCourses);
    Sidebar.setCurrentCourse(1);
    Sidebar.setExitCallback(() => {            
        OnlineGameHandler.hideGame();
        OnlineGameHandler.exit();
    });
    newOnlineGameMenu.clearInput();
}

export default handleGameCreationSuccessful;