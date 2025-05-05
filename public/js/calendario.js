const preguntas = [
    { mes: "Enero", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de Reyes y Año Nuevo" },
    { mes: "Febrero", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de San Valentín y Día de la Bandera" },
    { mes: "Marzo", pregunta: "¿Qué se celebra el 21 de marzo?", respuesta: "Natalicio de Benito Juárez" },
    { mes: "Abril", pregunta: "¿Qué celebraciones hay ?", respuesta: "Semana Santa y Día del Niño" },
    { mes: "Mayo", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día del Trabajo y Batalla de Puebla" },
    { mes: "Junio", pregunta: "¿Qué celebración familiar ocurre en junio?", respuesta: "Día del Padre" },
    { mes: "Julio", pregunta: "¿Qué ocurre en julio en las escuelas?", respuesta: "Vacaciones de Verano" },
    { mes: "Agosto", pregunta: "¿Qué ocurre en agosto en las escuelas?", respuesta: "Regreso a Clases" },
    { mes: "Septiembre", pregunta: "¿Qué celebramos el 16 de septiembre?", respuesta: "Día de la Independencia de México" },
    { mes: "Octubre", pregunta: "¿Qué se recuerda el 12 de octubre?", respuesta: "Descubrimiento de América" },
    { mes: "Noviembre", pregunta: "¿Qué celebraciones hay ?", respuesta: "Día de Muertos y Revolución Mexicana" },
    { mes: "Diciembre", pregunta: "¿Qué celebraciones hay ?", respuesta: "Noche Buena y Navidad" }
  ];
  
  // Generar tarjetas del calendario
  const calendario = document.getElementById("calendario");
  
  preguntas.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "mes";
    div.innerHTML = `
      <h3>${item.mes}</h3>
      <div class="pregunta">${item.pregunta}</div>
      <div class="zona-respuesta" ondrop="soltar(event, ${index})" ondragover="permitirSoltar(event)" id="zona-${index}"></div>
    `;
    calendario.appendChild(div);
  });
  
  // Arrastrar
  const respuestas = document.querySelectorAll(".respuesta");
  respuestas.forEach(r => {
    r.ondragstart = e => {
      e.dataTransfer.setData("text", r.textContent);
    };
  });
  
  function permitirSoltar(e) {
    e.preventDefault();
  }
  
  function soltar(e, index) {
    e.preventDefault();
    const texto = e.dataTransfer.getData("text");
    const zona = document.getElementById(`zona-${index}`);
    if (zona.children.length === 0) {
      const nueva = document.createElement("div");
      nueva.className = "respuesta";
      nueva.textContent = texto;
      zona.appendChild(nueva);
      zona.setAttribute("data-user", texto);
    }
  }
  
  function calificar() {
    let correctas = 0;
    preguntas.forEach((p, i) => {
      const zona = document.getElementById(`zona-${i}`);
      const resp = zona.getAttribute("data-user");
      zona.classList.remove("correcta", "incorrecta");
      if (resp === p.respuesta) {
        zona.classList.add("correcta");
        correctas++;
      } else {
        zona.classList.add("incorrecta");
      }
    });
    const nota = Math.round((correctas / preguntas.length) * 10);
    document.getElementById("resultado").textContent = `Obtuviste ${nota}/10`;
  }