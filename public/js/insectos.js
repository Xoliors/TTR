const id_ejercicio = 36;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const totales = { abeja:22, catarina:33, caracol:15, mariposa:18, gusano:32 };
const pool = [
  ...Array(totales.abeja).fill('🐝'),
  ...Array(totales.catarina).fill('🐞'),
  ...Array(totales.caracol).fill('🐌'),
  ...Array(totales.mariposa).fill('🦋'),
  ...Array(totales.gusano).fill('🐛'),
];
// Mezclar emojis
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
      text: 'Ya no tienes más intentos por hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  let correctos = 0;
  const keys = ['abeja','catarina','caracol','mariposa','gusano'];
  keys.forEach((k, i) => {
    const v = +document.getElementById('c' + (i + 1)).value;
    const ok = v === totales[k];
    document.getElementById('check' + (i + 1)).textContent = ok ? '✔️' : '❌';
    if (ok) correctos++;
  });

  const maxIn = keys.find(k => totales[k] === Math.max(...Object.values(totales)));
  const minIn = keys.find(k => totales[k] === Math.min(...Object.values(totales)));
  const totalAll = Object.values(totales).reduce((a, b) => a + b, 0);
  const sumGusCata = totales.gusano + totales.catarina;
  const sumGusMar = totales.gusano + totales.mariposa;

  const answers = [
    r1.value.toLowerCase() === maxIn,
    r2.value.toLowerCase() === minIn,
    +r3.value === totales.caracol,
    r4.value === (totales.mariposa > totales.abeja ? 'sí' : 'no'),
    +r5.value === totalAll,
    +r6.value === sumGusCata,
    r7.value === (totales.mariposa > totales.caracol ? 'sí' : 'no'),
    +r8.value === sumGusMar,
    r9.value === (totales.gusano > totales.abeja ? 'sí' : 'no')
  ];
  answers.forEach((ok, i) => {
    document.getElementById('check' + (6 + i)).textContent = ok ? '✔️' : '❌';
    if (ok) correctos++;
  });

  const nota = (correctos / 14) * 10;
  document.getElementById('nota').textContent = `Tu calificación: ${nota.toFixed(1)} / 10`;
  document.getElementById('reinBtn').style.display = 'inline-block';

  // Enviar calificación
  fetch('/ejercicios_segundo/insectos/guardar-calificacion', {
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
  .then(response => {
    if (!response.ok) throw new Error('Error al guardar calificación');
    return response.json();
  })
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${nota.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
            mostrarMensajeMotivacional(nota.toFixed(1));
        });
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar tu calificación.',
      confirmButtonText: 'Cerrar'
    });
    console.error(error);
  });

  if (globalAttempts >= 5) {
    document.getElementById('verifBtn').disabled = true;
  }
}

function reiniciar() {
  if (globalAttempts >= 5) return;

  for (let i = 1; i <= 14; i++) {
    document.getElementById('check' + i).textContent = '';
  }
  ['c1','c2','c3','c4','c5','r1','r2','r3','r4','r5','r6','r7','r8','r9']
    .forEach(id => document.getElementById(id).value = '');
  document.getElementById('nota').textContent = '';
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
