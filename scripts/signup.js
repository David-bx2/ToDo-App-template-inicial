window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.getElementById('registerForm');
        const inputNombre = document.getElementById('inputNombre');
        const inputApellido = document.getElementById('inputApellido');
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        const inputPasswordRepetida = document.getElementById('inputPasswordRepetida');
        const url = "https://todo-api.digitalhouse.com/v1/users";


    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const nombre = inputNombre.value;
        const apellido = inputApellido.value;
        const email = inputEmail.value;
        const password = inputPassword.value;
        const passwordRepetida = inputPasswordRepetida.value;

        if (nombre === '' || apellido === '' || email === '' || password === '' || passwordRepetida === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (password !== passwordRepetida) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: nombre,
                lastName: apellido,
                email: email,
                password: password
            })
        };

        realizarRegister(settings);




    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(url, settings)
                .then(response => response.json())
                .then(data => {
                    if (data.jwt) {
                        alert('Registro exitoso. Redirigiendo a la página de login...');
                        localStorage.setItem("jwt", JSON.stringify(data.jwt));
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 5000);
                    } else {
                        alert('Registro fallido. Por favor, verifique sus datos.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error al realizar el registro.');




    });


}});