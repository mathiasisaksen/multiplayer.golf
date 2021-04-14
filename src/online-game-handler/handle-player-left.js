import ChatBox from "../sidebar/chat-box";
import PlayerList from "../sidebar/player-list";
import showAnnouncement from "../sidebar/show-announcement";
import OnlineGameHandler from "./online-game-handler";

function handlePlayerLeft(data) {
    PlayerList.removePlayer(data.playerName);
    ChatBox.receiveAnnouncement(`${data.playerName} has left the game`);

    const onlineGame = OnlineGameHandler.getGame();
    if (data.currentPlayerLeft) {
        onlineGame.resetGolfBall();
        if (data.isNewCourse) {
            showAnnouncement(`NEW HOLE, NEXT PLAYER: ${data.newCurrentPlayerName}`,() => {
                onlineGame.setGameContent(data.newCourseData);
                onlineGame.setCurrentCourseName(data.newCourseName);
                onlineGame.setCurrentPlayer(data.newCurrentPlayerName);
            });
        } else {
            showAnnouncement(`NEXT PLAYER: ${data.newCurrentPlayerName}`,() => {
                onlineGame.setCurrentPlayer(data.newCurrentPlayerName);
            });
        }
    } 
}

export default handlePlayerLeft;