const id_ejercicio = 30;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si la fecha es diferente
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

document.getElementById("attempts").innerText = `Intentos hoy: ${globalAttempts}/5`;

function verificar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el número máximo de intentos para hoy. Vuelve mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const respuestasCorrectas = [
    ['C', 9],
    ['B', 8],
    ['A', 6],
    ['C', 7],
    ['B', 4]
  ];

  const form = document.forms['formulario'];
  let aciertos = 0;

  for (let i = 1; i <= 5; i++) {
    let letra = form[`botella${i}`].value.toUpperCase();
    let litros = parseInt(form[`litros${i}`].value);
    if (letra === respuestasCorrectas[i - 1][0] && litros === respuestasCorrectas[i - 1][1]) {
      aciertos++;
    }
  }

  const calificacion = aciertos * 2;
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  document.getElementById('resultado').innerHTML = `Tu calificación es: ${calificacion} / 10<br>Intentos usados: ${globalAttempts}/5`;

  // Actualizar contador en pantalla
  document.getElementById("attempts").innerText = `Intentos hoy: ${globalAttempts}/5`;

  // Guardar calificación en backend
  fetch("/ejercicios_segundo/botellas/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Calificación registrada!',
          text: `Tu calificación fue de ${calificacion} / 10.`,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          mostrarMensajeMotivacional(calificacion.toFixed(1));
        });
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
    });

  // Mostrar botón reintentar si quedan intentos
  if (globalAttempts < 5) {
    document.getElementById('reintentar').style.display = 'inline-block';
  } else {
    document.getElementById('reintentar').style.display = 'none';
    // Opcional: deshabilitar botón verificar para que no puedan seguir intentando
    // document.querySelector("button.bn[onclick='verificar()']").disabled = true;
  }
}

function reiniciar() {
  document.getElementById('formulario').reset();
  document.getElementById('resultado').innerHTML = "";
  document.getElementById('reintentar').style.display = 'none';
}

// Event listener para el botón reintentar fijo
document.getElementById('reintentar').addEventListener('click', reiniciar);

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

  if (calificacion >= 0 && calificacion < 6) {
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