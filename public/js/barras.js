const respuestas = [
    60 + 10 + 30 + 60,  // Ejercicio 1
    100 + 50 + 10 + 60, // Ejercicio 2
    30 + 100 + 60 + 50, // Ejercicio 3
    10 + 30 + 10 + 30,  // Ejercicio 4
    50 + 60 + 100 + 60  // Ejercicio 5
];

let intentos = 0;
const maxIntentos = 5;

function verificarTodo() {
    let correctos = 0;
    for (let i = 1; i <= 5; i++) {
        const userRespuesta = parseInt(document.getElementById('respuesta' + i).value);
        if (userRespuesta === respuestas[i - 1]) {
            correctos++;
        }
    }

    const resultado = document.getElementById('resultadoGeneral');
    const calificacion = correctos * 2; // Cada correcta vale 2 puntos (2x5 = 10)

    if (correctos === 5) {
        resultado.innerHTML = `¡Excelente! 🎉 Respondiste todo correctamente.<br>Calificación: ${calificacion}/10`;
        resultado.style.color = "#01579b";
        document.getElementById("reiniciar").style.display = "none";
    } else {
        intentos++;
        if (intentos < maxIntentos) {
            resultado.innerHTML = `Acertaste ${correctos} de 5. 🙃<br>Calificación: ${calificacion}/10<br>Puedes intentar de nuevo. Intento ${intentos}/${maxIntentos}`;
            resultado.style.color = "#01579b";
            document.getElementById("reiniciar").style.display = "inline-block";
        } else {
            resultado.innerHTML = `Ya has usado todos tus intentos. 😢<br>Calificación final: ${calificacion}/10`;
            resultado.style.color = "#01579b";
            document.getElementById("reiniciar").style.display = "none";
            bloquearInputs();
        }
    }
}

function reiniciar() {
    document.getElementById('resultadoGeneral').textContent = "";
    for (let i = 1; i <= 5; i++) {
        document.getElementById('respuesta' + i).value = "";
        document.getElementById('respuesta' + i).disabled = false;
    }
    document.getElementById("reiniciar").style.display = "none";
}

function bloquearInputs() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById('respuesta' + i).disabled = true;
    }
}