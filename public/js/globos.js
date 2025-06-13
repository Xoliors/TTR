function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let totalTables = getRandomInt(3, 8);
let totalBalloons;

// Aseguramos que totalBalloons sea múltiplo de totalTables para repartir igual
const minBalloons = 10;
const maxBalloons = 30;

do {
  totalBalloons = getRandomInt(minBalloons, maxBalloons);
} while (totalBalloons % totalTables !== 0);

const perTable = totalBalloons / totalTables;

const id_ejercicio = 25;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function createBalloons() {
  const container = document.getElementById("balloons");
  container.innerHTML = "";
  for (let i = 0; i < totalBalloons; i++) {
    const b = document.createElement("div");
    b.textContent = "🎈";
    b.className = "balloon";
    b.draggable = true;
    b.id = `balloon-${i}`;
    b.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.id);
    });
    container.appendChild(b);
  }
}

function createTables() {
  const container = document.getElementById("tables");
  container.innerHTML = "";
  for (let i = 0; i < totalTables; i++) {
    const t = document.createElement("div");
    t.className = "table";
    t.ondragover = e => e.preventDefault();
    t.ondrop = e => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text");
      const balloon = document.getElementById(data);
      if (!t.contains(balloon)) t.appendChild(balloon);
    };
    container.appendChild(t);
  }
}

document.getElementById("check").addEventListener("click", () => {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: 'Límite alcanzado',
      text: 'Ya has utilizado tus 5 intentos del día.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const tables = document.querySelectorAll(".table");
  let correctTables = 0;
  tables.forEach(t => {
    if (t.children.length === perTable) correctTables++;
  });

  const grade = (correctTables / totalTables) * 10;
  const fecha = today;

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  fetch("/ejercicios_segundo/globos/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  })
  .then(res => res.json())
  .then(() => {
    // Aquí se muestra la info en el div #message
    const msg = document.getElementById("message");
    msg.textContent = `Mesas correctas: ${correctTables} de ${totalTables}\n` +
                      `Tu calificación: ${grade.toFixed(1)} / 10\n` +
                      `Intento: ${globalAttempts} de 5`;

    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${grade.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(grade.toFixed(1));
    });
    
  })
  .catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
});

function retry() {
  createBalloons();
  createTables();
  document.getElementById("message").textContent = "";
  document.getElementById("result").textContent = "";
}

createBalloons();
createTables();

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