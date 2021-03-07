import Course from './course';
import { GolfBall } from './golf-ball';

const rootSVGElement = document.querySelector('#game-container');

const course = Course({
    boundary: [
    {x: 10, y: 5}, 
    {x: 50, y: 5}, 
    {x: 90, y: 90}, 
    {x: 10, y: 40}],
    obstacles: [
        [{x: 10, y: 30}, 
        {x: 20, y: 30},
        {x: 20, y: 40},
        {x: 10, y: 40}]]
    },
    rootSVGElement);
course.initialize();

const golfBall = GolfBall({x: 20, y: 20}, 0, 0, rootSVGElement);
golfBall.initialize();
/*setInterval(() => {golfBall.setPosition({
    x: 100*Math.random(),
    y: 100*Math.random()
})}, 1000);*/