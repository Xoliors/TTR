let id_ejercicio = 31;
let today = new Date().toISOString().split("T")[0];
let fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Resetear intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Mostrar intentos al cargar
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("intentos").textContent = `Intentos: ${globalAttempts}/5`;
});

const colores = {
  circulo: 'red',
  rect: 'green',
  cuadrado: 'blue',
  triangulo: 'orange'
};

// Generar partes del círculo
const circleGroup = document.getElementById('circleParts');
for (let i = 0; i < 8; i++) {
  const angle1 = (i * 2 * Math.PI) / 8;
  const angle2 = ((i + 1) * 2 * Math.PI) / 8;
  const x1 = 100 + 100 * Math.cos(angle1);
  const y1 = 100 + 100 * Math.sin(angle1);
  const x2 = 100 + 100 * Math.cos(angle2);
  const y2 = 100 + 100 * Math.sin(angle2);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`);
  path.setAttribute("fill", "white");
  path.setAttribute("stroke", "black");
  path.classList.add("figura");
  path.addEventListener("click", () => {
    path.setAttribute("fill", colores.circulo);
  });
  circleGroup.appendChild(path);
}

// Rectángulo dividido en 16
const rectGroup = document.getElementById('rectParts');
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", j * 50);
    rect.setAttribute("y", i * 25);
    rect.setAttribute("width", 50);
    rect.setAttribute("height", 25);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", "black");
    rect.classList.add("figura");
    rect.addEventListener("click", () => {
      rect.setAttribute("fill", colores.rect);
    });
    rectGroup.appendChild(rect);
  }
}

// Cuadrado dividido en 4
const squareGroup = document.getElementById('squareParts');
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", j * 100);
    rect.setAttribute("y", i * 100);
    rect.setAttribute("width", 100);
    rect.setAttribute("height", 100);
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", "black");
    rect.classList.add("figura");
    rect.addEventListener("click", () => {
      rect.setAttribute("fill", colores.cuadrado);
    });
    squareGroup.appendChild(rect);
  }
}

// Triángulos
document.getElementById("tri-left").addEventListener("click", () => {
  document.getElementById("tri-left").setAttribute("fill", colores.triangulo);
});
document.getElementById("tri-right").addEventListener("click", () => {
  document.getElementById("tri-right").setAttribute("fill", colores.triangulo);
});

function contarColoreados(g, color) {
  let count = 0;
  const children = g.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].getAttribute("fill") === color) count++;
  }
  return count;
}

function verificarFracciones() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const circleColoreados = contarColoreados(document.getElementById("circleParts"), colores.circulo);
  const rectColoreados = contarColoreados(document.getElementById("rectParts"), colores.rect);
  const squareColoreados = contarColoreados(document.getElementById("squareParts"), colores.cuadrado);

  const tri1 = document.getElementById("tri-left").getAttribute("fill");
  const tri2 = document.getElementById("tri-right").getAttribute("fill");
  const triColoreados = (tri1 === colores.triangulo) + (tri2 === colores.triangulo);

  const aciertos = (circleColoreados === 5) + (rectColoreados === 9) + (squareColoreados === 2) + (triColoreados === 1);

  const resultado = document.getElementById("resultado");
  const calificacion = document.getElementById("calificacion");

  resultado.textContent = aciertos === 4
    ? "¡Correcto! Todas las fracciones están bien coloreadas."
    : "Algunas fracciones están mal coloreadas.";

  resultado.style.color = aciertos === 4 ? "green" : "red";
  calificacion.textContent = `Calificación: ${aciertos * 2.5}/10`;

  // Actualizar contador de intentos
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  document.getElementById("intentos").textContent = `Intentos: ${globalAttempts}/5`;

  // Enviar datos al servidor
  fetch("/ejercicios_tercero/fracciones/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: aciertos*2.5,
      id_ejercicio,
      fecha
    })
  }).then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${aciertos*2.5}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(aciertos*2.5.toFixed(1));
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la calificación',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

function reiniciarEjercicio() {
  location.reload();
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