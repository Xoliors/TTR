const MAX_ATTEMPTS = 5;
let globalAttempts = 0;
let correctAnswers = 0;
let productPrices = [];
let totalPrice = 0;

// Lista de productos con sus respectivas imágenes
const productData = [
  { img: 'https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-cartoon-style-banana-fruit-vector-png-image_12540774.png' },
  { img: 'https://static.vecteezy.com/system/resources/thumbnails/036/443/880/small/cute-egg-illustration-free-png.png' },
  { img: 'https://cdn-icons-png.flaticon.com/256/8396/8396517.png' },
  { img: 'https://images.vexels.com/media/users/3/254185/isolated/preview/bdb081449443b1729a9d10b0e96d7a08-dibujos-animados-de-caracter-de-comida-de-pan-feliz.png' },
  { img: 'https://static.vecteezy.com/system/resources/previews/009/665/821/non_2x/colorful-cute-cartoon-vegetable-broccoli-free-png.png' },
];

// Genera los productos con precios aleatorios entre 1 y 200, pero que la suma no exceda 1000
function generateProducts() {
  productPrices = [];
  totalPrice = 0;
  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = '';

  // Genera 5 precios aleatorios, asegurándose de que la suma no supere 1000
  for (let i = 0; i < 5; i++) {
    let price = Math.floor(Math.random() * 200) + 1; // Precio aleatorio entre 1 y 200
    while (totalPrice + price > 1000) {  // Si la suma total supera 1000, genera otro precio
      price = Math.floor(Math.random() * 200) + 1;
    }
    productPrices.push(price);
    totalPrice += price;

    productListDiv.innerHTML += `
      <div class="product-item">
        <img src="${productData[i].img}" alt="Producto ${i + 1}">
        <span>Precio: ${price} pesos</span>
      </div>
    `;
  }

  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("paymentInput").disabled = false;
  document.getElementById("changeInput").disabled = false;
  document.getElementById("resultText").textContent = '';
  document.getElementById("retryBtn").style.display = 'none';
}

// Verifica el pago y el cambio
function checkPayment() {
  const payment = parseInt(document.getElementById("paymentInput").value.trim());
  const expectedChange = payment - totalPrice;
  const change = parseInt(document.getElementById("changeInput").value.trim());

  let score = 0;

  if (payment >= totalPrice && change === expectedChange) {
    score = 10; // Ambas respuestas correctas
  } else if ((payment >= totalPrice && change !== expectedChange) || (payment < totalPrice && change === expectedChange)) {
    score = 5; // Una respuesta correcta
  } else {
    score = 0; // Ambas respuestas incorrectas
  }

  globalAttempts++;

  // Mostrar resultado del intento
  const attemptResult = `
    <div class="attempt-result">
      <strong>Intento ${globalAttempts}: ${score === 10 ? '✅ Correcto' : score === 5 ? '⚠️ Parcial' : '❌ Incorrecto'}</strong><br>
      Total a pagar: ${totalPrice} pesos.<br>
      Tú pagaste: ${payment} pesos.<br>
      Cambio correcto: ${expectedChange} pesos.<br><br>
      Calificación del intento: <strong>${score}</strong>
    </div>
  `;

  // Añadir el resultado al contenedor de intentos sin sobrescribir el contenido anterior
  const attemptsContainer = document.getElementById("attemptsResults");
  attemptsContainer.insertAdjacentHTML('beforeend', attemptResult);

  // Si ya se hicieron 5 intentos, no permitir más intentos
  if (globalAttempts >= MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("paymentInput").disabled = true;
    document.getElementById("changeInput").disabled = true;
    document.querySelector("button").disabled = true;  // Desactivar el botón "Verificar Pago"
  } else {
    document.getElementById("retryBtn").style.display = 'inline-block';
  }
}

// Vuelve a habilitar las entradas para un nuevo intento
function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateProducts();
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("paymentInput").disabled = false;
    document.getElementById("changeInput").disabled = false;
    document.querySelector("button").disabled = false;  // Habilitar el botón "Verificar Pago"
  }
}

// Inicializar el juego
generateProducts();