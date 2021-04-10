import OnlineGameHandler from "./online-game-handler";

function handleExecutePutt(data) {
    const onlineGame = OnlineGameHandler.getGame();

    const speed = data.golfBallSpeed;
    const direction = data.golfBallDirection;
    const finalPosition = data.finalPosition;

    if (data.isFinished) {
        onlineGame.storeNextPlayer(data.nextPlayer);
    }

    if (data.isNewCourse) {
        onlineGame.storeNewCourseData(data.newCourseData);
    }

    onlineGame.setGolfBallSpeed(speed);    
    onlineGame.setGolfBallDirection(direction);
    onlineGame.setFinalPosition(finalPosition);
    onlineGame.executePutt();

}

export default handleExecutePutt;