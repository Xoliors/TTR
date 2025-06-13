const id_ejercicio = 36;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Resetear intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const totales = { abeja: 92, catarina: 103, caracol: 95, mariposa: 113, gusano: 122, alacran: 65, arana: 35 };
    
// Equivalencias para aceptar variantes escritas
const normalizar = txt => txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const equivalencias = {
  abeja: ['abeja'],
  catarina: ['catarina', 'mariquita'],
  caracol: ['caracol'],
  mariposa: ['mariposa'],
  gusano: ['gusano'],
  alacran: ['alacran', 'escorpion'],
  arana: ['arana', 'araña']
};

// Mezclar emojis
const pool = [
  ...Array(totales.abeja).fill('🐝'),
  ...Array(totales.catarina).fill('🐞'),
  ...Array(totales.caracol).fill('🐌'),
  ...Array(totales.mariposa).fill('🦋'),
  ...Array(totales.gusano).fill('🐛'),
  ...Array(totales.alacran).fill('🦂'),
  ...Array(totales.arana).fill('🕷️')
];
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
pool.forEach(ico => {
  const span = document.createElement('span');
  span.textContent = ico;
  document.getElementById('insectos').appendChild(span);
});


function verificar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya has realizado los 5 intentos disponibles para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

 // Obtener referencias a inputs de preguntas abiertas
  const r1 = document.getElementById('r1');
  const r2 = document.getElementById('r2');
  const r3 = document.getElementById('r3');
  const r4 = document.getElementById('r4');
  const r5 = document.getElementById('r5');
  const r6 = document.getElementById('r6');
  const r7 = document.getElementById('r7');
  const r8 = document.getElementById('r8');
  const r9 = document.getElementById('r9');

  let correctos = 0;
  const keys = ['abeja', 'catarina', 'caracol', 'mariposa', 'gusano', 'alacran', 'arana'];

  // Verificar conteos
  keys.forEach((k, i) => {
    const v = +document.getElementById('c' + (i+1)).value;
    const ok = v === totales[k];
    const span = document.getElementById('check' + (i+1));
    span.textContent = ok ? '✔️' : '❌';
    span.style.color = ok ? 'green' : 'red';
    if (ok) correctos++;
  });

  // Cálculos auxiliares
  const maxIn = keys.find(k => totales[k] === Math.max(...Object.values(totales)));
  const minIn = keys.find(k => totales[k] === Math.min(...Object.values(totales)));
  const totalAll = Object.values(totales).reduce((a, b) => a + b, 0);
  const sumCaraCata = totales.caracol + totales.catarina;
  const sumGusMar = totales.gusano + totales.mariposa;
  const sumGusAla = totales.gusano + totales.alacran;

// Respuestas a preguntas
  const respuestasPreg = [
    equivalencias[maxIn].includes(normalizar(r1.value.trim())),
    equivalencias[minIn].includes(normalizar(r2.value.trim())),
    +r3.value === sumCaraCata,
    r4.value === (totales.mariposa > totales.abeja ? 'sí' : 'no'),
    +r5.value === totalAll,
    +r6.value === sumGusAla,
    r7.value === (totales.mariposa > totales.caracol ? 'sí' : 'no'),
    +r8.value === sumGusMar,
    r9.value === (totales.gusano > totales.abeja ? 'sí' : 'no')
  ];

  respuestasPreg.forEach((ok, idx) => {
    const span = document.getElementById('check' + (8 + idx));
    span.textContent = ok ? '✔️' : '❌';
    span.style.color = ok ? 'green' : 'red';
    if (ok) correctos++;
  });


  const nota = (correctos / 16) * 10;
  document.getElementById('nota').textContent = `Tu calificación: ${nota.toFixed(1)} / 10`;
   // Manejo de intentos
  document.getElementById('reinBtn').style.display = 'inline-block';
  if (globalAttempts >= 5) {
    document.getElementById('verifBtn').disabled = true;
  }


  fetch('/ejercicios_tercero/insectos3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: nota.toFixed(1),
      id_ejercicio,
      fecha: today
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject('Error al guardar calificación'))
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${nota.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(nota.toFixed(1));
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