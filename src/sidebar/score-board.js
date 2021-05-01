
const ScoreBoard = (() => {
    const prevCourseButton = document.querySelector('#previous-course');
    prevCourseButton.addEventListener('click', handlePreviousCourseClick);

    const nextCourseButton = document.querySelector('#next-course');
    nextCourseButton.addEventListener('click', handleNextCourseClick);

    const courseSummaryButton = document.querySelector('#course-summary');

    const courseHeader = document.querySelector('#current-course');
    const courseElements = [prevCourseButton, nextCourseButton, 
        courseSummaryButton, courseHeader];
    
    const scoreTable = document.querySelector('#table-content');

    let isShowingSummary;
    let selectedCourseNumber;
    let courseNameIndexMap;
    let scoreArray;
    function initialSetup() {
        isShowingSummary = false;
        selectedCourseNumber = 0;
        courseNameIndexMap = {};
        scoreArray = [];
    }

    initialSetup();

    function incrementPlayerScore(courseName, playerName) {
        // Has a score for the course already been registered?
        if (!(courseName in courseNameIndexMap)) {
            courseNameIndexMap[courseName] = scoreArray.length;
            scoreArray.push({courseName, scores: []});
        }

        const courseIndex = courseNameIndexMap[courseName];
        const courseScores = scoreArray[courseIndex].scores;

        const playerIndex = courseScores.findIndex(entry => entry.name === playerName);
        if (playerIndex !== -1) {
            courseScores[playerIndex].score += 1;
        } else {
            courseScores.push({name: playerName, score: 1});
        }
        selectedCourseNumber = courseIndex;
        updateScoreTable();
    }

    function setScoreArray(_scoreArray) {
        scoreArray = _scoreArray;
        updateScoreTable();
    }
    
    courseSummaryButton.addEventListener('click', handleCourseSummaryClick);

    function handleCourseSummaryClick() {
        if (isShowingSummary) {
            courseElements.forEach(elem => elem.classList.remove('course-summary-enabled'));
            showCurrentCourseContent();
        } else {
            courseElements.forEach(elem => elem.classList.add('course-summary-enabled'));
            showSummaryContent();
        }
        isShowingSummary = !isShowingSummary;
    }

    function handlePreviousCourseClick() {
        if (isShowingSummary || selectedCourseNumber === 0) return;
        selectedCourseNumber--;
        showCurrentCourseContent();
    }

    function handleNextCourseClick() {
        if (isShowingSummary || selectedCourseNumber === scoreArray.length - 1) return;
        selectedCourseNumber++;
        showCurrentCourseContent();
    }

    function showCurrentCourseContent() {
        if (scoreArray.length === 0) {
            setCourseHeader('No data yet');
            return;
        }
        const {courseName, scores} = scoreArray[selectedCourseNumber];
        scores.sort((a, b) => a.score - b.score);
        setCourseHeader('Hole ' + courseName);

        emptyTable();
        for (const playerScore of scores) {
            insertTableElement(playerScore.name, playerScore.score);
        }
    }

    function showSummaryContent() {
        setCourseHeader('Totals');
        if (scoreArray.length === 0) return;
        const totalScores = {};

        for (const scoreEntry of scoreArray) {
            for (const playerScore of scoreEntry.scores) {
                if (!totalScores[playerScore.name]) totalScores[playerScore.name] = 0;
                totalScores[playerScore.name] += playerScore.score;
            }
        }

        const totalScoreArray = [];
        Object.keys(totalScores)
            .forEach(name => totalScoreArray.push({name, score: totalScores[name]}));
        totalScoreArray.sort((a, b) => a.score - b.score);

        emptyTable();
        for (const playerScore of totalScoreArray) {
            insertTableElement(playerScore.name, playerScore.score);
        }
    }

    function setCourseHeader(name) {
        courseHeader.textContent = name;
    }

    function emptyTable() {
        scoreTable.innerHTML = '';
    }

    function insertTableElement(playerName, score) {
        const newRow = document.createElement('div');
        newRow.innerHTML = `<p>${playerName}</p><p>${score}</p>`;
        scoreTable.appendChild(newRow);
    }

    function updateScoreTable() {
        if (isShowingSummary) {
            showSummaryContent();
        } else {
            showCurrentCourseContent();
        }
    }

    function resetScoreboard() {
        initialSetup();
        updateScoreTable();
    }

    showCurrentCourseContent();

    return({ updateScoreTable, resetScoreboard,
        incrementPlayerScore, setScoreArray });
})();

export default ScoreBoard;