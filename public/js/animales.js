const id_ejercicio = 37;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const animales = ['🐅','🐢','🐍','🦉','🦅','🐒','🦇','🐙','🐬','🦈','🐊','🦍','🦒','🦏','🦘','🐘','🐋'];
const nombresAnimales = {
  '🐅': 'tigre', '🐢': 'tortuga', '🐍': 'serpiente', '🦉': 'búho', '🦅': 'águila', '🐒': 'mono',
  '🦇': 'murciélago', '🐙': 'pulpo', '🐬': 'delfín', '🦈': 'tiburón', '🐊': 'cocodrilo',
  '🦍': 'gorila', '🦒': 'jirafa', '🦏': 'rinoceronte', '🦘': 'canguro', '🐘': 'elefante', '🐋': 'ballena'
};
const animalHead = document.getElementById("animal-head");
const animalData = document.getElementById("animal-data");
const conteos = {};
let totalAnimales = 0;

function makeTally(n) {
  let s = "";
  for (let i = 1; i <= n; i++) {
    s += "|";
    if (i % 5 === 0 && i < n) s += " ";
  }
  return s;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarConteos() {
  let max = 20;
  let min = 1;
  let numbers = [];
  for (let i = 0; i < animales.length; i++) {
    let count = randInt(min, max);
    while (numbers.includes(count)) {
      count = randInt(min, max);
    }
    numbers.push(count);
    conteos[animales[i]] = count;
  }
}

generarConteos();

animales.forEach(animal => {
  const th = document.createElement("th");
  th.textContent = animal;
  animalHead.appendChild(th);

  const td = document.createElement("td");
  const count = conteos[animal];
  td.textContent = makeTally(count);
  td.className = "tally";
  animalData.appendChild(td);

  totalAnimales += count;
});

let masPopular = animales[0];
animales.forEach(animal => {
  if (conteos[animal] > conteos[masPopular]) masPopular = animal;
});

const chocolate = randInt(10, 30);
const vainilla = randInt(10, 30);
const frutilla = randInt(10, 30);

document.getElementById("chocolate").textContent = makeTally(chocolate);
document.getElementById("vainilla").textContent = makeTally(vainilla);
document.getElementById("frutilla").textContent = makeTally(frutilla);

function verificar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos',
      text: 'Ya has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    document.getElementById("btn-verificar").disabled = true;
    document.getElementById("btn-intentar").disabled = true;
    return;
  }

  const respuestas = {
    "total": totalAnimales,
    "mas_popular": nombresAnimales[masPopular],
    "delfín": conteos['🐬'],
    "mono": conteos['🐒'],
    "tigre": conteos['🐅'],
    "búho": conteos['🦉'],
    "elefante": conteos['🐘'],
    "gorila": conteos['🦍'],
    "serpiente": conteos['🐍'],
    "chocolate": chocolate,
    "vainilla": vainilla,
    "frutilla": frutilla
  };

  let aciertos = 0;

  for (const key in respuestas) {
    let input = document.querySelector(`[data-preg="${key}"]`);
    let valor = input.value.trim();
    if (key === "mas_popular" || key === "total") {
      if (valor.toLowerCase() === respuestas[key].toString().toLowerCase()) {
        aciertos++;
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
      }
    } else {
      if (parseInt(valor) === respuestas[key]) {
        aciertos++;
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
      }
    }
  }

  const calificacion = (aciertos / 12) * 10;
  document.getElementById("resultado").textContent = `Tu calificación es: ${calificacion.toFixed(2)}`;

  // Incrementa y guarda el intento
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  fetch("/ejercicios_segundo/animales/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(2),
      id_ejercicio,
      fecha: today
    })
  })
  .then(res => res.json())
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion.toFixed(2)}/10.`,
      confirmButtonText: 'Aceptar'
    });
  });

  document.getElementById("btn-verificar").style.display = "none";
  document.getElementById("btn-intentar").style.display = "inline";
}

function intentarDeNuevo() {
  document.getElementById("btn-verificar").style.display = "inline";
  document.getElementById("btn-intentar").style.display = "none";
  document.getElementById("resultado").textContent = "";
}
