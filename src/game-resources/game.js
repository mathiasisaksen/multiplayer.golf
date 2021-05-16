import GolfBall from './golf-ball';
import Course from './course';
import GameMechanics from './game-mechanics';
import * as svgUtilities from '../utilities/svg-utilities';
import * as mUtils from '../utilities/math-utilities';
import { svgConfig, gameConfig } from '../config';
import * as colorUtils from '../utilities/color-utilities';
import { generateCourse } from './generate-course';
import { normalizeCourse } from './normalize-course';
import ScoreBoard from '../sidebar/score-board';
import showAnnouncement from '../sidebar/show-announcement';
import holeArray from '../data/holes';

const gameContainer = document.querySelector('#game-container');

function Game(rootSVGElement) {
    this.rootSVGElement = rootSVGElement;
    this._computeSVGPosition = svgUtilities.createSVGPositionComputer(rootSVGElement);
    this.isPlayerFinished = false;
    this.currentCourseNumber = 0;

    // Event handlers need to be bound to Game object
    this._handleGolfBallMouseDown = this._handleGolfBallMouseDown.bind(this);
    this._handleGolfBallMouseMove = this._handleGolfBallMouseMove.bind(this);
    this._handleGolfBallMouseUp = this._handleGolfBallMouseUp.bind(this);
    this._handleGolfBallTouchStart = this._handleGolfBallTouchStart.bind(this);
    this._handleGolfBallTouchMove = this._handleGolfBallTouchMove.bind(this);
    this._handleGolfBallTouchEnd = this._handleGolfBallTouchEnd.bind(this);
    this._handleEscapePutt = this._handleEscapePutt.bind(this);
    this.resizeViewBoxToCourse = this.resizeViewBoxToCourse.bind(this);

    const resetButton = document.querySelector('#reset-view-button');
    resetButton.addEventListener('click', this.resizeViewBoxToCourse);
}

Game.prototype.setNumberOfCourses = function(numCourses) {
    this.numberOfCourses = numCourses;
}

Game.prototype.setPlayerFinished = function(isFinished) {
    this.isPlayerFinished = isFinished;
}

Game.prototype._setNewGolfBall =  function(courseData) {
    this.golfBall = GolfBall(courseData, 0, 0, this.rootSVGElement);
    this.golfBall.initialize();
    this.golfBall.addEventListener('mousedown', this._handleGolfBallMouseDown);
    this.golfBall.addEventListener('touchstart', this._handleGolfBallTouchStart);
}
    
Game.prototype.getGolfBall = function() {
    return(this.golfBall);
}

Game.prototype._setNewCourse = function(courseData) {
    this.course = Course(courseData, this.rootSVGElement);
    this.course.initialize();
}

Game.prototype.getCourse = function() {
    return(this.course);
}

Game.prototype.getCourseNumber = function() {
    return(this.currentCourseNumber);
}

Game.prototype.setGameContent = function(newCourseData) {
    this._cleanUpGame();
    this.courseData = normalizeCourse(newCourseData);
    this._setNewCourse(this.courseData);
    this._setNewGolfBall(this.courseData);
    this.gameMechanics = GameMechanics(this);
    this.resizeViewBoxToCourse();
}

Game.prototype.resizeViewBoxToCourse = function() {
    svgUtilities.setSVGExtent(this.rootSVGElement, 
        this.course.getCourseAABB(), svgConfig.extentPadding);
}

Game.prototype.generateNewCourse = function() {
    this.currentCourseNumber++;
    const newCourseData = generateCourse();
    this.setGameContent(newCourseData);
}

Game.prototype.loadNextCourse = function() {
    const newCourseData = this.courseDataArray[this.currentCourseNumber];
    this.setGameContent(newCourseData);
    this.currentCourseNumber++;
}

Game.prototype._handleGolfBallMouseDown = function(event) {
    event.stopPropagation();
    if (!this.golfBall.checkUserClickable()) return;
    const golfBallPosition = this.golfBall.getPosition();
    this.directionLineElement = svgUtilities.drawLine(this.rootSVGElement, 
        golfBallPosition, golfBallPosition,
        svgConfig.directionLineAttributes, ['direction-line']);
    
    window.addEventListener('mousemove', this._handleGolfBallMouseMove);
    window.addEventListener('mouseup', this._handleGolfBallMouseUp);
    window.addEventListener('keydown', this._handleEscapePutt);
}

Game.prototype._handleGolfBallTouchStart = function() {
    if (!this.golfBall.checkUserClickable()) return;
    const golfBallPosition = this.golfBall.getPosition();
    this.directionLineElement = svgUtilities.drawLine(this.rootSVGElement, 
        golfBallPosition, golfBallPosition,
        svgConfig.directionLineAttributes, ['direction-line']);
    this.rootSVGElement.addEventListener('touchmove', this._handleGolfBallTouchMove);
    this.rootSVGElement.addEventListener('touchend', this._handleGolfBallTouchEnd);
}

Game.prototype._handleGolfBallMouseMove = function(event) {
    const svgPosition = this._computeSVGPosition({x: event.clientX, y: event.clientY});
    this._updateDirectionLine(svgPosition);
}

Game.prototype._handleGolfBallTouchMove = function(event) {
    // Avoid dragging screen 
    event.preventDefault();
    const touch = event.changedTouches[0];
    const svgPosition = this._computeSVGPosition({x: touch.clientX, y: touch.clientY});
    this._updateDirectionLine(svgPosition);
}

