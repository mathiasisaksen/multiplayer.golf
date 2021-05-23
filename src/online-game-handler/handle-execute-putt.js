import ScoreBoard from "../sidebar/score-board";
import OnlineGameHandler from "./online-game-handler";

function handleExecutePutt(data) {
    const onlineGame = OnlineGameHandler.getGame();

    const playerName = data.playerName;
    const speed = data.golfBallSpeed;
    const direction = data.golfBallDirection;
    const finalPosition = data.finalPosition;

    if (data.isFinished) {
        onlineGame.storeNextPlayer(data.nextPlayer);
    }

    if (data.isGameFinished) {
        onlineGame.setGameFinished();
    }

    if (data.isNewCourse) {
        onlineGame.storeNewCourseData(data.newCourseData, data.newCourseName);
    }
    ScoreBoard.incrementPlayerScore(onlineGame.getCurrentCourseName(), playerName);
    onlineGame.setGolfBallSpeed(speed);    
    onlineGame.setGolfBallDirection(direction);
    onlineGame.setFinalPosition(finalPosition);
    onlineGame.executePutt();
}

export default handleExecutePutt;