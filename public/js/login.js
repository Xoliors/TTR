document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío tradicional

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, contrasena })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(`¡Bienvenido, ${data.usuario}!`);
            setTimeout(() => {
                window.location.href = '/home';
            });
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    })
    .catch(error => {
        console.error('Error en login:', error);
        alert('Hubo un error al intentar iniciar sesión.');
    });
});
