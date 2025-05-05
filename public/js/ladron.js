let intentos = 0;

        // Permitir que los elementos sean arrastrados
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        // Permitir que los recuadros reciban el elemento arrastrado
        function allowDrop(ev) {
            ev.preventDefault();
        }

        // Función para soltar el elemento en el recuadro y contar
        function drop(ev, recuadroId, goal) {
            ev.preventDefault();
            let data = ev.dataTransfer.getData("text");
            let droppedItem = document.getElementById(data);

            // Verifica si el item ya está dentro del recuadro
            let recuadro = document.getElementById(recuadroId);

            // Clonamos el item para permitir agregar más de un elemento
            let clonedItem = droppedItem.cloneNode(true);
            clonedItem.style.position = "relative"; // Asegura que los elementos se ubiquen de forma flexible
            clonedItem.setAttribute("draggable", "false"); // Hace que el item dentro del recuadro no sea arrastrable
            clonedItem.onclick = function () { eliminarElemento(clonedItem, recuadro); }; // Añadir función de eliminación

            // Añadir el elemento al recuadro
            recuadro.appendChild(clonedItem);
        }

        // Función para eliminar el último elemento dentro del recuadro
        function eliminarElemento(recuadroId) {
            let recuadro = document.getElementById(recuadroId);

            // Verifica si el recuadro tiene al menos un hijo
            if (recuadro.hasChildNodes()) {
                recuadro.removeChild(recuadro.lastChild); // Eliminar el último elemento
            }
        }

        // Verificar las respuestas y calcular la calificación
        function verificar() {
            intentos++;
            let calificacion = 0;
            let correctos = 0;

            // Verificar si cada recuadro contiene el número correcto de elementos
            if (document.getElementById("recuadro1").childElementCount === 16) correctos++;
            if (document.getElementById("recuadro2").childElementCount === 9) correctos++;
            if (document.getElementById("recuadro3").childElementCount === 12) correctos++;
            if (document.getElementById("recuadro4").childElementCount === 7) correctos++;
            if (document.getElementById("recuadro5").childElementCount === 21) correctos++;

            // Calificación según los aciertos
            if (correctos === 5) {
                calificacion = 10;
            } else if (correctos === 4) {
                calificacion = 8;
            } else if (correctos === 3) {
                calificacion = 6;
            } else if (correctos === 2) {
                calificacion = 4;
            } else if (correctos === 1) {
                calificacion = 2;
            } else {
                calificacion = 0;
            }

            document.getElementById("mensaje").innerHTML = "Tu calificación es: " + calificacion + "/10";

            // Bloquear la interacción después de 5 intentos
            if (intentos >= 5) {
                document.getElementById("recuadro1").classList.add("bloqueado");
                document.getElementById("recuadro2").classList.add("bloqueado");
                document.getElementById("recuadro3").classList.add("bloqueado");
                document.getElementById("recuadro4").classList.add("bloqueado");
                document.getElementById("recuadro5").classList.add("bloqueado");
                document.getElementById("verificarBtn").classList.add("bloqueado");
                document.getElementById("intentarBtn").classList.remove("bloqueado");
            }
        }

        // Reiniciar el ejercicio
        function reiniciar() {
            // Resetear los recuadros
            document.getElementById("recuadro1").innerHTML = '';
            document.getElementById("recuadro2").innerHTML = '';
            document.getElementById("recuadro3").innerHTML = '';
            document.getElementById("recuadro4").innerHTML = '';
            document.getElementById("recuadro5").innerHTML = '';

            // Reiniciar los elementos en los recuadros
            // Aquí puedes agregar las imágenes de nuevo como al principio
            intentos = 0;
            document.getElementById("mensaje").innerHTML = '';
            document.getElementById("verificarBtn").classList.remove("bloqueado");
            document.getElementById("intentarBtn").classList.add("bloqueado");
        }