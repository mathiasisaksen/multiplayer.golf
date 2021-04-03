import Course from './game-resources/course';
import GolfBall from './game-resources/golf-ball';
import GameMechanics from './game-resources/game-mechanics';
import Game from './game-resources/game';
import OnlineGame from './game-resources/online-game';
import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';
import rootSVGElement from './svg-setup';
import Sidebar from './sidebar/sidebar';

MenuController.setMenu(mainMenu, true, true);


const game = OnlineGame(rootSVGElement);
game.generateNewCourse();
//game.setGameContent(courseData, {x: 80, y: 50});

//const gameMechanics = GameMechanics(course, golfBall);
