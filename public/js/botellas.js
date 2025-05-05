let intentos = 0;

function verificar() {
  if (intentos >= 5) {
    document.getElementById('resultado').innerHTML = "Máximo de intentos alcanzado.";
    return;
  }
  intentos++;
  
  let respuestasCorrectas = [
    ['C', 9],
    ['B', 8],
    ['A', 6],
    ['C', 7],
    ['B', 4]
  ];

  let form = document.forms['formulario'];
  let aciertos = 0;

  for (let i = 1; i <= 5; i++) {
    let letra = form['botella' + i].value.toUpperCase();
    let litros = parseInt(form['litros' + i].value);
    if (letra === respuestasCorrectas[i-1][0] && litros === respuestasCorrectas[i-1][1]) {
      aciertos++;
    }
  }

  let calificacion = (aciertos * 2);
  document.getElementById('resultado').innerHTML = `Tu calificación es: ${calificacion} / 10<br>
  Intentos usados: ${intentos}/5`;

  if (intentos < 5) {
    document.getElementById('resultado').innerHTML += `<br><button class="bn" onclick="reiniciar()">Intentar de nuevo</button>`;

  }
}

function reiniciar() {
  document.getElementById('formulario').reset();
  document.getElementById('resultado').innerHTML = "";
}