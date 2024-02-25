/**
 * Elemento HTML donde se mostrarán las solicitudes.
 * @type {HTMLElement}
 */
let divSolicitudes = document.getElementById("divSolicitudes");

/**
 * Redirige al usuario a la página de inicio.
 */
function volverHome() {
    window.location.href = "index.html";
}

/**
 * Cierra la sesión del usuario y elimina los datos de autenticación del almacenamiento local.
 */
function cerrarSesion(){
    window.location.href = "index.html"; // Redirige a la página de inicio
    localStorage.removeItem('token'); // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('tipoUsuario'); // Elimina el tipo de usuario del almacenamiento local
}

/**
 * Carga las solicitudes del usuario desde el servidor utilizando la API Fetch.
 * Las solicitudes se muestran en el elemento HTML divSolicitudes.
 * Esta función es asincrónica y utiliza async/await para esperar las respuestas de las solicitudes.
 */
async function cargarSolicitudesFetch() {
    let idUsuario; // Almacena el ID del usuario
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local
    
    try {
        // Obtiene el perfil del usuario haciendo una solicitud GET al servidor.
        const response = await fetch('http://localhost:3001/api/usuarios/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en el encabezado de autorización
            }
        });

        // Verifica si la respuesta es exitosa.
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        
        // Convierte la respuesta a formato JSON.
        const data = await response.json();
        console.log('Información del usuario:', data); // Muestra la información del usuario en la consola
        idUsuario = data.usuario_id; // Asigna el ID del usuario
        console.log(idUsuario); // Muestra el ID del usuario en la consola
        
        // Limpia el contenido anterior de divSolicitudes antes de cargar nuevas solicitudes.
        divSolicitudes.innerHTML = "";

        // Obtiene las solicitudes del usuario haciendo una solicitud GET al servidor.
        const res = await fetch(`http://localhost:3001/api/solicitudes/usuario/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en el encabezado de autorización
            }
        });

        // Convierte la respuesta a formato JSON.
        const solicitudes = await res.json();
        console.log(solicitudes.solicitudes); // Muestra las solicitudes en la consola
        let solicitudesArray = solicitudes.solicitudes; // Obtiene un array de solicitudes

        // Itera sobre cada solicitud y la muestra en la interfaz de usuario.
        solicitudesArray.forEach(solicitud => {
                // Crea elementos HTML para mostrar la información de la solicitud.
                let divSolicitud = document.createElement('div');
                divSolicitud.setAttribute("class", "divSolicitud");
            
                let divInfo = document.createElement('div');
                divInfo.setAttribute("class", "divInfo");
            
                let img = document.createElement("img");
                img.src = `/uploads/images/${solicitud.vacante.empresa.imagen}`; // Ruta de la imagen de la empresa
                let nombreEmpresa = document.createElement("h4");
                nombreEmpresa.innerHTML = solicitud.vacante.empresa.nombre;
                let tituloVacante = document.createElement("h3");
                tituloVacante.innerHTML = solicitud.vacante.titulo; // Título de la vacante
                let descripcionVacante = document.createElement("h4");
                descripcionVacante.innerHTML = solicitud.vacante.descripcion; // Descripción de la vacante
                let salarioVacante = document.createElement("p");
                salarioVacante.innerHTML = `Salario: ${solicitud.vacante.salario}€ / Anuales`; // Salario de la vacante
                let estadoVacante = document.createElement("p");
                estadoVacante.innerHTML = `Estado: ${solicitud.vacante.estatus}`; // Estado de la vacante
                let estadoSolicitud = document.createElement("p");
                estadoSolicitud.setAttribute("class", "estadoSolicitud")

                // Lógica estado de la solicitud
                if(solicitud.estado == 0){
                    estadoSolicitud.innerHTML = "PENDIENTE";
                    estadoSolicitud.style.backgroundColor = "orange";
                } else if(solicitud.estado == 1){
                    estadoSolicitud.innerHTML = "Solicitud aceptada";
                    estadoSolicitud.style.backgroundColor = "green";
                } else if(solicitud.estado == 2){
                    estadoSolicitud.innerHTML = "Solicitud rechazada";
                } else if(solicitud.estado == 3){
                    estadoSolicitud.innerHTML = "Solicitud cancelada";
                } else if(solicitud.estado == 4){
                    estadoSolicitud.innerHTML = "Vacante cubierta";
                    estadoSolicitud.style.backgroundColor = "black";
                }
            
                // Agrega los elementos al div de información de la solicitud.
                divInfo.appendChild(img);
                divInfo.appendChild(nombreEmpresa);
                divInfo.appendChild(tituloVacante);
                divInfo.appendChild(descripcionVacante);
                divInfo.appendChild(salarioVacante);
                divInfo.appendChild(estadoVacante);
                divInfo.appendChild(estadoSolicitud);

                let divCancelar = document.createElement("div");
                if(solicitud.estado == 0){
                    // Crea un div para el botón de cancelar solicitud.
                    
                    divCancelar.setAttribute("class", "divCancelar");
                
                    // Crea el botón de cancelar solicitud.
                    let botonCancelar = document.createElement("button");
                    botonCancelar.innerHTML = "Cancelar solicitud";
                    botonCancelar.onclick = () =>{
                        cancelarSolicitud(solicitud.solicitud_id); // Llama a la función cancelarSolicitud al hacer clic en el botón
                };
            
                // Agrega el botón al div de cancelar solicitud.
                divCancelar.appendChild(botonCancelar);
                }
            
                // Agrega los elementos al div de la solicitud.
                divSolicitud.appendChild(divInfo);
                if(solicitud.estado == 0){
                    divSolicitud.appendChild(divCancelar);
                } 
                divSolicitudes.appendChild(divSolicitud);

            
        });
    } catch (error) {
        console.error('Error:', error); // Maneja errores mostrándolos en la consola
    }
}

/**
 * Cancela una solicitud haciendo una solicitud PATCH al servidor para cambiar su estado.
 * @param {number} idSolicitud - El ID de la solicitud que se va a cancelar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos de la respuesta del servidor.
 */
async function cancelarSolicitud(idSolicitud){
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local
    try {
        // Define la URL del endpoint del servidor para cambiar el estado de la solicitud.
        const url = `http://localhost:3001/api/solicitudes/estado/${idSolicitud}`;
        
        // Define el cuerpo de la solicitud PATCH para cambiar el estado de la solicitud a 3 (cancelada).
        const body = JSON.stringify({ nuevoEstado: 3});

        // Realiza la solicitud fetch para enviar la solicitud PATCH al servidor.
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido JSON
                'Authorization': `Bearer ${token}` // Incluye el token en el encabezado de autorización
            },
            body: body
        });

        // Verifica si la solicitud fue exitosa.
        if (!response.ok) {
            throw new Error('Error al cambiar el estado de la solicitud');
        }

        // Extrae y devuelve los datos de la respuesta.
        const data = await response.json();
        window.location.reload(); // Recarga la página después de cancelar la solicitud
        return data;
    } catch (error) {
        console.error('Error al cambiar el estado de la solicitud:', error); // Maneja errores mostrándolos en la consola
        throw new Error('Error al cambiar el estado de la solicitud');
    }
}

