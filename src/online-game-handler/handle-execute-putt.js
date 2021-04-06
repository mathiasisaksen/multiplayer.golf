
function handleExecutePutt(onlineGame, data) {
    const speed = data.golfBallSpeed;
    const direction = data.golfBallDirection;

    onlineGame.setGolfBallSpeed(speed);    
    onlineGame.setGolfBallDirection(direction);
    onlineGame.executePutt();

}

export default handleExecutePutt;