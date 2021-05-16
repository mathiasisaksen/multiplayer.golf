import ScoreBoard from "../sidebar/score-board";
import showAnnouncement from "../sidebar/show-announcement";
import Sidebar from "../sidebar/sidebar";
import Game from "./game";

function SingleplayerGame(rootSVGElement) {
    Game.call(this, rootSVGElement);
}

SingleplayerGame.prototype = Object.create(Game.prototype);

SingleplayerGame.prototype.golfBallStoppedMoving = function() {
    this.golfBall.setUserClickable();
    if (this.isPlayerFinished) {
        showAnnouncement('Next hole', () => this.loadNextCourse());
        Sidebar.incrementCurrentCourse();
    }
}

SingleplayerGame.prototype.executePutt = function() {
    ScoreBoard.incrementPlayerScore(this.currentCourseNumber, 'Player');
    this.gameMechanics.executePutt();
}

export default SingleplayerGame;