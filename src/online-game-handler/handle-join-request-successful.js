import joinOnlineGameMenu from "../menu-system/join-online-game-menu";
import MenuController from "../menu-system/menu-controller";
import PlayerList from "../sidebar/player-list";
import ScoreBoard from "../sidebar/score-board";
import Sidebar from "../sidebar/sidebar";
import OnlineGameHandler from "./online-game-handler";

function handleJoinRequestSuccessful(data) {
    console.log(data);
    OnlineGameHandler.createGame();
    OnlineGameHandler.setPlayerId(data.playerId);
    OnlineGameHandler.setGameId(data.gameId);
    
    const onlineGame = OnlineGameHandler.createGame();
    
    onlineGame.setGameContent(data.courseData);
    onlineGame.setCurrentCourseName(data.courseName);

    for (const playerName of data.playerNames) {
        PlayerList.addPlayer(playerName);
    }

    onlineGame.setCurrentPlayer(data.currentPlayer);
    onlineGame.setGolfBallPosition(data.golfBallPosition);

    OnlineGameHandler.showGame();
    ScoreBoard.setScoreArray(data.scoreArray);
    Sidebar.setNumberOfCourses(data.numberOfCourses);
    Sidebar.setCurrentCourse(data.courseNumber);
    Sidebar.setExitCallback(() => {            
        OnlineGameHandler.hideGame();
        OnlineGameHandler.exit();
    });
    joinOnlineGameMenu.clearInput();
}

export default handleJoinRequestSuccessful;