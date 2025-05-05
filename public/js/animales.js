const animales = ['🐅','🐢','🐍','🦉','🦅','🐒','🦇','🐙','🐬','🦈','🐊','🦍','🦒','🦏','🦘','🐘','🐋'];
const nombresAnimales = {
  '🐅': 'tigre',
  '🐢': 'tortuga',
  '🐍': 'serpiente',
  '🦉': 'búho',
  '🦅': 'águila',
  '🐒': 'mono',
  '🦇': 'murciélago',
  '🐙': 'pulpo',
  '🐬': 'delfín',
  '🦈': 'tiburón',
  '🐊': 'cocodrilo',
  '🦍': 'gorila',
  '🦒': 'jirafa',
  '🦏': 'rinoceronte',
  '🦘': 'canguro',
  '🐘': 'elefante',
  '🐋': 'ballena'
};
const animalHead = document.getElementById("animal-head");
const animalData = document.getElementById("animal-data");
const conteos = {};
let totalAnimales = 0;
let intentos = 0;

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
  if (intentos >= 5) {
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
  intentos++;
  document.getElementById("btn-verificar").style.display = "none";
  document.getElementById("btn-intentar").style.display = "inline";
}

function intentarDeNuevo() {
  document.getElementById("btn-verificar").style.display = "inline";
  document.getElementById("btn-intentar").style.display = "none";
  document.getElementById("resultado").textContent = "";
  intentos = 0;
}