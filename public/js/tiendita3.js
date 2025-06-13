const MAX_ATTEMPTS = 5;
const id_ejercicio = 7;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si la fecha ha cambiado
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let productPrices = [];
let totalPrice = 0;
const productEmojis = ['💻', '📱', '🕰️', '🛌', '🛋️'];

function generateProducts() {
  productPrices = [];
  totalPrice = 0;
  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    let price = Math.floor(Math.random() * 500) + 1;
    while (totalPrice + price > 5000) {
      price = Math.floor(Math.random() * 500) + 1;
    }
    productPrices.push(price);
    totalPrice += price;

    productListDiv.innerHTML += `
      <div class="product-item">
        ${productEmojis[i]} <span>Precio: ${price} pesos</span>
      </div>
    `;
  }

  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("paymentInput").disabled = false;
  document.getElementById("changeInput").disabled = false;
  document.getElementById("resultText").textContent = '';
  document.getElementById("retryBtn").style.display = 'none';
}

function checkPayment() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const payment = parseInt(document.getElementById("paymentInput").value.trim());
  const expectedChange = payment - totalPrice;
  const change = parseInt(document.getElementById("changeInput").value.trim());

  let score = 0;

  if (payment >= totalPrice && change === expectedChange) {
    score = 10;
  } else if ((payment >= totalPrice && change !== expectedChange) || (payment < totalPrice && change === expectedChange)) {
    score = 5;
  } else {
    score = 0;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const attemptResult = `
    <div class="attempt-result">
      <strong>Intento ${globalAttempts}: ${score === 10 ? '✅ Correcto' : score === 5 ? '⚠️ Parcial' : '❌ Incorrecto'}</strong><br>
      Total a pagar: ${totalPrice} pesos.<br>
      Tú pagaste: ${payment} pesos.<br>
      Cambio correcto: ${expectedChange} pesos.<br><br>
      Calificación del intento: <strong>${score}</strong>
    </div>
  `;

  document.getElementById("attemptsResults").insertAdjacentHTML('beforeend', attemptResult);

  // Enviar resultado al servidor
  fetch('/ejercicios_tercero/La_tiendita3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha: today
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(score.toFixed(1));
    });
  });

  if (globalAttempts >= MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("paymentInput").disabled = true;
    document.getElementById("changeInput").disabled = true;
    document.querySelector("button").disabled = true;
  } else {
    document.getElementById("retryBtn").style.display = 'inline-block';
  }
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateProducts();
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("paymentInput").disabled = false;
    document.getElementById("changeInput").disabled = false;
    document.querySelector("button").disabled = false;
  }
}

generateProducts();


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