function checkAnswers() {
    let score = 0;
    const answers = {
        input1: "pentagono",
        input2: "hexagono",
        input3: "rombo",
        input4: "heptagono",
        input5: "trapecio",
        input6: "octagono",
        input7: "rectangulo",
        input8: "cuadrado",
        input9: "triangulo"
    };

    const total = Object.keys(answers).length;
    for (let i = 1; i <= total; i++) {
        const input = document.getElementById(`input${i}`);
        let userAnswer = input.value.trim().toLowerCase();
        if (userAnswer === answers[`input${i}`]) score++;
    }

    const grade = (score / total) * 10;
    alert(`Aciertos: ${score} de ${total}\nTu calificación: ${grade.toFixed(1)} / 10`);
}