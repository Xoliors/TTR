function checkAnswers() {
    const buildingAnswer = document.getElementById('building').value;
    const personAnswer = document.getElementById('person').value;
    const caterpillarAnswer = document.getElementById('caterpillar').value;
    const treeAnswer = document.getElementById('tree').value;
    const flagAnswer = document.getElementById('flag').value;

    const correctAnswers = ['2', '1', '1', '2', '2'];

    let score = 0;
    let totalQuestions = 5;

    if (buildingAnswer === correctAnswers[0]) score++;
    if (personAnswer === correctAnswers[1]) score++;
    if (caterpillarAnswer === correctAnswers[2]) score++;
    if (treeAnswer === correctAnswers[3]) score++;
    if (flagAnswer === correctAnswers[4]) score++;

    let resultText = '';
    if (score === totalQuestions) {
        resultText = '¡Todo correcto! Tu puntuación es 10';
    } else {
        const averageScore = (score / totalQuestions) * 10;
        resultText = 'Tu puntuación promedio es: ' + averageScore.toFixed(2);
    }
    document.getElementById('result').innerText = resultText;
}