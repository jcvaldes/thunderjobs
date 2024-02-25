/**
 * Función para redirigir al usuario a la página de inicio.
 * @function volverHome
 */
function volverHome() {
    window.location.href = "index.html";
}

/**
 * Función para cambiar entre las diferentes opciones del menú de la empresa.
 * @function cambiarOpcion
 * @param {number} opcion - La opción seleccionada (0, 1 o 2).
 */
function cambiarOpcion(opcion){
    let divPublicar = document.getElementById("divPublicar");
    let divGestionarSolicitudes = document.getElementById("divGestionarSolicitudes");
    let divGestionarVacantes = document.getElementById("divGestionarVacantes");
    let modalModificarVacantes = document.getElementById("modalModificarVacantes");
    modalModificarVacantes.style.display="none";
    mensajeError.style.display = "none";
    
    if(opcion===1){
        divPublicar.style.display = "none";
        divGestionarSolicitudes.style.display = "flex";
        divGestionarVacantes.style.display = "none";
    }

    if(opcion===0){
        divPublicar.style.display = "flex";
        divGestionarSolicitudes.style.display = "none";
        divGestionarVacantes.style.display = "none";
    }

    if(opcion===2){
        divPublicar.style.display = "none";
        divGestionarSolicitudes.style.display = "none";
        divGestionarVacantes.style.display = "flex";
    }
}

/**
 * Función para cargar las solicitudes de la empresa desde el servidor y mostrarlas en la interfaz.
 * @function cargarSolicitudesEmpresa
 */
function cargarSolicitudesEmpresa(){
    fetch(`http://localhost:3001/api/solicitudes/empresa/${cifEmpresa}`)
    .then(res => res.json())
    .then(solicitudes => {
        let divGestionarSolicitudes = document.getElementById("divGestionarSolicitudes");
        divGestionarSolicitudes.innerHTML = "";
        let arraySolicitudes = solicitudes.solicitudes;
        arraySolicitudes.forEach(solicitud => {
            let divSolicitud = document.createElement("div");
            divSolicitud.setAttribute("class", "divSolicitud");
            let divInfo = document.createElement("div");
            divInfo.setAttribute("class", "divInfo");
            let tituloVacante = document.createElement("h3");
            tituloVacante.innerHTML = `${solicitud.vacante.titulo}`;
            let descripcionVacante = document.createElement("p");
            descripcionVacante.innerHTML = `${solicitud.vacante.descripcion}`;
            let nombreUsuario = document.createElement("h4");
            nombreUsuario.innerHTML = `${solicitud.usuario.nombre}`;
            let comentarios = document.createElement("p");
            comentarios.innerHTML = `${solicitud.comentarios}`;
            let fecha = document.createElement("p");
            fecha.innerHTML = `${formatearFecha(solicitud.fecha)}`;
            let estadoSolicitud = document.createElement("p");

            if(solicitud.estado == 0){
                estadoSolicitud.innerHTML = `PENDIENTE`;
            } else if (solicitud.estado == 1){
                estadoSolicitud.innerHTML = `ACEPTADA`;
            } else if (solicitud.estado == 2){
                estadoSolicitud.innerHTML = `RECHAZADA`;
            } else if (solicitud.estado == 3){
                estadoSolicitud.innerHTML = `CANCELADA`;
            } else if (solicitud.estado == 4){
                estadoSolicitud.innerHTML = "VACANTE CUBIERTA";
            }

            let botonCurriculum = document.createElement("button");
            botonCurriculum.innerHTML = `Ver currículum`;

            divInfo.appendChild(tituloVacante);
            divInfo.appendChild(descripcionVacante);
            divInfo.appendChild(nombreUsuario);
            divInfo.appendChild(comentarios);
            divInfo.appendChild(fecha);
            divInfo.appendChild(estadoSolicitud);
            divSolicitud.appendChild(divInfo);

            if(solicitud.estado == 0){

                let divBotones = document.createElement("div");
                divBotones.setAttribute("class", "divBotones");

                let botonArchivo = document.createElement("button");
                botonArchivo.innerHTML = "Ver currículum";
                botonArchivo.onclick = () => {
                    descargarArchivo(solicitud.solicitud_id, solicitud.usuario.username);
                }
    
                let botonAceptar = document.createElement("button");
                botonAceptar.innerHTML = `Aceptar`;
                botonAceptar.onclick = () =>{
                    gestionarSolicitud(solicitud.solicitud_id, 1)
                }

                let botonRechazar = document.createElement("button");
                botonRechazar.innerHTML = `Rechazar`;
                botonRechazar.onclick = () =>{
                    gestionarSolicitud(solicitud.solicitud_id, 2)
                }

                divBotones.appendChild(botonArchivo);
                divBotones.appendChild(botonAceptar);
                divBotones.appendChild(botonRechazar);
                divSolicitud.appendChild(divBotones);
            }

            divGestionarSolicitudes.appendChild(divSolicitud);
        });
    })
    .catch(error => {
        console.error('Error al cargar solicitudes de empresa:', error);
    });
}

