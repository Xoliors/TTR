let intentos = 0;
        const maxIntentos = 5;
        const textosOriginalesDrop = {};
    
        window.onload = () => {
            // Guardar el contenido original de cada drop-area
            const drops = document.querySelectorAll('.drop-area');
            drops.forEach(drop => {
                textosOriginalesDrop[drop.id] = drop.innerHTML;
            });
            actualizarIntentos();
        };
    
        function allowDrop(event) {
            event.preventDefault();
        }
    
        function drag(event) {
            event.dataTransfer.setData("text", event.target.id);
        }
    
        function drop(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var droppedElement = document.getElementById(data);
            var dropTarget = event.target;
    
            // Asegurarse de soltar sobre una zona válida
            if (dropTarget.classList.contains("drop-area")) {
                dropTarget.innerHTML = "";
                dropTarget.appendChild(droppedElement);
            }
        }
    
        function calificar() {
            if (intentos >= maxIntentos) return;
    
            let correctAnswers = 0;
            const respuestas = {
                "dropLineaRecta": "lineaRecta",
                "dropLineaCurva": "lineaCurva",
                "dropCaraPlana": "caraPlana",
                "dropCaraCurva": "caraCurva",
                "dropCirculo": "circulo",
                "dropCuadrado": "cuadrado",
                "dropRombo": "rombo",
                "dropTriangulo": "triangulo",
                "dropVertice": "vertice",
                "dropTrapecio": "trapecio",
                "dropRectangulo": "rectangulo"
            };
    
            for (let dropArea in respuestas) {
                const drop = document.getElementById(dropArea);
                const droppedId = drop.firstChild && drop.firstChild.classList.contains('figura') ? drop.firstChild.id : null;
                if (droppedId === respuestas[dropArea]) {
                    correctAnswers++;
                }
            }
    
            const calificacion = (correctAnswers / 11) * 10;
            document.getElementById("resultado").innerText = `Tu calificación es: ${calificacion.toFixed(1)}`;
    
            intentos++;
            actualizarIntentos();
    
            if (intentos >= maxIntentos) {
                bloquearJuego();
            }
        }
    
        function actualizarIntentos() {
            const texto = intentos >= maxIntentos ?
                "Has alcanzado el número máximo de intentos." :
                `Intentos restantes: ${maxIntentos - intentos}`;
            document.getElementById("intentosRestantes").innerText = texto;
        }
    
        function intentarDeNuevo() {
            if (intentos >= maxIntentos) return;
    
            const figuras = document.querySelectorAll('.figura');
            const contenedor = document.querySelector('.containert');
            const drops = document.querySelectorAll('.drop-area');
    
            // Restaurar contenido original
            drops.forEach(drop => {
                drop.innerHTML = textosOriginalesDrop[drop.id] || "";
            });
    
            // Reagregar figuras al contenedor si no están ahí
            figuras.forEach(figura => {
                if (!contenedor.contains(figura)) {
                    contenedor.appendChild(figura);
                }
            });
    
            document.getElementById("resultado").innerText = "";
        }
    
        function bloquearJuego() {
            const botones = document.querySelectorAll('button');
            botones.forEach(btn => btn.disabled = true);
        }