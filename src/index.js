import Course from './course';
import GolfBall from './golf-ball';
import GameMechanics from './game-mechanics';
import Game from './game';
import OnlineGame from './online-game';
import MenuController from './menu-system/menu-controller';
import mainMenu from './menu-system/main-menu';
import rootSVGElement from './svg-setup';
import Sidebar from './sidebar';

MenuController.setMenu(mainMenu, true, true);

const game = OnlineGame(rootSVGElement);
game.generateNewCourse();
//game.setGameContent(courseData, {x: 80, y: 50});

//const gameMechanics = GameMechanics(course, golfBall);
