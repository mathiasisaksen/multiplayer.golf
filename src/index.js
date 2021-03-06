import Course from './course';

const rootSVGElement = document.querySelector('#game-container');

const course = Course({
    boundary: [
    {x: 10, y: 5}, 
    {x: 50, y: 5}, 
    {x: 90, y: 90}, 
    {x: 10, y: 40}],
    obstacles: [
        [{x: 30, y: 30}, 
        {x: 40, y: 30},
        {x: 40, y: 40},
        {x: 30, y: 40}]]
    },
    rootSVGElement);
course.drawCourse();