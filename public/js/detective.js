const MAX_INTENTOS = 5;
const today = new Date().toISOString().split('T')[0];
let intentos = parseInt(localStorage.getItem("intentos_detective")) || 0;
let lastAttemptDate = localStorage.getItem("intentos_date_detective") || today;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  intentos = 0;
  localStorage.setItem("intentos_detective", intentos);
  localStorage.setItem("intentos_date_detective", today);
}

const respuestasCorrectas = [8, 19, 17, 11, 22];

function permitirDrop(ev) { ev.preventDefault(); }

function iniciarArrastre(ev) {
  ev.dataTransfer.setData("src", ev.target.src);
}

function soltar(ev, zonaId) {
  if (intentos >= MAX_INTENTOS) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya has realizado el número máximo de intentos hoy. Inténtalo de nuevo mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
  ev.preventDefault();
  const src = ev.dataTransfer.getData("src");
  const img = document.createElement("img");
  img.src = src;
  img.className = "item-img";
  document.getElementById(zonaId).appendChild(img);
}

function eliminarUltimo(zonaId) {
  const zona = document.getElementById(zonaId);
  if (zona.lastChild) zona.removeChild(zona.lastChild);
}

function verificarTodo() {
  if (intentos >= MAX_INTENTOS) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'No puedes intentar más hoy. Inténtalo de nuevo mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  intentos++;
  localStorage.setItem("intentos_detective", intentos);
  localStorage.setItem("intentos_date_detective", today);

  let correctos = 0;

  for (let i = 1; i <= 5; i++) {
    const zona = document.getElementById("zona" + i);
    const respuesta = parseInt(document.getElementById("respuesta" + i).value);
    const cantidadEsperada = respuestasCorrectas[i - 1];
    let aciertos = 0;

    if (zona.childElementCount === cantidadEsperada) aciertos++;
    if (respuesta === cantidadEsperada) aciertos++;

    correctos += aciertos;
    document.getElementById("feedback" + i).textContent = (aciertos === 2) ? "✅" : "❌";
  }

  document.getElementById("resultado").textContent = `Intento #${intentos}: Calificación = ${correctos}/10.`;

  // Guardar calificación en backend
  const id_ejercicio = 10;
  const fecha = today;

  fetch("/ejercicios_numeros/detective/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: intentos,
      calificacion: correctos,
      id_ejercicio,
      fecha
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Error al guardar la calificación');
      });
    }
    return response.json();
  })
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${correctos}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(correctos.toFixed(1));
    }).then(() => {
      // Mostrar botón reintentar solo si ya hay intentos y no se alcanzó el límite
      if (intentos > 0 && intentos < MAX_INTENTOS) {
        document.getElementById("retryBtn").style.display = 'inline-block';
      } else {
        document.getElementById("retryBtn").style.display = 'none';
        if (intentos >= MAX_INTENTOS) bloquearTodo();
      }
    });
  })
  .catch(error => {
    console.error('Error:', error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      if (intentos > 0 && intentos < MAX_INTENTOS) {
        document.getElementById("retryBtn").style.display = 'inline-block';
      } else {
        document.getElementById("retryBtn").style.display = 'none';
      }
    });
  });
}

function reiniciarEjercicios() {
  if (intentos >= MAX_INTENTOS) {
    Swal.fire({
      icon: 'info',
      title: 'Límite de intentos alcanzado',
      text: 'No puedes intentar de nuevo hasta mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  for (let i = 1; i <= 5; i++) {
    const zona = document.getElementById("zona" + i);
    while (zona.firstChild) {
      zona.removeChild(zona.firstChild);
    }
    document.getElementById("respuesta" + i).value = "";
    document.getElementById("feedback" + i).textContent = "";
  }

  document.getElementById("resultado").textContent = "";
  document.getElementById("retryBtn").style.display = 'none';
}

function bloquearTodo() {
  document.querySelectorAll(".item-img").forEach(el => el.setAttribute("draggable", false));
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
  document.querySelectorAll("input.resultado").forEach(input => input.disabled = true);

  document.getElementById("resultado").textContent += " Has alcanzado el máximo de intentos. Ejercicio finalizado.";
  document.getElementById("retryBtn").style.display = 'none';
}

// Inicializar estado del botón retry al cargar
window.onload = function() {
  if (intentos > 0 && intentos < MAX_INTENTOS) {
    document.getElementById("retryBtn").style.display = 'inline-block';
  } else {
    document.getElementById("retryBtn").style.display = 'none';
  }
};

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