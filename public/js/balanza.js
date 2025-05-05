const pasos = [    
    { id1: "manzana", id2: "sandia", texto: "1. Arrastra la 🍎 Manzana y la 🍉 Sandía a los platos para pesarlas.", correcta: "derecha" },
    { id1: "mango", id2: "lapiz", texto: "2. Arrastra el 🥭 Mango y el ✏️ Lápiz   a los platos para pesarlos.", correcta: "izquierda" },
    { id1: "libro", id2: "trofeo", texto: "3. Arrastra el 📘 Libro y el 🏆 Trofeo para compararlos.", correcta: "izquierda" },
    { id1: "perro", id2: "pajaro", texto: "4. Compara el 🐦 Pájaro con el 🐶 Perro usando la balanza.", correcta: "derecha" },
    { id1: "vaca", id2: "puerco", texto: "5. Compara la 🐄 Vaca y el 🐖 Puerco para ver cuál pesa más.", correcta: "izquierda" },
    { id1: "caballo", id2: "camello", texto: "6. Arrastra el 🐎  Caballo y el 🐫 Camello a los platos para pesarlas.", correcta: "igual" },
    { id1: "gato", id2: "raton", texto: "7. Arrastra el 🐈 Gato y el 🐀 Ratón  a los platos para pesarlos.", correcta: "izquierda" },
    { id1: "persona", id2: "ballena", texto: "8. Arrastra la 🧍 Persona y la 🐋 Ballena para compararlos.", correcta: "derecha" },
    { id1: "elefante", id2: "auto", texto: "9. Compara el  🐘 Elefante con el 🚗 Auto usando la balanza.", correcta: "igual" },
    { id1: "kiwi", id2: "uvas", texto: "10. Compara el 🥝 Kiwi y las 🍇 Uvas para ver cuál pesa más.", correcta: "derecha" }
  ];

  let pasoActual = 0;
  let respuestas = [];

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev, side) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const objeto = document.getElementById(id);
    const peso = parseInt(objeto.getAttribute("data-peso"));
    const destino = document.getElementById(side === "left" ? "izquierda" : "derecha");

    if (destino.children.length <= 1) {
      destino.appendChild(objeto);
      pesos[side] = peso;
      actualizarBalanza();
    }
  }

  let pesos = { left: 0, right: 0 };

  function actualizarBalanza() {
    const diferencia = pesos.right - pesos.left;
    document.getElementById("balanza").style.transform = `rotate(${diferencia * 0.8}deg)`;
    document.getElementById("pesoLeft").innerText = `${pesos.left} kg`;
    document.getElementById("pesoRight").innerText = `${pesos.right} kg`;
  }

  function resetear() {
    const izq = document.getElementById("izquierda");
    const der = document.getElementById("derecha");
    const zona = document.getElementById("zona-objetos");

    [...izq.children, ...der.children].forEach(el => {
      if (el.classList.contains("objeto")) zona.appendChild(el);
    });

    pesos = { left: 0, right: 0 };
    document.getElementById("pesoLeft").innerText = "0 kg";
    document.getElementById("pesoRight").innerText = "0 kg";
    document.getElementById("balanza").style.transform = "rotate(0deg)";
  }

  function siguiente() {
    const resp = document.getElementById("respuesta").value;
    if (resp === "") {
      alert("Por favor selecciona una respuesta.");
      return;
    }

    respuestas[pasoActual] = resp;
    pasoActual++;

    if (pasoActual >= pasos.length) {
      mostrarResultado();
      return;
    }

    avanzarPaso();
  }

  function anterior() {
    if (pasoActual > 0) {
      pasoActual--;
      avanzarPaso();
    }
  }

  function avanzarPaso() {
    resetear();
    document.getElementById("respuesta").value = respuestas[pasoActual] || "";
    document.getElementById("instruccion").innerText = pasos[pasoActual].texto;
    document.getElementById("resultadoFinal").innerText = "";
  }

  function mostrarResultado() {
    let correctas = 0;
    for (let i = 0; i < pasos.length; i++) {
      if (respuestas[i] === pasos[i].correcta) {
        correctas++;
      }
    }
    const calificacion = (correctas / pasos.length) * 10;
    document.getElementById("resultadoFinal").innerText = `¡Terminaste! Tu calificación es: ${calificacion.toFixed(1)}/10`;
  }