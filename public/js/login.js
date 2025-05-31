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
            Swal.fire({
                icon: 'success',
                title: `¡Bienvenido, ${data.usuario}!`,
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location.href = '/home';
            }, 1600); // Esperamos un poco más que el timer para redirigir
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos.'
            });
        }
    })
    .catch(error => {
        console.error('Error en login:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'Hubo un error al intentar iniciar sesión. Inténtalo más tarde.'
        });
    });
});
