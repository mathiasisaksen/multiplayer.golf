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
    
    const scoreTable = document.querySelector('#score-table-large-screen');

    let isShowingSummary = false;
    let currentCourseNumber = 0;
    let scoreArray = scoreMock;
    
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
        const {courseName, scores} = scoreArray[currentCourseNumber];
        scores.sort((a, b) => a.score - b.score);
        setCourseHeader('Course ' + courseName);

        emptyTable();
        for (const playerScore of scores) {
            const newRow = scoreTable.insertRow(-1);
            newRow.innerHTML = `<td>${playerScore.name}</td><td>${playerScore.score}</td>`;
        }
    }

    function showSummaryContent() {
        setCourseHeader('Totals');
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
            const newRow = scoreTable.insertRow(-1);
            newRow.innerHTML = `<td>${playerScore.name}</td><td>${playerScore.score}</td>`;
        }
    }

    function setCourseHeader(name) {
        courseHeader.textContent = name;
    }

    function emptyTable() {
        while (scoreTable.rows.length > 1) {
            scoreTable.deleteRow(-1);
        }
    }

    function updateScoreTable() {
        if (isShowingSummary) {
            showSummaryContent();
        } else {
            showCurrentCourseContent();
        }
    }

    showCurrentCourseContent(0);
})();

export default CourseScore;