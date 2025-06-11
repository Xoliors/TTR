const id_ejercicio = 27;
  const today = new Date().toISOString().split("T")[0];
  const fecha = today;

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  // Reset diario
  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  function checkAnswers() {
    if (globalAttempts >= 5) {
      return Swal.fire({
        icon: 'error',
        title: '¡Has alcanzado el límite de intentos!',
        text: 'Inténtalo de nuevo mañana.',
        confirmButtonText: 'Aceptar'
      });
    }


    let score = 0;
    const answers = {
        input1: ["pentagono", "pentágono"],
        input2: ["hexagono", "hexágono"],
        input3: ["rombo"],
        input4: ["heptagono", "heptágono"],
        input5: ["trapecio"],
        input6: ["octagono", "octágono"],
        input7: ["rectangulo", "rectángulo"],
        input8: ["cuadrado"],
        input9: ["triangulo", "triángulo"]
    };


    const total = Object.keys(answers).length;

    for (let i = 1; i <= total; i++) {
      const input = document.getElementById(`input${i}`);
      let userAnswer = input.value.trim().toLowerCase();
      if (answers[`input${i}`].includes(userAnswer)) score++;
    }

    const grade = (score / total) * 10;
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    // Mostrar resultado en pantalla
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p>Calificación: <strong>${grade.toFixed(1)} / 10</strong></p>
      <p>Intentos usados: <strong>${globalAttempts}</strong> de 5</p>
    `;

    // Enviar datos al servidor
    fetch("/ejercicios_segundo/figuras/guardar-calificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: grade,
        id_ejercicio,
        fecha
      })
    });

    // Mostrar sweetalert
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${grade.toFixed(1)} / 10.`,
      confirmButtonText: 'Aceptar'
    });
  }

  function retry() {
    // Limpiar inputs
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`input${i}`).value = "";
    }
    // Limpiar resultados
    document.getElementById("result").innerHTML = "";
  }