const objetos = {
    huevo: 30, // gramos
    sandia: 4000, // gramos
    pan: 50, // gramos
    carne: 3000, // gramos
    champagne: 500, // gramos
    lapiz: 1, // gramo
    chile: 25, // gramos
    queso: 100, // gramos
    agua: 1000 // gramos
};

let intentos = 0;
const respuestas = {
    bascula1: 11655, // gramos
    bascula2: 15000, // gramos
    bascula3: 2700, // gramos
    bascula4: 17175, // gramos
    bascula5: 6830  // gramos
};

let pesosActuales = {
    bascula1: 0,
    bascula2: 0,
    bascula3: 0,
    bascula4: 0,
    bascula5: 0
};

let objetosColocados = {
    bascula1: [],
    bascula2: [],
    bascula3: [],
    bascula4: [],
    bascula5: []
};

function permitirArrastre(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function permitirSoltar(event) {
    event.preventDefault();
}

function soltarObjeto(event, basculaId) {
    event.preventDefault();
    let objetoId = event.dataTransfer.getData("text");
    let peso = objetos[objetoId];

    // Sumamos el peso del objeto en la báscula seleccionada
    pesosActuales[`bascula${basculaId}`] += peso;
    objetosColocados[`bascula${basculaId}`].push(objetoId);

    // Actualizamos el peso mostrado en la báscula
    actualizarPeso(basculaId);
}

function actualizarPeso(basculaId) {
    const pesoElemento = document.getElementById(`peso${basculaId}`);
    if (pesoElemento) {
        // Convertimos los pesos a kg cuando son mayores o iguales a 1000 gramos
        if (pesosActuales[`bascula${basculaId}`] >= 1000) {
            pesoElemento.textContent = (pesosActuales[`bascula${basculaId}`] / 1000).toFixed(3) + "kg";
        } else {
            pesoElemento.textContent = pesosActuales[`bascula${basculaId}`] + "g";
        }
    }
}

function verificarRespuestas() {
    if (intentos >= 5) {
        document.getElementById("resultado").textContent = "Has alcanzado el número máximo de intentos.";
        return;
    }

    intentos++;
    let calificacion = 0;

    Object.keys(respuestas).forEach(bascula => {
        const diferencia = Math.abs(respuestas[bascula] - pesosActuales[bascula]);
        if (diferencia < 100) calificacion++; // Permite una pequeña diferencia de 100 gramos
    });

    const calificacionFinal = (calificacion / 5) * 10;
    document.getElementById("resultado").textContent = `Calificación: ${calificacionFinal.toFixed(1)} / 10`;
}

function reiniciarEjercicio() {
    // Restablecemos los valores de las básculas
    pesosActuales = {
        bascula1: 0,
        bascula2: 0,
        bascula3: 0,
        bascula4: 0,
        bascula5: 0
    };
    objetosColocados = {
        bascula1: [],
        bascula2: [],
        bascula3: [],
        bascula4: [],
        bascula5: []
    };
    document.getElementById("resultado").textContent = '';
    
    // Reiniciamos los pesos en las básculas
    for (let i = 1; i <= 5; i++) {
        actualizarPeso(i);
    }
}