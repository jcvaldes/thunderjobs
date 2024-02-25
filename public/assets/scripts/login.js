// Obtener referencias a elementos HTML
let divUsuario = document.getElementById("divUsuario");
let divLogin = document.getElementById("divLogin");
let divEmpresa = document.getElementById("divEmpresa");
let archivoImagen;

/**
 * Función para cambiar al formulario de registro desde el formulario de inicio de sesión.
 * Oculta el formulario de inicio de sesión y muestra el formulario de registro.
 * @function fModalRegistro
 */
function fModalRegistro(){
    let divFormLogin = document.getElementById("divFormLogin")
    let divFormRegistro = document.getElementById("divFormRegistro")
    divFormLogin.style.display = "none";
    divFormRegistro.style.display = "flex";
    const mensajeError = document.getElementById("mensajeErrorLogin");
    mensajeError.style.display = "none";
}

/**
 * Función para retroceder desde el formulario de registro al formulario de inicio de sesión.
 * Muestra el formulario de inicio de sesión y oculta el formulario de registro.
 * @function volverAtras
 */
function volverAtras(){
    divFormLogin.style.display = "flex";
    divFormRegistro.style.display = "none";
    const mensajeError = document.getElementById("mensajeErrorRegistro");
    mensajeError.style.display = "none";
}

/**
 * Función para realizar el inicio de sesión de un usuario.
 * Obtiene los valores del nombre de usuario y la contraseña, realiza una solicitud al servidor
 * para iniciar sesión y maneja la respuesta del servidor.
 * @function loginUsuario
 */
function loginUsuario() {
    // Obtener los valores del nombre de usuario y la contraseña
    const username = document.getElementById('inputUsuario').value;
    const password = document.getElementById('inputPassword').value;

    // Objeto con los datos del usuario
    const userData = {
        username: username,
        password: password
    };

    // Configurar la solicitud fetch para el inicio de sesión de usuario
    fetch('http://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito o error del servidor
        if (data.token) {
            // Almacenar el token en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('tipoUsuario', 'Usuario');
            window.location.href = "index.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);

        // Mostrar mensaje de error en caso de credenciales incorrectas
        const mensajeError = document.getElementById("mensajeErrorLogin");
        mensajeError.innerHTML = "Credenciales incorrectas ";
        mensajeError.style.display = "flex";
    });
}

/**
 * Función para realizar el inicio de sesión de una empresa.
 * Obtiene los valores del CIF y la contraseña de la empresa, realiza una solicitud al servidor
 * para iniciar sesión y maneja la respuesta del servidor.
 * @function loginEmpresa
 */
function loginEmpresa() {
    // Obtener los valores del CIF y la contraseña de la empresa
    const cif = document.getElementById('inputCif').value;
    const passwordEmpresa = document.getElementById('inputPasswordE').value;

    // Objeto con los datos de la empresa
    const empresaData = {
        cif: cif,
        password: passwordEmpresa
    };

    // Configurar la solicitud fetch para el inicio de sesión de empresa
    fetch('http://localhost:3001/api/empresas/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito o error del servidor
        if (data.token) {
            // Almacenar el token en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('tipoUsuario', 'Empresa');
            window.location.href = "index.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);

        // Mostrar mensaje de error en caso de credenciales incorrectas
        const mensajeError = document.getElementById("mensajeErrorLogin");
        mensajeError.innerHTML = "Credenciales incorrectas ";
        mensajeError.style.display = "flex";
    });
}

/**
 * Función para registrar un nuevo usuario.
 * Obtiene los valores del formulario de registro de usuario, realiza una solicitud al servidor
 * para registrar al usuario y maneja la respuesta del servidor.
 * @function registroUsuario
 */
function registroUsuario(){
    // Obtener los valores del formulario de registro de usuario
    const nombre = document.getElementById('rInputNombre').value;
    const email = document.getElementById('rInputEmail').value;
    const password = document.getElementById('rInputPassword').value;
    const username = document.getElementById('rInputUsuario').value;

    // Verificar que todos los campos estén completos
    if(nombre == "" || email == "" || password == "" || username == ""){
        const mensajeErrorRegistro = document.getElementById("mensajeErrorRegistro");
        mensajeErrorRegistro.innerHTML = "Completa todos los campos";
        mensajeErrorRegistro.style.display = "flex";
        return ;
    }

    // Objeto con los datos del nuevo usuario
    const usuarioData = {
        nombre: nombre,
        email: email,
        password: password,
        username: username
    };

    // Configurar la solicitud fetch para el registro de usuario
    fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito o error del servidor
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Error:', error);
        const mensajeErrorRegistro = document.getElementById("mensajeErrorRegistro");
        mensajeErrorRegistro.innerHTML = "Usuario ya existente";
        mensajeErrorRegistro.style.display = "flex";

    });
}

