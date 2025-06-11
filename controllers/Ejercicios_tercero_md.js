const {
  contarIntentos,
  guardarCalificacion
} = require('../models/Ejercicios_tercero');

// Mostrar ejercicio
const mostrarEjercicio1 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 14;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion1 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio2 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 15;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion2 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio3 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 16;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion3 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio4 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 17;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion4 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio5 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 18;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion5 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio6 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 19;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion6 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio7 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 20;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion7 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio8 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 21;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion8 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio9 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 22;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion9 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio10 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 23;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion10 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio11 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 24;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion11 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

// Mostrar ejercicio
const mostrarEjercicio12 = (req, res) => {
  const id_usuario = req.session.userId;
  const id_ejercicio = 25;

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).send('Error interno del servidor');
    }

    if (intentos >= 5) {
      return res.send('Has alcanzado el número máximo de intentos. Intenta de nuevo en una semana.');
    }

    res.render('ejercicio'); // o res.sendFile si usas HTML plano
  });
};

// Guardar calificación
const guardarCalificacion12 = (req, res) => {
  const { intento, calificacion, id_ejercicio, fecha } = req.body;
  const id_usuario = req.session.id_usuario;

  console.log(id_usuario)

  contarIntentos(id_usuario, id_ejercicio, (err, intentos) => {
    if (err) {
      console.error('Error al contar intentos:', err);
      return res.status(500).json({ message: 'Error interno al contar intentos' });
    }

    if (intentos >= 5) {
      return res.status(403).json({ message: 'Has alcanzado el límite de intentos. Espera una semana para volver a intentarlo.' });
    }

    guardarCalificacion(intento, calificacion, id_ejercicio, id_usuario, fecha, (err) => {
      if (err) {
        console.error('Error al guardar calificación:', err);
        return res.status(500).json({ message: 'Error al guardar calificación' });
      }

      res.json({ message: 'Calificación guardada' });
    });
  });
};

module.exports = {
  mostrarEjercicio1,
  guardarCalificacion1,
  mostrarEjercicio2,
  guardarCalificacion2,
  mostrarEjercicio3,
  guardarCalificacion3,
  mostrarEjercicio4,
  guardarCalificacion4,
  mostrarEjercicio5,
  guardarCalificacion5,
  mostrarEjercicio6,
  guardarCalificacion6,
  mostrarEjercicio7,
  guardarCalificacion7,
  mostrarEjercicio8,
  guardarCalificacion8,
  mostrarEjercicio9,
  guardarCalificacion9,
  mostrarEjercicio10,
  guardarCalificacion10,
  mostrarEjercicio11,
  guardarCalificacion11,
  mostrarEjercicio12,
  guardarCalificacion12
};