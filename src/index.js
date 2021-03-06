import Course from './course';

const svgElement = document.querySelector('#game-container');

const course = Course([{x: 10, y: 5}, {x: 50, y: 5}, {x: 60, y: 60}, {x: 10, y: 40}]);
course.drawCourse(svgElement);