Game.prototype._handleEscapePutt = function(event) {
    if (event.key != "Escape") return;
    window.removeEventListener('mousemove', this._handleGolfBallMouseMove);
    window.removeEventListener('mouseup', this._handleGolfBallMouseUp);
    window.removeEventListener('keydown', this._handleEscapePutt);
    this.directionLineElement.remove();
    this.directionLineElement = null;
    this.directionLineVector = null;
}

Game.prototype._updateDirectionLine = function(svgPosition) {
    // A vector from the center of the golf ball to the position of the
    // mouse/finger
    this.directionLineVector = mUtils.subtractVectors(mUtils.Vector(svgPosition), 
        this.golfBall.getPosition());
    
    // If the length is longer than the maximum permitted value,
    // rescale to a vector of maximum permitted length,
    // and compute corresponding line end
    let lineEnd;
    if (this.directionLineVector.getLength() > gameConfig.maxDirectionLineLength) {
        const unitVector = this.directionLineVector.getNormalized();
        this.directionLineVector = mUtils.scaleVector(unitVector, gameConfig.maxDirectionLineLength);
        lineEnd = mUtils.addVectors(this.golfBall.getPosition(), this.directionLineVector);
    } else {
        lineEnd = svgPosition;
    }
    svgUtilities.setLineEnd(this.directionLineElement, lineEnd);
    
    // Interpolate color
    const lineColor = colorUtils.interpolateColors(gameConfig.directionLineStartColor, 
        gameConfig.directionLineEndColor, 
        this.directionLineVector.getLength() / gameConfig.maxDirectionLineLength);
    svgUtilities.setAttributes(this.directionLineElement, {stroke: lineColor});
}

Game.prototype._handleGolfBallMouseUp = function() {
    window.removeEventListener('mousemove', this._handleGolfBallMouseMove);
    window.removeEventListener('mouseup', this._handleGolfBallMouseUp);
    window.removeEventListener('keydown', this._handleEscapePutt);
    this.directionLineElement.remove();
    this.directionLineElement = null;

    // If directionLineVector is null, then the mouse has not been moved
    if (!this.directionLineVector) return;

    this.computeGolfBallVelocity();
    this.golfBall.setNotUserClickable();
    this.directionLineVector = null;
    this.executePutt();
}

Game.prototype._handleGolfBallTouchEnd = function() {
    this.rootSVGElement.removeEventListener('touchmove', this._handleGolfBallTouchMove);
    this.rootSVGElement.removeEventListener('touchend', this._handleGolfBallTouchEnd);
    this.directionLineElement.remove();
    this.directionLineElement = null;
    if (!this.directionLineVector) return;

    this.computeGolfBallVelocity();
    this.golfBall.setNotUserClickable();
    this.directionLineVector = null;
    this.executePutt();
}

Game.prototype.computeGolfBallVelocity = function() {
    // The direction of the ball is in the opposite direction of
    // directionLineVector
    const initialDirection = this.directionLineVector.getDirection() + Math.PI;
    const initialSpeed = gameConfig.relativeMaxSpeed * this.golfBall.getRadius() * 
        this.directionLineVector.getLength() / gameConfig.maxDirectionLineLength;
    
    console.log(`speed: ${initialSpeed}, direction: ${initialDirection}`);
    this.golfBall.setDirection(initialDirection);
    this.golfBall.setSpeed(initialSpeed);
}

Game.prototype.executePutt = function() {
    this.gameMechanics.executePutt();
}

Game.prototype.golfBallStoppedMoving = function() {
    this.golfBall.setUserClickable();
}

Game.prototype._cleanUpGame = function() {
    this.course?.destroy();
    this.golfBall?.destroy();
    this.course = null;
    this.golfBall = null;
    this.gameMechanics = null;
    this.courseData = null;
}

Game.prototype.setGolfBallSpeed = function(newSpeed) {
    this.golfBall.setSpeed(newSpeed);
}

Game.prototype.setGolfBallDirection = function(newDirection) {
    this.golfBall.setDirection(newDirection);
}

Game.prototype.setGolfBallPosition = function(newPosition) {
    const position = mUtils.Vector(newPosition);
    console.log(position.getCoordinates());
    this.golfBall.setPosition(position);
    this.golfBall.update();
}

Game.prototype.show = function() {
    gameContainer.classList.remove('hidden');
}

Game.prototype.hide = function() {
    gameContainer.classList.add('hidden');
}

Game.prototype.destroy = function() {
    this.golfBall.destroy();
    this.course.destroy();
}

Game.prototype.update = function() {
    this.golfBall.update();
}

Game.prototype.announceWinner = function() {
    const scoreArray = ScoreBoard.computeTotals();
    const winners = scoreArray.filter(player => player.score === scoreArray[0].score)
        .map(player => player.name);
    if (winners.length > 1) {
        showAnnouncement(`Game finished, with a tie between ${winners.slice(0, -1).join(', ')} and ${winners.slice(-1)}!`,
            () => {});
    } else {
        showAnnouncement(`Game finished, ${scoreArray[0].name} won!`,
            () => {});
    }
}

Game.prototype.loadRandomCourses = function(numberOfCourses) {
    const holes = holeArray.slice();
    holes.sort((a, b) => Math.random() - 0.5);
    this.courseDataArray = holes.slice(0, numberOfCourses);
}

export default Game;