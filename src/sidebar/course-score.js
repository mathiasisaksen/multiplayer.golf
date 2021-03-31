const scoreMock = [
    {courseName: 1, scores: [ 
        {name: "Feldman", score: 3},
        {name: "Jarrett", score: 5},
        {name: "Mingus", score: 2},
        {name: "Green", score: 2},
        {name: "Davis", score: 2},
        {name: "Frisell", score: 2},
        {name: "Evans", score: 2},
        {name: "Guaraldi", score: 2},
        {name: "Hancock", score: 2},
        {name: "Budd", score: 4}]},
    {courseName: 2, scores: [ 
        {name: "Feldman", score: 4}, 
        {name: "Jarrett", score: 2}, 
        {name: "Mingus", score: 3}, 
        {name: "Budd", score: 1}]},
    {courseName: 3, scores: [ 
        {name: "Feldman", score: 1}, 
        {name: "Jarrett", score: 3}, 
        {name: "Mingus", score: 3}, 
        {name: "Budd", score: 2}]},
    {courseName: 4, scores: [ 
        {name: "Feldman", score: 2}, 
        {name: "Jarrett", score: 1}, 
        {name: "Mingus", score: 3}, 
        {name: "Budd", score: 5}]},
];

const CourseScore = (() => {
    const prevCourseButton = document.querySelector('#previous-course-large-screen');
    prevCourseButton.addEventListener('click', handlePreviousCourseClick);

    const nextCourseButton = document.querySelector('#next-course-large-screen');
    nextCourseButton.addEventListener('click', handleNextCourseClick);

    const courseSummaryButton = document.querySelector('#course-summary-large-screen');

    const courseHeader = document.querySelector('#current-course-large-screen');
    const courseElements = [prevCourseButton, nextCourseButton, 
        courseSummaryButton, courseHeader];
    
    const scoreTable = document.querySelector('#table-content-large-screen');

    let isShowingSummary;
    let currentCourseNumber;
    let scoreArray;
    function initialSetup() {
        isShowingSummary = false;
        currentCourseNumber = 0;
        scoreArray = scoreMock;
    }

    initialSetup()
    
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
        if (isShowingSummary || currentCourseNumber === 0) return;
        currentCourseNumber--;
        showCurrentCourseContent();
    }

    function handleNextCourseClick() {
        if (isShowingSummary || currentCourseNumber === scoreArray.length - 1) return;
        currentCourseNumber++;
        showCurrentCourseContent();
    }

    function showCurrentCourseContent() {
        if (scoreArray.length === 0) {
            setCourseHeader('No data yet');
            return;
        }
        const {courseName, scores} = scoreArray[currentCourseNumber];
        scores.sort((a, b) => a.score - b.score);
        setCourseHeader('Course ' + courseName);

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

    function addNewCourse(courseName) {
        if (!courseName) courseName = scoreArray.length + 1;
        const newEntry = {courseName, scores: []};
        scoreArray.push(newEntry);
        currentCourseNumber = scoreArray.length - 1;
        updateScoreTable();
    }

    function addPlayerScore(name, score) {
        scoreArray[scoreArray.length - 1].scores.push({name, score});
        if (currentCourseNumber === scoreArray.length - 1) updateScoreTable();
    }

    function resetScoreboard() {
        initialSetup();
    }

    showCurrentCourseContent(currentCourseNumber);
    /*setTimeout(() => {addNewCourse();}, 1000);
    setTimeout(() => {addPlayerScore('Mingus', 5);}, 2000);
    setTimeout(() => {addPlayerScore('Jarrett', 2);}, 3000);
    setTimeout(() => {addPlayerScore('Evans', 3);}, 4000);
    setTimeout(() => {addPlayerScore('Davis', 3);}, 5000);
    setTimeout(() => {addPlayerScore('Guaraldi', 2);}, 6000);
    setTimeout(() => {addPlayerScore('Frisell', 6);}, 7000);*/



    return({ updateScoreTable, addNewCourse, addPlayerScore, resetScoreboard })
})();

export default CourseScore;