/**
 * Función para cargar las vacantes de la empresa desde el servidor y mostrarlas en la interfaz.
 * @function cargarVacantesEmpresa
 */
function cargarVacantesEmpresa(){
    fetch(`http://localhost:3001/api/vacantes/empresa/${cifEmpresa}`)
    .then(res => res.json())
    .then(vacantes => {
        let arrayVacantes = vacantes.vacantes;
        let divGestionarVacantes = document.getElementById("divGestionarVacantes");
        divGestionarVacantes.innerHTML = "";
        arrayVacantes.forEach(vacante => {
            let divVacante = document.createElement("div");
            divVacante.setAttribute("class", "divVacante");
            let divInfoVacante = document.createElement("div");
            divInfoVacante.setAttribute("class", "divInfoVacante");
            let tituloVacante = document.createElement("h3");
            tituloVacante.innerHTML = vacante.titulo;
            let descripcionVacante = document.createElement("p");
            descripcionVacante.innerHTML = vacante.descripcion;
            let requisitosVacante = document.createElement("p");
            requisitosVacante.innerHTML = vacante.requisitos;
            let salario = document.createElement("p");
            salario.innerHTML = `${vacante.salario}€ / Anuales`;
            let ubicacion = document.createElement("p");
            ubicacion.innerHTML = vacante.ubicacion.toUpperCase();
            let estatus = document.createElement("p");
            estatus.innerHTML = vacante.estatus;

            divInfoVacante.appendChild(tituloVacante);
            divInfoVacante.appendChild(descripcionVacante);
            divInfoVacante.appendChild(requisitosVacante);
            divInfoVacante.appendChild(salario);
            divInfoVacante.appendChild(ubicacion);
            divInfoVacante.appendChild(estatus);
            
            divVacante.appendChild(divInfoVacante);

            if(vacante.estatus == "CREADA"){
                let divBoton = document.createElement("div");
                divBoton.setAttribute("class", "divBoton");

                let botonModificar = document.createElement("button");
                botonModificar.innerHTML = "Modificar";
                botonModificar.onclick = () => {

                    let modalModificarVacantes = document.getElementById("modalModificarVacantes");
                    modalModificarVacantes.style.display="flex";
                    let nuevoTitulo = document.getElementById("nuevoTitulo");
                    nuevoTitulo.value = vacante.titulo;
                    let nuevaDescripcion = document.getElementById("nuevaDescripcion");
                    nuevaDescripcion.value = vacante.descripcion;
                    let nuevosRequisitos = document.getElementById("nuevosRequisitos");
                    nuevosRequisitos.value = vacante.requisitos;
                    let nuevoSalario = document.getElementById("nuevoSalario");
                    nuevoSalario.value = vacante.salario;
                    let nuevaCategoria = document.getElementById("nuevaCategoria");
                    nuevaCategoria.value = vacante.categoria;
                    let nuevaUbicacion = document.getElementById("nuevaUbicacion");
                    nuevaUbicacion.value = vacante.ubicacion;
                    let botonModificarVacante = document.getElementById("botonModificarVacante");
                    botonModificarVacante.onclick = () => {
                        modificarVacante(vacante.vacante_id);
                    }
                    
                }
                let botonCancelar = document.createElement("button");
                botonCancelar.innerHTML = "Cancelar";
                botonCancelar.onclick = () => {
                    cancelarVacante(vacante.vacante_id);
                }

                divBoton.appendChild(botonModificar);
                divBoton.appendChild(botonCancelar);
                divVacante.appendChild(divBoton);
            }
            
            divGestionarVacantes.appendChild(divVacante);
        })
    })
    .catch(error => {
        console.error('Error al cargar vacantes de empresa:', error);
    });
}

