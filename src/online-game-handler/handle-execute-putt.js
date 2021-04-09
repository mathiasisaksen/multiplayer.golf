import OnlineGameHandler from "./online-game-handler";

function handleExecutePutt(data) {
    const speed = data.golfBallSpeed;
    const direction = data.golfBallDirection;
    const finalPosition = data.finalPosition;

    const onlineGame = OnlineGameHandler.getGame();
    onlineGame.setGolfBallSpeed(speed);    
    onlineGame.setGolfBallDirection(direction);
    onlineGame.setFinalPosition(finalPosition);
    onlineGame.executePutt();

}

export default handleExecutePutt;