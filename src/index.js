import Course from './course';
import GolfBall from './golf-ball';
import GameMechanics from './game-mechanics';

const rootSVGElement = document.querySelector('#game-container');

const course = Course({
    boundary: [
    {x: 10, y: 40},
    {x: 30, y: 40},
    {x: 30, y: 45},
    {x: 65, y: 45},
    {x: 65, y: 40},
    {x: 90, y: 40},
    {x: 90, y: 60},
    {x: 65, y: 60},
    {x: 65, y: 55},
    {x: 30, y: 55},
    {x: 30, y: 60},
    {x: 10, y: 60}],
    obstacles: [
        [
            {x: 15, y: 45},
            {x: 25, y: 45},
            {x: 25, y: 55},
            {x: 15, y: 55}]]
    },
    rootSVGElement);
course.initialize();

const golfBall = GolfBall({x: 80, y: 50}, 2, Math.PI / 2 * 1.85, rootSVGElement);
golfBall.initialize();

const gameMechanics = GameMechanics(course, golfBall);
/*setInterval(() => {golfBall.setPosition({
    x: 100*Math.random(),
    y: 100*Math.random()
})}, 1000);*/