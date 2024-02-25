//Fetch para cargar las empresas
let urlFetch = "http://localhost:3001/api/empresas";
/**
 * Función para cargar las empresas utilizando Fetch API.
 * @function cargarEmpresasFetch
 * @description Realiza una solicitud HTTP GET para obtener datos de empresas y luego 
 * los muestra en la interfaz de usuario.
 */
function cargarEmpresasFetch() {
    console.log("Traer empresas");
    fetch(urlFetch)
        .then(res => res.json())
        .then(empresas => {
            console.log(empresas);

            // Muestra hasta 4 empresas en la interfaz de usuario
            for(let i = 0; i < 4 && i < empresas.length; i++){
                let divFiltro = document.getElementById("divFiltroEmpresa");
                let divEmpresa = document.createElement("div");
                divEmpresa.setAttribute("class", "divEmpresa");
                let imagenEmpresa = document.createElement("img");
                imagenEmpresa.src = `/uploads/images/${empresas[i].imagen}`;
                let nombreEmpresa = document.createElement("h3");
                nombreEmpresa.innerHTML = empresas[i].nombre;

                // Asigna un manejador de eventos al hacer clic en la imagen de la empresa
                imagenEmpresa.addEventListener("click", function() {
                    fVacantesCif(empresas[i].cif);
                });

                divEmpresa.appendChild(imagenEmpresa);
                divEmpresa.appendChild(nombreEmpresa);
                divFiltro.appendChild(divEmpresa);
            }
        })
        .catch(error => console.error("Error al cargar las empresas:", error));
}

/**
 * Función para redirigir a la página de candidatos.
 * @function fAccederCandidatos
 * @description Redirige al usuario a la página de candidatos.
 */
function fAccederCandidatos() {
    window.location.href = "candidatos.html";
}

/**
 * Función para redirigir a la página de empresas.
 * @function fAccederEmpresas
 * @description Redirige al usuario a la página de empresas.
 */
function fAccederEmpresas() {
    window.location.href = "empresas.html";
}

/**
 * Función para redirigir al menú de solicitudes.
 * @function menuSolicitudes
 * @description Redirige al usuario al menú de solicitudes.
 */
function menuSolicitudes() {
    window.location.href = "menuUsuario.html";
}

/**
 * Función para redirigir al menú de empresa.
 * @function menuEmpresa
 * @description Redirige al usuario al menú de empresa.
 */
function menuEmpresa() {
    window.location.href = "menuEmpresa.html";
}

// Declaración de la variable modalMenuUsuario
let modalMenuUsuario = document.getElementById("modalMenuUsuario");
modalMenuUsuario.style.display = "none";

/**
 * Función para mostrar u ocultar el menú de usuario.
 * @function menuUsuario
 * @description Muestra u oculta el menú de usuario en la interfaz.
 */
function menuUsuario() {
    if (modalMenuUsuario.style.display == "none") {
        modalMenuUsuario.style.display = "flex";
    }
    else {
        modalMenuUsuario.style.display = "none";
    }
}

// Declaración de la variable modalMenuEmpresa
let modalMenuEmpresa = document.getElementById("modalMenuEmpresa");
modalMenuEmpresa.style.display = "none";

/**
 * Función para mostrar u ocultar el menú de empresa.
 * @function fModalMenuEmpresa
 * @description Muestra u oculta el menú de empresa en la interfaz.
 */
function fModalMenuEmpresa() {
    if (modalMenuEmpresa.style.display == "none") {
        modalMenuEmpresa.style.display = "flex";
    }
    else {
        modalMenuEmpresa.style.display = "none";
    }
}

/**
 * Función para formatear la fecha.
 * @function formatearFecha
 * @description Toma una fecha completa en formato ISO 8601 y devuelve solo la parte de la fecha.
 * @param {string} fechaCompleta - La fecha completa en formato ISO 8601.
 * @returns {string} La fecha formateada (solo la parte de la fecha).
 */
function formatearFecha(fechaCompleta){
    const fecha = fechaCompleta.split('T')[0];
    return fecha;
}

/**
 * Función para cerrar la sesión del usuario y redirigirlo a la página de inicio.
 * @function cerrarSesion
 * @description Elimina los datos de sesión del usuario y lo redirige a la página de inicio.
 */
function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    window.location.href = 'index.html';
}

/**
 * Función para volver a la página de inicio.
 * @function volverHome
 * @description Redirige al usuario a la página de inicio.
 */
function volverHome() {
    window.location.href = "index.html";
}
