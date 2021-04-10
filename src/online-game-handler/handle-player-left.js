import ChatBox from "../sidebar/chat-box";
import PlayerList from "../sidebar/player-list";
import OnlineGameHandler from "./online-game-handler";

function handlePlayerLeft(data) {
    PlayerList.removePlayer(data.playerName);
    ChatBox.receiveAnnouncement(`${data.playerName} has left the game`);

    const onlineGame = OnlineGameHandler.getGame();
    if (data.currentPlayerLeft) {
        onlineGame.resetGolfBall();
        if (data.isNewCourse) {
            onlineGame.setGameContent(data.newCourseData);
            onlineGame.setCurrentCourseName(data.newCourseName);
        }
        onlineGame.setCurrentPlayer(data.newCurrentPlayerName);
    } 
}

export default handlePlayerLeft;