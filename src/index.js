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
            {x: 15, y: 55},
            {x: 25, y: 55},
            {x: 25, y: 45},
            {x: 15, y: 45}
        ]
    ]
    },
    rootSVGElement);
course.initialize();

const golfBall = GolfBall({x: 80, y: 50}, 4, Math.PI / 2 * 1.75, rootSVGElement);
//const golfBall = GolfBall({x: 17, y: 57}, 2, Math.PI*1.05, rootSVGElement);
golfBall.initialize();

const gameMechanics = GameMechanics(course, golfBall);
