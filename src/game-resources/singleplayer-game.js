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
    ScoreBoard.incrementPlayerScore(this.currentCourseNumber, 'Player');
    if (this.isPlayerFinished) {
        showAnnouncement('Next hole', () => this.generateNewCourse());
        Sidebar.incrementCurrentCourse();
    }
}

export default SingleplayerGame;