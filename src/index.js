import Course from './course';
import GolfBall from './golf-ball';
import GameMechanics from './game-mechanics';
import Game from './game';

const rootSVGElement = document.querySelector('#game-container');

const courseData = {
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
    {x: 10, y: 60}
],
    obstacles: [
        [
            {x: 15, y: 55},
            {x: 25, y: 55},
            {x: 25, y: 45},
            {x: 15, y: 45}
        ]
    ],
    initialGolfBallPosition: {x: 80, y: 50},
    hole: {position: {x: 12.5, y: 50}, radius: 2.1}
    };

    /*const courseData = {
        boundary: [
            {x: 10, y: 60},
            {x: 10, y: 40}
        ],
        obstacles: [
            [{x: 40, y: 60},
                {x: 35, y: 60},
                {x: 35, y: 40},
                {x: 40, y: 40}],

            [{x: 60, y: 40},
                {x: 55, y: 40},
                {x: 55, y: 60},
                {x: 60, y: 60}
                ]
                        
        ],
        initialGolfBallPosition: {x: 50, y: 50},
        hole: {position: {x: 0, y: 0}, radius: 0}
    }

let obstacle = [];
for (let i = 0; i < 50; i++) {
    let x = 35 + 10*Math.cos(2*Math.PI*i/50);
    let y = 35 + 10*Math.sin(2*Math.PI*i/50);
    obstacle.push({x, y});
}
courseData.obstacles[0] = obstacle;*/

const game = Game(rootSVGElement);
game.setGameContent(courseData, {x: 80, y: 50});

//const gameMechanics = GameMechanics(course, golfBall);
