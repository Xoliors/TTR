const respuestas = [
    60 + 10 + 30 + 60,  // Ejercicio 1
    100 + 50 + 10 + 60, // Ejercicio 2
    30 + 100 + 60 + 50, // Ejercicio 3
    10 + 30 + 10 + 30,  // Ejercicio 4
    50 + 60 + 100 + 60  // Ejercicio 5
];

const id_ejercicio = 32;
const maxIntentos = 5;
const today = new Date().toISOString().split("T")[0];

// Obtener o inicializar intentos diarios desde localStorage
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function verificarTodo() {
    if (globalAttempts >= maxIntentos) {
        Swal.fire({
            icon: 'error',
            title: '¡Sin intentos disponibles!',
            text: 'Ya has alcanzado el número máximo de intentos para hoy.',
            confirmButtonText: 'Aceptar'
        });
        bloquearInputs();
        return;
    }

    let correctos = 0;
    for (let i = 1; i <= 5; i++) {
        const userRespuesta = parseInt(document.getElementById('respuesta' + i).value);
        if (userRespuesta === respuestas[i - 1]) {
            correctos++;
        }
    }

    const calificacion = correctos * 2; // De 0 a 10
    const resultado = document.getElementById('resultadoGeneral');

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    fetch("/ejercicios_segundo/barras/guardar-calificacion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            intento: globalAttempts,
            calificacion: calificacion,
            id_ejercicio,
            fecha: today
        })
    });

    if (correctos === 5) {
        Swal.fire({
            icon: 'success',
            title: '¡Calificación registrada!',
            text: `Tu calificación fue de ${calificacion}/10.`,
            confirmButtonText: 'Aceptar'
        });
        resultado.innerHTML = `¡Excelente! 🎉 Respondiste todo correctamente.<br>Calificación: ${calificacion}/10`;
        resultado.style.color = "#01579b";
        document.getElementById("reiniciar").style.display = "none";
        bloquearInputs();
    } else {
        if (globalAttempts < maxIntentos) {
            Swal.fire({
                icon: 'info',
                title: '¡Puedes intentarlo de nuevo!',
                text: `Acertaste ${correctos} de 5. Tu calificación fue de ${calificacion}/10. Intento ${globalAttempts}/${maxIntentos}.`,
                confirmButtonText: 'OK'
            });
            resultado.innerHTML = `Acertaste ${correctos} de 5. 🙃<br>Calificación: ${calificacion}/10<br>Puedes intentar de nuevo. Intento ${globalAttempts}/${maxIntentos}`;
            resultado.style.color = "#01579b";
            document.getElementById("reiniciar").style.display = "inline-block";
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Último intento!',
                text: `Ya has usado todos tus intentos. Calificación final: ${calificacion}/10.`,
                confirmButtonText: 'Aceptar'
            });
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
