const respuestas = {
    obj1: 'plana',
    obj2: 'curva',
    obj3: 'plana',
    obj4: 'plana',
    obj5: 'curva',
    obj6: 'curva',
    obj7: 'plana',
    obj8: 'curva',
    obj9: 'plana',
    obj10: 'curva'
  };

  const maxIntentos = 5;
  const id_ejercicio = 16;
  const ruta = '/ejercicios_numeros/clo/guardar-calificacion';

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  const today = new Date().toISOString().split('T')[0];
  
  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    // Al guardar
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  function crearObjetos() {
    const objetos = [
      { id: "obj1", img: "https://images.vexels.com/media/users/3/264723/isolated/preview/dd0ea3896edd75f54e62342f8e7e7d85-caja-de-carton-de-dibujos-animados.png" },
      { id: "obj2", img: "https://static.vecteezy.com/system/resources/previews/012/996/773/non_2x/sport-ball-football-free-png.png" },
      { id: "obj3", img: "https://images.freeimages.com/image/previews/5f8/education-book-cartoon-png-5690878.png" },
      { id: "obj4", img: "https://cdn-icons-png.flaticon.com/512/329/329783.png" },
      { id: "obj5", img: "https://png.pngtree.com/png-clipart/20230104/original/pngtree-empty-glass-cup-png-image_8870870.png" },
      { id: "obj6", img: "https://images.vexels.com/media/users/3/306160/isolated/preview/803bd5752e9227ba4ee9202802af2e5f-icono-de-trazo-de-bombilla-electrica.png" },
      { id: "obj7", img: "https://cdn-icons-png.flaticon.com/512/1438/1438713.png" },
      { id: "obj8", img: "https://cdn-icons-png.freepik.com/512/5266/5266272.png" },
      { id: "obj9", img: "https://png.pngtree.com/png-clipart/20241117/original/pngtree-ipad-tablet-cartoom-png-image_17166814.png" },
      { id: "obj10", img: "https://images.vexels.com/media/users/3/158112/isolated/preview/8e7df2770674be885c30fc2c46219836-icono-de-botella-de-agua-de-plastico.png" }
    ];

    const contenedor = document.getElementById("objetos");
    contenedor.innerHTML = "";
    objetos.sort(() => Math.random() - 0.5);

    objetos.forEach(obj => {
      const div = document.createElement("div");
      div.className = "objeto";
      div.id = obj.id;
      div.draggable = true;
      div.ondragstart = drag;

      const img = document.createElement("img");
      img.src = obj.img;

      div.appendChild(img);
      contenedor.appendChild(div);
    });
  }

  function allowDrop(ev) {
    if (globalAttempts >= maxIntentos) return;
    ev.preventDefault();
  }

  function drag(ev) {
    if (globalAttempts >= maxIntentos) return;
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    if (globalAttempts >= maxIntentos) return;
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const el = document.getElementById(data);
    if (el && ev.target.classList.contains("zona")) {
      ev.target.appendChild(el);
    }
  }

  function calificar() {
    if (globalAttempts >= maxIntentos) {
      Swal.fire({
        icon: 'warning',
        title: 'Límite de intentos alcanzado',
        text: 'Ya no tienes más intentos disponibles por hoy.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let correctos = 0;
    const total = Object.keys(respuestas).length;

    for (const [id, zona] of Object.entries(respuestas)) {
      const el = document.getElementById(id);
      if (el && el.parentElement.id === zona) {
        correctos++;
      }
    }

    let nota = (correctos / total) * 10;
    globalAttempts++;
    localStorage.setItem('globalAttempts', globalAttempts);

    const fecha = new Date().toISOString().split('T')[0];

    fetch(ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: nota.toFixed(1),
        id_ejercicio,
        fecha
      })
    })
    .then(res => res.json())
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${nota.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
            mostrarMensajeMotivacional(nota.toFixed(1));
        });

      document.getElementById("calificacion").textContent = `Intento ${globalAttempts}: Obtuviste ${nota.toFixed(1)} de 10`;

      if (globalAttempts < maxIntentos) {
        document.getElementById("intentarBtn").style.display = "block";
      } else {
        document.getElementById("calificarBtn").disabled = true;
        document.getElementById("intentarBtn").style.display = "none";
        document.getElementById("calificacion").textContent += "\nHas alcanzado el máximo de intentos.";
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la calificación. Intenta más tarde.',
        confirmButtonText: 'Aceptar'
      });
      console.error(error);
    });
  }

  function intentarDeNuevo() {
    if (globalAttempts >= maxIntentos) return;

    document.getElementById("plana").innerHTML = "<h3>Objetos con cara plana</h3>";
    document.getElementById("curva").innerHTML = "<h3>Objetos con cara curva</h3>";

    crearObjetos();
    document.getElementById("intentarBtn").style.display = "none";
    document.getElementById("calificacion").textContent = "";
  }

  window.onload = crearObjetos;

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

  const cero = [
  "Todos empezamos desde cero, lo importante es seguir intentando.",
  "No te preocupes, fallar es parte del proceso de aprender.",
  "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
  "¡No te rindas! Cada error te acerca más al acierto.",
  "Es solo el comienzo, lo importante es que sigas aprendiendo.",
  "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
  "Aprender toma tiempo, lo lograrás con práctica.",
  "Un tropiezo no define tu camino. ¡Ánimo!",
  "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
  "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 0 && calificacion < 6) {
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