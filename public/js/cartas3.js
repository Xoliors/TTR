const id_ejercicio = 12;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;
const maxReintentos = 5;

// Reiniciar contador si es nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const animales = [
  "cebra.png", "loro.png", "jirafa.png", "tigre.png", "cocodrilo.png", 
  "venado.webp", "pulpo.png", "cheetah.png", "delfin.webp", "tiburon.webp", "mono.webp"
];

let collage = document.getElementById("collage");
let resultado = document.getElementById("resultado");
let ganadas = document.getElementById("ganadas");
let reiniciarBtn = document.getElementById("reiniciarBtn");
let intentosDiv = document.getElementById("intentos");

let aciertos = 0;
let intentos = 0;
let total = animales.length;
let tiempo = 180;
let reinicios = 0;

function actualizarIntentosRestantes() {
  intentosDiv.textContent = `Intentos de hoy: ${globalAttempts}/${maxReintentos}`;
}

function generarResta() {
  let a = Math.floor(Math.random() * (3000 - 50 + 1)) + 50;
  let b = Math.floor(Math.random() * (a - 50 + 1)) + 50;
  return { a, b, r: a - b };
}

function crearTarjeta(nombre) {
  const resta = generarResta();
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-front";
  const img = document.createElement("img");
  img.src = `/images/${nombre}`;
  img.alt = nombre;
  front.appendChild(img);

  const back = document.createElement("div");
  back.className = "card-back";
  const operacion = document.createElement("div");
  operacion.innerText = `${resta.a} - ${resta.b}`;
  const input = document.createElement("input");
  input.className = "sr";
  input.type = "number";
  const boton = document.createElement("button");
  boton.innerText = "Comprobar";
  boton.className = "bn";

  boton.onclick = () => {
    let respuesta = parseInt(input.value);
    if (respuesta === resta.r) {
      aciertos++;
      mostrarTarjetaGanada(nombre);
    }
    intentos++;
    card.remove();
    if (document.querySelectorAll(".card").length === 0) mostrarReinicio();
  };

  back.appendChild(operacion);
  back.appendChild(input);
  back.appendChild(boton);

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    card.classList.add("flipped");
  });

  collage.appendChild(card);
}

function mostrarTarjetaGanada(nombre) {
  const contenedor = document.createElement("div");
  contenedor.className = "tarjeta-ganada";
  const imagen = document.createElement("img");
  imagen.src = `/images/${nombre}`;
  imagen.alt = nombre;
  contenedor.appendChild(imagen);
  ganadas.appendChild(contenedor);
}

function actualizarResultado() {
  const calificacion = ((aciertos / total) * 10).toFixed(1);
  resultado.textContent = `Calificación: ${calificacion}/10`;

  // Guardar en servidor
  fetch("/ejercicios_tercero/cartas3/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: parseFloat(calificacion),
      id_ejercicio,
      fecha: today
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion}/10.`,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,   // ← No cerrar al hacer clic fuera
      allowEscapeKey: false       // ← No cerrar al presionar Esc
    }).then(() => {
      mostrarMensajeMotivacional(calificacion);
    });
    if (globalAttempts >= 5) {
      document.getElementById('verifBtn').disabled = true;
    }
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err,
      confirmButtonText: 'Aceptar'
    });
  });
}

function iniciarTemporizador() {
  let intervalo = setInterval(() => {
    let min = Math.floor(tiempo / 60);
    let seg = tiempo % 60;
    document.getElementById("timer").textContent = `Tiempo: ${min}:${seg < 10 ? '0' : ''}${seg}`;
    if (tiempo <= 0 || document.querySelectorAll(".card").length === 0) {
      clearInterval(intervalo);
      mostrarReinicio();
    }
    tiempo--;
  }, 1000);
}

function mostrarReinicio() {
  reiniciarBtn.style.display = reinicios < maxReintentos - 1 ? "inline-block" : "none";
  actualizarResultado(); 
}

function iniciarEjercicio() {
  if (globalAttempts >= maxReintentos) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  actualizarIntentosRestantes();

  animales.forEach(nombre => crearTarjeta(nombre));
  iniciarTemporizador();
}

function reiniciarEjercicio() {
  if (reinicios >= maxReintentos) return;
  reinicios++;
  aciertos = 0;
  intentos = 0;
  tiempo = 180;
  collage.innerHTML = "";
  ganadas.innerHTML = "";
  resultado.textContent = "Calificación: 0/10";
  reiniciarBtn.style.display = "none";
  iniciarEjercicio();
}

actualizarIntentosRestantes();
iniciarEjercicio();

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