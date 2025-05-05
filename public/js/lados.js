function checkAnswers() {
    let score = 0;
    const answers = {
        input1: "5",
        input2: "6",
        input3: "4",
        input4: "7",
        input5: "4",
        input6: "8",
        input7: "4",
        input8: "4",
        input9: "3"
    };

    const total = Object.keys(answers).length;
    for (let i = 1; i <= total; i++) {
        const input = document.getElementById(`input${i}`);
        let userAnswer = input.value.trim();
        if (userAnswer === answers[`input${i}`]) score++;
    }

    const grade = (score / total) * 10;
    document.getElementById('feedback').innerText =
        `Aciertos: ${score} de ${total}\nCalificación: ${grade.toFixed(1)} / 10`;
}