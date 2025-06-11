const animales = ['🐅','🐢','🐍','🦉','🦅','🐒','🦇','🐙','🐬','🦈','🐊','🦍','🦒','🦏','🦘','🐘','🐋'];
const nombresAnimales = {
  '🐅': 'tigre', '🐢': 'tortuga', '🐍': 'serpiente', '🦉': 'búho', '🦅': 'águila',
  '🐒': 'mono', '🦇': 'murciélago', '🐙': 'pulpo', '🐬': 'delfín', '🦈': 'tiburón',
  '🐊': 'cocodrilo', '🦍': 'gorila', '🦒': 'jirafa', '🦏': 'rinoceronte',
  '🦘': 'canguro', '🐘': 'elefante', '🐋': 'ballena'
};
const animalHead = document.getElementById("animal-head");
const animalData = document.getElementById("animal-data");
const conteos = {};
let totalAnimales = 0;

const id_ejercicio = 37;
const ruta = '/ejercicios_tercero/animales3/guardar-calificacion';
const maxIntentos = 5;

// Manejo de intentos con localStorage
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

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
  let numbers = [];
  for (let i = 0; i < animales.length; i++) {
    let count = randInt(10, 50);
    while (numbers.includes(count)) {
      count = randInt(10, 50);
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
  td.textContent = makeTally(conteos[animal]);
  td.className = "tally";
  animalData.appendChild(td);

  totalAnimales += conteos[animal];
});

let masPopular = animales[0];
animales.forEach(animal => {
  if (conteos[animal] > conteos[masPopular]) masPopular = animal;
});

const chocolate = randInt(10, 80);
const vainilla = randInt(10, 80);
const frutilla = randInt(10, 80);

document.getElementById("chocolate").textContent = makeTally(chocolate);
document.getElementById("vainilla").textContent = makeTally(vainilla);
document.getElementById("frutilla").textContent = makeTally(frutilla);

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'error',
      title: '¡Has alcanzado el número máximo de intentos!',
      text: 'Vuelve mañana para intentarlo de nuevo.',
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
  const fecha = new Date().toISOString().split('T')[0];

  // Llamar a la retroalimentación motivacional
  mostrarMensajeMotivacional(calificacion);

  // Enviar datos al servidor
  fetch(ruta, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts + 1,
      calificacion: calificacion.toFixed(2),
      id_ejercicio,
      fecha
    })
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${calificacion.toFixed(2)}/10.`,
    confirmButtonText: 'Aceptar'
  });

  globalAttempts++;
  localStorage.setItem('globalAttempts', globalAttempts);
  localStorage.setItem('lastAttemptDate', today);

  document.getElementById("resultado").textContent = `Tu calificación es: ${calificacion.toFixed(2)}`;
  document.getElementById("btn-verificar").style.display = "none";
  document.getElementById("btn-intentar").style.display = "inline";
}

function intentarDeNuevo() {
  document.getElementById("btn-verificar").style.display = "inline";
  document.getElementById("btn-intentar").style.display = "none";
  document.getElementById("resultado").textContent = "";

  document.querySelectorAll("input").forEach(input => {
    input.value = "";
    input.style.borderColor = "";
  });
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