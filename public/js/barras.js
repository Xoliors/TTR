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
        }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
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
            })
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

function reiniciar() {
  ['c1','c2','c3','c4','c5','c6','c7','r1','r2','r3','r4','r5','r6','r7','r8','r9']
    .forEach(id => document.getElementById(id).value = '');
  for (let i = 1; i <= 16; i++) {
    const span = document.getElementById('check' + i);
    span.textContent = '';
    span.style.color = '';
  }
  document.getElementById('nota').textContent = '';
  document.getElementById('verifBtn').disabled = false;
  document.getElementById('reinBtn').style.display = 'none';
}

function mostrarMensajeMotivacional(calificacionRaw) {
  let calificacion = Number(calificacionRaw);
  let mensaje = "";

  const bajo = [
    "Te hace falta más práctica, ¡no te desanimes!",
    "Aún hay áreas que mejorar, sigue esforzándote.",
    "Estás comenzando, cada error es una oportunidad de aprender.",
    "No fue tu mejor intento, pero puedes mejorar mucho más.",
    "Sigue practicando, estás en el camino del aprendizaje.",
    "Con dedicación lo lograrás, ¡ánimo!",
    "Todavía no lo dominas, pero vas por buen camino.",
    "Este resultado es una base para seguir creciendo.",
    "Requiere más atención y práctica, no te rindas.",
    "Vuelve a intentarlo, cada paso cuenta."
  ];

  const medio = [
    "¡Estuviste cerca! Solo falta un poco más de práctica.",
    "Buen trabajo, sigue así y lo lograrás.",
    "¡Por poco! No te rindas, vas muy bien.",
    "Vas por buen camino, ¡ánimo!",
    "¡Casi lo consigues! Un poco más de esfuerzo y lo lograrás.",
    "Buen intento, no estás lejos del objetivo.",
    "Continúa así, tu esfuerzo está dando frutos.",
    "¡Sigue practicando! Estás muy cerca del 10.",
    "Buen desempeño, te falta poco para la perfección.",
    "¡Excelente progreso! No te detengas."
  ];

  const alto = [
    "¡Fabuloso! Estás haciendo un trabajo increíble.",
    "¡Lo lograste! Sigue así.",
    "¡Excelente resultado! Tu esfuerzo se nota.",
    "¡Perfecto! Se nota tu dedicación.",
    "¡Muy bien hecho! Continúa aprendiendo con entusiasmo.",
    "¡Genial! Estás dominando este tema.",
    "¡Brillante! Sigue manteniendo ese nivel.",
    "¡Orgulloso de tu progreso!",
    "¡Gran trabajo! Estás aprendiendo de forma excelente.",
    "¡Sigue así! El éxito es tuyo."
  ];

  if (calificacion >= 1 && calificacion <= 5) {
    mensaje = bajo[Math.floor(Math.random() * bajo.length)];
  } else if (calificacion >= 6 && calificacion <= 8) {
    mensaje = medio[Math.floor(Math.random() * medio.length)];
  } else if (calificacion >= 9 && calificacion <= 10) {
    mensaje = alto[Math.floor(Math.random() * alto.length)];
  } else {
    mensaje = "Calificación no válida.";
  }

  Swal.fire({
    icon: 'info',
    title: 'Resultado',
    text: mensaje,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,   // ← No cerrar al hacer clic fuera
    allowEscapeKey: false       // ← No cerrar al presionar Esc
  });
}