/**
 * Función para crear una nueva vacante y enviarla al servidor para su registro.
 * @function crearVacante
 */
function crearVacante(){
    let titulo = document.getElementById("inputTitulo").value;
    let descripcion = document.getElementById("inputDescripcion").value;
    let requisitos = document.getElementById("inputRequisitos").value;
    let salario = document.getElementById("inputSalario").value;
    let categoria = document.getElementById("selectCategorias").value;
    let ubicacion = document.getElementById("selectUbicacion").value;
    let destacado = document.getElementById("selectDestacado").value;

    if(destacado == "sí"){
        destacado = 1;
    }else{
        destacado = 0;
    }

    if(titulo == "" || descripcion == "" || requisitos == "" || salario == "" || categoria == "" || ubicacion == ""){
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.innerHTML = "Completa todos los campos";
        mensajeError.style.display = "flex";
        return;
    }

    // Validar que el campo de salario solo contenga números
    if(isNaN(parseFloat(salario)) || !isFinite(salario)) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.innerHTML = "El campo salario debe ser un número";
        mensajeError.style.display = "flex";
        return;
    }

    const vacanteData = {
        titulo: titulo,
        descripcion: descripcion,
        requisitos: requisitos,
        salario: salario,
        destacado: destacado,
        categoria: categoria,
        empresa: empresa,
        ubicacion: ubicacion 
    };

    const token = localStorage.getItem('token');

    fetch('http://localhost:3001/api/vacantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vacanteData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Mensaje de éxito o error del servidor
        window.location.href = "menuEmpresa.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

let empresa;
let cifEmpresa;
/**
 * Función para comprobar el token de la empresa y obtener su información desde el servidor.
 * @function comprobarTokenEmpresa
 */
function comprobarTokenEmpresa() {
    const token = localStorage.getItem('token');
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
            
            empresa = data;
            cifEmpresa = data.cif;
            console.log(cifEmpresa)
            console.log("empresa", empresa);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Función asíncrona para gestionar una solicitud cambiando su estado en el servidor.
 * @function gestionarSolicitud
 * @param {string} idSolicitud - El ID de la solicitud a gestionar.
 * @param {number} estado - El nuevo estado de la solicitud.
 */
async function gestionarSolicitud(idSolicitud, estado){

    try {
        // Definir la URL del endpoint del servidor
        const url = `http://localhost:3001/api/solicitudes/estado/${idSolicitud}`;
        
        // Definir el cuerpo de la solicitud PATCH
        const body = JSON.stringify({ nuevoEstado: estado});

        const token = localStorage.getItem('token');

        // Realizar la solicitud fetch para enviar la solicitud PATCH
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al cambiar el estado de la solicitud');
        }

        // Extraer y devolver los datos de la respuesta
        const data = await response.json();
        window.location.reload();
        return data;
    } catch (error) {
        console.error('Error al cambiar el estado de la solicitud:', error);
        throw new Error('Error al cambiar el estado de la solicitud');
    }
}

/**
 * Función para cancelar una vacante en el servidor.
 * @function cancelarVacante
 * @param {string} vacanteId - El ID de la vacante a cancelar.
 */
function cancelarVacante(vacanteId) {
    fetch(`http://localhost:3001/api/vacantes/${vacanteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('Estatus de vacante cambiado:', data);
        // Aquí puedes manejar la respuesta según lo necesites
        window.location.href = "menuEmpresa.html";
    })
    .catch(error => {
        console.error('Error al cambiar el estatus de la vacante:', error);
        // Aquí puedes manejar el error según lo necesites
    });
}

/**
 * Función para modificar una vacante existente en el servidor.
 * @function modificarVacante
 * @param {string} vacanteId - El ID de la vacante a modificar.
 */
function modificarVacante(vacanteId) {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/api/vacantes/modificar/${vacanteId}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let nuevoTitulo = document.getElementById("nuevoTitulo").value;
    let nuevaDescripcion = document.getElementById("nuevaDescripcion").value;
    let nuevosRequisitos = document.getElementById("nuevosRequisitos").value;
    let nuevoSalario = document.getElementById("nuevoSalario").value;
    let nuevaCategoria = document.getElementById("nuevaCategoria").value;
    let nuevaUbicacion = document.getElementById("nuevaUbicacion").value;
    let nuevoDestacado = document.getElementById("nuevoDestacado").value;

    if(nuevoDestacado == "sí"){
        nuevoDestacado = 1;
    }else{
        nuevoDestacado = 0;
    }

    console.log("nuevoDestacado", nuevoDestacado);

    if(nuevoTitulo == "" || nuevaDescripcion == "" || nuevosRequisitos == "" || nuevoSalario == "" || nuevaCategoria == "" || nuevaUbicacion == ""){
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.innerHTML = "Completa todos los campos";
        mensajeError.style.display = "flex";
        return;
    }

    // Validar que el campo de salario solo contenga números
    if(isNaN(parseFloat(nuevoSalario)) || !isFinite(nuevoSalario)) {
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.innerHTML = "El campo salario debe de ser un número";
        mensajeError.style.display = "flex";
        return;
    }

    const data = {
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion,
        requisitos: nuevosRequisitos,
        salario: nuevoSalario,
        categoria: nuevaCategoria,
        ubicacion: nuevaUbicacion,
        destacado: nuevoDestacado 
    };

    fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al modificar la vacante');
        }
        return response.json();
    })
    .then(data => {
        console.log('Vacante modificada:', data);
        window.location.href = "menuEmpresa.html";
    })
    .catch(error => {
        console.error('Error al modificar la vacante:', error);
    });
}

/**
 * Función para descargar el currículum asociado a una solicitud desde el servidor.
 * @function descargarArchivo
 * @param {string} idSolicitud - El ID de la solicitud.
 * @param {string} username - El nombre de usuario asociado a la solicitud.
 */
function descargarArchivo(idSolicitud, username) {
    fetch(`http://localhost:3001/api/solicitudes/descargar/${idSolicitud}`)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al descargar el archivo');
            }
            // Devolver el blob de la respuesta (archivo)
            return response.blob();
        })
        .then(blob => {
            // Crear una URL del objeto Blob
            const url = window.URL.createObjectURL(blob);
            // Crear un enlace en el documento
            const a = document.createElement('a');
            a.href = url;
            // Establecer el nombre de archivo deseado (puedes extraerlo de la respuesta o proporcionarlo manualmente)
            a.download = `Currículum_${username}.pdf`;
            // Agregar el enlace al documento
            document.body.appendChild(a);
            // Hacer clic en el enlace para iniciar la descarga
            a.click();
            // Limpiar la URL del objeto Blob
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al descargar el archivo:', error);
        });
}

/**
 * Función para cerrar el modal de modificación de vacantes.
 * @function cerrarModalModificar
 */
function cerrarModalModificar(){
    let modalModificarVacantes = document.getElementById("modalModificarVacantes");
    modalModificarVacantes.style.display = "none";
}

