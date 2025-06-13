const id_ejercicio = 35;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const preguntas = [
  { mes: "Enero", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de Reyes y Año Nuevo" },
  { mes: "Febrero", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de San Valentín y Día de la Bandera" },
  { mes: "Marzo", pregunta: "¿Qué se celebra el 21 de marzo?", respuesta: "Natalicio de Benito Juárez" },
  { mes: "Abril", pregunta: "¿Qué celebraciones hay ?", respuesta: "Semana Santa y Día del Niño" },
  { mes: "Mayo", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día del Trabajo y Batalla de Puebla" },
  { mes: "Junio", pregunta: "¿Qué celebración familiar ocurre en junio?", respuesta: "Día del Padre" },
  { mes: "Julio", pregunta: "¿Qué ocurre en julio en las escuelas?", respuesta: "Vacaciones de Verano" },
  { mes: "Agosto", pregunta: "¿Qué ocurre en agosto en las escuelas?", respuesta: "Regreso a Clases" },
  { mes: "Septiembre", pregunta: "¿Qué celebramos el 16 de septiembre?", respuesta: "Día de la Independencia de México" },
  { mes: "Octubre", pregunta: "¿Qué se recuerda el 12 de octubre?", respuesta: "Descubrimiento de América" },
  { mes: "Noviembre", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de Muertos y Revolución Mexicana" },
  { mes: "Diciembre", pregunta: "¿Qué celebraciones hay ?", respuesta: "Noche Buena y Navidad" }
];

// Generar tarjetas del calendario
const calendario = document.getElementById("calendario");

preguntas.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "mes";
  div.innerHTML = `
    <h3>${item.mes}</h3>
    <div class="pregunta">${item.pregunta}</div>
    <div class="zona-respuesta" ondrop="soltar(event, ${index})" ondragover="permitirSoltar(event)" id="zona-${index}"></div>
  `;
  calendario.appendChild(div);
});

// Arrastrar
const respuestas = document.querySelectorAll(".respuesta");
respuestas.forEach(r => {
  r.ondragstart = e => {
    e.dataTransfer.setData("text", r.textContent);
  };
});

function permitirSoltar(e) {
  e.preventDefault();
}

function soltar(e, index) {
  e.preventDefault();
  const texto = e.dataTransfer.getData("text");
  const zona = document.getElementById(`zona-${index}`);
  if (zona.children.length === 0) {
    const nueva = document.createElement("div");
    nueva.className = "respuesta";
    nueva.textContent = texto;
    zona.appendChild(nueva);
    zona.setAttribute("data-user", texto);
  }
}

function calificar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Ya has usado tus 5 intentos de hoy. Vuelve mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let correctas = 0;
  preguntas.forEach((p, i) => {
    const zona = document.getElementById(`zona-${i}`);
    const resp = zona.getAttribute("data-user");
    zona.classList.remove("correcta", "incorrecta");
    if (resp === p.respuesta) {
      zona.classList.add("correcta");
      correctas++;
    } else {
      zona.classList.add("incorrecta");
    }
  });

  const nota = Math.round((correctas / preguntas.length) * 10);
  document.getElementById("resultado").textContent = `Obtuviste ${nota}/10`;
  document.getElementById("intentos").textContent = `Intento ${globalAttempts + 1} de 5`;

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  fetch("/ejercicios_segundo/calendario/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: nota,
      id_ejercicio,
      fecha: today
    })
  })
  .then(res => res.json())
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${nota}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(nota.toFixed(1));
    });
  })
  .catch(err => {
    console.error("Error al guardar calificación:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al guardar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
}

document.getElementById("reiniciar").addEventListener("click", () => {
  preguntas.forEach((_, i) => {
    const zona = document.getElementById(`zona-${i}`);
    zona.innerHTML = "";
    zona.removeAttribute("data-user");
    zona.classList.remove("correcta", "incorrecta");
  });
  document.getElementById("resultado").textContent = "";
});

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