const {
  contarIntentos,
  guardarCalificacion
} = require('../models/Ejercicios_primero');

// Mostrar ejercicio
const mostrarEjercicio1 = (req, res) => {
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

module.exports = {
  mostrarEjercicio1,
  guardarCalificacion1,
  mostrarEjercicio2,
  guardarCalificacion2,
  mostrarEjercicio3,
  guardarCalificacion3
};