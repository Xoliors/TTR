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