/**
 * Función para manejar la selección de imagen en el formulario de registro de empresa.
 * Obtiene la imagen seleccionada por el usuario y la almacena en la variable archivoImagen.
 * @function fInputImg
 */
function fInputImg(){
    const inputFile = document.getElementById('rInputImagenE');
    archivoImagen = inputFile.files[0];
    console.log(archivoImagen); // Esto mostrará el objeto File del archivo seleccionado
}

/**
 * Función para registrar una nueva empresa.
 * Obtiene los valores del formulario de registro de empresa, realiza una solicitud al servidor
 * para registrar la empresa y maneja la respuesta del servidor.
 * @function registroEmpresas
 */
function registroEmpresas(){
    // Obtener los valores del formulario de registro de empresa
    const cif = document.getElementById('rInputCifE').value;
    const nombre = document.getElementById('rInputNombreE').value;
    const email = document.getElementById('rInputEmailE').value;
    const password = document.getElementById('rInputPasswordE').value;
    const descripcion = document.getElementById('rInputDescripcionE').value;
    const imagen = archivoImagen;

    // Verificar que todos los campos estén completos
    if(cif == "" || nombre == "" || email == "" || password == "" || descripcion == "" || imagen == ""){
        const mensajeError = document.getElementById("mensajeErrorRegistro");
        mensajeError.innerHTML = "Completa todos los campos";
        mensajeError.style.display = "flex";
        return;
    }

    // Crear objeto FormData para enviar los datos del formulario de registro de empresa
    const formData = new FormData();
    formData.append('cif', cif);
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('descripcion', descripcion);
    formData.append('archivo', imagen); 

    // Configurar la solicitud fetch para el registro de empresa
    fetch('http://localhost:3001/api/empresas', {
        method: 'POST',
        headers: {
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito o error del servidor
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Error:', error);
        const mensajeError = document.getElementById("mensajeErrorRegistro");
        mensajeError.innerHTML = "Empresa ya existente";
        mensajeError.style.display = "flex";
    });
}

/**
 * Función para verificar la sesión del usuario.
 * Comprueba si hay un token almacenado en el localStorage. Si existe, realiza una solicitud al servidor
 * para obtener información sobre el usuario y maneja la respuesta del servidor.
 * @function comprobarToken
 */
function comprobarToken() {
    const token = localStorage.getItem('token');
    divEmpresa.style.display = "none";
    if (token) {
        
        console.log("Token home",token);
        obtenerInformacionUsuario(token);
        divLogin.style.display = "none";
        
    } else {
        console.log('No se encontró ningún token en el localStorage');
        return null;
    }
}

/**
 * Función para obtener información del usuario.
 * Obtiene el tipo de usuario almacenado en el localStorage y realiza una solicitud al servidor
 * para obtener información del usuario correspondiente al tipo y maneja la respuesta del servidor.
 * @function obtenerInformacionUsuario
 * @param {string} token - El token de autenticación del usuario.
 */
function obtenerInformacionUsuario(token) {
    console.log(token)
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    console.log("Tipo de usuario", tipoUsuario)

    if(tipoUsuario == "Usuario"){
        divUsuario.style.display = "flex";
        fetch('http://localhost:3001/api/usuarios/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Información del usuario:', data); // Aquí puedes manejar la información del usuario
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else if(tipoUsuario == "Empresa"){
        divEmpresa.style.display = "flex";
        fetch('http://localhost:3001/api/empresas/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Información del usuario:', data); // Aquí puedes manejar la información del usuario
            const cifFieldExists = 'cif' in data;
            if (cifFieldExists) {
                console.log("Es una empresa");
                divEmpresa.style.display = "flex";
            } else {
                console.log("Es un usuario");
                divUsuario.style.display = "flex";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}



