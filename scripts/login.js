window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.getElementById('loginForm');
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    const url = "https://todo-api.digitalhouse.com/v1/users/login";

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = inputEmail.value;
        const password = inputPassword.value;

        if (email === '' || password === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        realizarLogin(settings);
    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                if (data.jwt) {
                    localStorage.setItem('jwt', data.jwt);
                    alert('Login exitoso. Redirigiendo a la página de tareas...');
                    setTimeout(() => {
                        location.replace("./mis-tareas.html");
                      }, 5000);
                } else {
                    alert('Login fallido. Por favor, verifique sus credenciales.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al realizar el login.');
            });
    }
});

