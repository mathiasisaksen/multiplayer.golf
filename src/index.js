import Course from './course';
import GolfBall from './golf-ball';
import GameMechanics from './game-mechanics';
import Game from './game';
import OnlineGame from './online-game';

const rootSVGElement = document.querySelector('#game-container');


const game = OnlineGame(rootSVGElement);
game.generateNewCourse();
//game.setGameContent(courseData, {x: 80, y: 50});

//const gameMechanics = GameMechanics(course, golfBall);
