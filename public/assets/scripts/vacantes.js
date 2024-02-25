/**
 * Obtiene elementos del DOM y configura el estilo del modal de solicitud.
 */
let section = document.querySelector('section')
let divVacantes = document.getElementById("divVacantes")
let archivoPDF;

/**
 * Redirige al usuario a la página de candidatos.
 */
function fAccederCandidatos() {
    window.location.href = "candidatos.html";
}

/**
 * Redirige al usuario a la página de empresas.
 */
function fAccederEmpresas() {
    window.location.href = "empresas.html";
}

/**
 * Redirige al usuario a la página principal.
 */
function volverHome() {
    window.location.href = "index.html";
}

/**
 * Realiza una solicitud fetch para obtener las vacantes de una empresa mediante su CIF.
 * @param {string} cif - CIF de la empresa.
 */
function fVacantesCif(cif) {
    console.log("entra funcion fVacantesCif");
    fetch(`http://localhost:3001/api/vacantes?cifEmpresa=${cif}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(vacantes => {
            console.log(vacantes);
            // Almacena los datos de vacantes en el almacenamiento local del navegador
            localStorage.setItem('vacantesRecibidas', JSON.stringify(vacantes));
            // Redirige a la página "vacantes.html"
            window.location.href = "vacantes.html";
        })
        .catch(error => {
            console.error('Error al cargar vacantes:', error);
        });
}


/**
 * Realiza una solicitud fetch para obtener las vacantes por ubicación.
 * @param {string} ubicacion - Ubicación de las vacantes.
 */
function fVacantesUbi(ubicacion) {
    console.log("entra funcion fVacantesUbicacion");
    fetch(`http://localhost:3001/api/vacantes?ubicacion=${ubicacion}`)
        .then(res => res.json())
        .then(vacantes => {
            console.log(vacantes);
            // Almacena los datos de vacantes en el almacenamiento local del navegador
            localStorage.setItem('vacantesRecibidas', JSON.stringify(vacantes));
            // Redirige a la página "vacantes.html"
            window.location.href = "vacantes.html";
        })
        .catch(error => {
            console.error('Error al cargar vacantes:', error);
        });
}


/**
 * Realiza una solicitud fetch para obtener las vacantes por categoría.
 * @param {string} categoria - Categoría de las vacantes.
 */
function fVacantesCategoria(categoria) {
    console.log("entra funcion fVacantesCategoria");
    fetch(`http://localhost:3001/api/vacantes?nombreCategoria=${categoria}`)
        .then(res => res.json())
        .then(vacantes => {
            console.log(vacantes);
            // Almacena los datos de vacantes en el almacenamiento local del navegador
            localStorage.setItem('vacantesRecibidas', JSON.stringify(vacantes));
            // Redirige a la página "vacantes.html"
            window.location.href = "vacantes.html";
        })
        .catch(error => {
            console.error('Error al cargar vacantes:', error);
        });
}

/**
 * Realiza una búsqueda de vacantes según una palabra clave y/o ubicación.
 */
function buscarVacantes() {
    const palabraClave = document.getElementById('inputBuscador').value;
    const ubicacion = document.getElementById('selectBuscador').value;

    // Construir la URL con los parámetros de búsqueda
    let url = 'http://localhost:3001/api/vacantes';
    if (palabraClave || ubicacion) {
        url += '?';
        if (palabraClave) {
            url += `palabraClave=${encodeURIComponent(palabraClave)}&`;
        }
        if (ubicacion) {
            url += `ubicacion=${encodeURIComponent(ubicacion)}`;
        }
    }

    // Realizar la solicitud fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(vacantes => {
            localStorage.setItem('vacantesRecibidas', JSON.stringify(vacantes));
            window.location.href = "vacantes.html";
        })
        .catch(error => {
            // Manejar los errores
            console.error('Error en la solicitud fetch:', error);
        });
}




/**
 * Carga las vacantes obtenidas en el almacenamiento local y las muestra en la página.
 * @param {number} currentPage - Página actual.
 * @param {number} pageSize - Tamaño de la página.
 */
function cargarVacantes(currentPage, pageSize) {
    let vacantesRecibidas = JSON.parse(localStorage.getItem('vacantesRecibidas'));
    console.log(vacantesRecibidas);
    divVacantes.innerHTML = "";

    vacantesRecibidas.sort((a, b) => {
        // Si el estado de 'a' es 1 y el de 'b' no lo es, 'a' debería ir antes
        if (a.destacado === 1 && b.destacado !== 1) {
            return -1;
        }
        // Si el estado de 'b' es 1 y el de 'a' no lo es, 'b' debería ir antes
        if (b.destacado === 1 && a.destacado !== 1) {
            return 1;
        }
        // En cualquier otro caso, no se cambia el orden
        return 0;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, vacantesRecibidas.length);

    for (let i = startIndex; i < endIndex; i++) {
        const vacante = vacantesRecibidas[i];

        if (vacante.estatus == "CREADA") {
            // Tu código para crear y mostrar la vacante en el HTML
            let divVacante = document.createElement('div');
            divVacante.setAttribute("class", "vacante");
            divVacante.setAttribute("onclick", `modalVacante(${vacante.vacante_id})`);

            let divImg = document.createElement('div');
            divImg.setAttribute("class", "containerImg");

            let img = document.createElement('img');
            img.src = `/uploads/images/${vacante.empresa.imagen}`;
            divImg.appendChild(img);

            let divInfo = document.createElement('div');
            divInfo.setAttribute("class", "containerInfo");


            if (vacante.destacado == 1) {
                let divDestacado = document.createElement('div');
                divDestacado.setAttribute("class", "divDestacado");
                divDestacado.innerHTML = "<h4>Destacado</h4>";
                divInfo.appendChild(divDestacado);
            }

            let tituloPuesto = document.createElement("h3");
            tituloPuesto.innerHTML = vacante.titulo;

            let empresaVacante = document.createElement("h4");
            empresaVacante.innerHTML = vacante.empresa.nombre;

            let divCardInfo = document.createElement("div");
            divCardInfo.setAttribute("class", "cardInfo");

            let categoria = document.createElement("p");
            categoria.innerHTML = `${vacante.categoria} |`;
            let ubicacion = document.createElement("p");
            ubicacion.innerHTML = `| ${vacante.ubicacion.toUpperCase()} |`;
            let fecha = document.createElement("p");
            fecha.innerHTML = `| ${formatearFecha(vacante.fecha_registro)}`;
            divCardInfo.appendChild(categoria);
            divCardInfo.appendChild(ubicacion);
            divCardInfo.appendChild(fecha);

            let descripcion = document.createElement("p");
            descripcion.innerHTML = `Descripción: ${vacante.descripcion}`;
            let salario = document.createElement("p");
            salario.innerHTML = `Salario: ${vacante.salario}€ / Anuales`;

            divInfo.appendChild(tituloPuesto);
            divInfo.appendChild(empresaVacante);
            divInfo.appendChild(divCardInfo);
            divInfo.appendChild(descripcion);
            divInfo.appendChild(salario);

            divVacante.appendChild(divImg);
            divVacante.appendChild(divInfo);

            divVacantes.appendChild(divVacante);

            console.log(vacante);
        } else {
            console.log("Vacante no disponible", vacante);
        }
    }

    // Lógica para la paginación
    const totalPages = Math.ceil(vacantesRecibidas.length / pageSize);
    console.log("Total de páginas:", totalPages);

    // Borra los botones de paginación anteriores
    const divPaginacion = document.getElementById("divPaginacion");
    divPaginacion.innerHTML = "";

    // Botón de página anterior
    if (currentPage > 1) {
        const buttonPaginaAnterior = document.createElement("button");
        buttonPaginaAnterior.setAttribute("class", "botonPaginas");
        buttonPaginaAnterior.setAttribute("id", "botonAnterior");
        buttonPaginaAnterior.innerHTML = "&#10140;";
        buttonPaginaAnterior.addEventListener("click", () => {
            cargarVacantes(currentPage - 1, pageSize);
        });
        divPaginacion.appendChild(buttonPaginaAnterior);
    }

    // Crea un botón para cada página y se vincula a la función cargarVacantes
    for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    // button.setAttribute("class", "botonPaginas"); // Agrega la clase base
    if (i === currentPage) { // Comprueba si es la página actual
        button.classList.add("marcado"); // Agrega la clase "marcado" si es la página actual
    }
    button.addEventListener("click", () => {
        // Remueve la clase "marcado" de todos los botones de paginación
        document.querySelectorAll('.botonPaginas').forEach(btn => btn.classList.remove('marcado'));
        button.classList.add("marcado"); // Agrega la clase "marcado" al botón actual
        cargarVacantes(i, pageSize);
    });
    divPaginacion.appendChild(button);
}


    // Botón de página siguiente
    if (currentPage < totalPages) {
        const buttonPaginaSiguiente = document.createElement("button");
        buttonPaginaSiguiente.setAttribute("class", "botonPaginas");
        buttonPaginaSiguiente.innerHTML = "&#10140;";
        buttonPaginaSiguiente.addEventListener("click", () => {
            cargarVacantes(currentPage + 1, pageSize);
        });
        divPaginacion.appendChild(buttonPaginaSiguiente);
    }
}


/**
 * Muestra un modal con información detallada de una vacante.
 * @param {number} idVacante - ID de la vacante.
 */
function modalVacante(idVacante) {
    console.log(idVacante)
    fetch(`http://localhost:3001/api/vacantes/${idVacante}`)
        .then(res => res.json())
        .then(vacante => {
            let divModal = document.getElementById("divModal")
            divModal.style.display = "none";
            console.log(vacante)
            divModal.innerHTML =
    `
    <div onclick="cerrarModal()" id="divCerrar">
        <p>X</p>
    </div>
    <div id="containerImg">
        <img src=/uploads/images/${vacante.empresa.imagen} alt="">
    </div>
    <div id="containerInfo">
    <div id="divDestacado">
        <h4>Destacado</h4>
    </div>
    <h3>${vacante.titulo}</h3>
    <h4>${vacante.empresa.nombre}</h4>
    <div class="cardInfo">
        <p>${vacante.categoria} |</p>
        <p>| ${vacante.ubicacion.toUpperCase()} |</p>
        <p>| ${formatearFecha(vacante.fecha_registro)}</p>
    </div>
    <p>Descripción: ${vacante.descripcion}</p>
    <p>${vacante.salario}€ / Anuales</p>

    <p>REQUISITOS: ${vacante.requisitos}</p>

    <div id="divBoton">
        <button onclick="solicitarVacante()">Solicitar vacante</button>
    </div>

    `;
    
    let divModalSolicitud = document.getElementById("divModalSolicitud");
    divModalSolicitud.innerHTML = `
    <div id="divComentarios">
        <label for="inputTexto">Añade tus comentarios</label>
        <input type="text" id="inputTexto" name="inputTexto">
    </div>
    <div id="divArchivos">
        <label for="inputFile">Adjunta tu currículum</label>
        <input type="file" id="inputFile" name="upload" accept="application/pdf/">
    </div>    
    <div id="divBotones">
        <button onclick="enviarSolicitudFetch(${vacante.vacante_id})">Enviar solicitud</button>
        <button onclick="cerrarModalSolicitud()">Cancelar</button>
    </div>`
    const inputFile = document.getElementById('inputFile');

    inputFile.addEventListener('change', () => {
        archivoPDF = inputFile.files[0];
        console.log(archivoPDF); // Esto mostrará el objeto File del archivo seleccionado
    });

    let divBoton = document.getElementById("divBoton");
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario != "Usuario") {
        divBoton.style.display = "none";
    }
    divVacantes.style.display = "none"
    divModal.style.display = "block";
    let divPaginacion = document.getElementById("divPaginacion");
    divPaginacion.style.display = "none";
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });
}

/**
 * Envía una solicitud de vacante al servidor junto con un archivo adjunto (PDF).
 * @param {number} idVacante - ID de la vacante.
 */
async function enviarSolicitudFetch(idVacante) {
    let usuario;
    let idUsuario;
    let vacante;
    let comentarios = document.getElementById("inputTexto").value;
    console.log(comentarios);
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud para obtener la vacante
        const responseVacante = await fetch(`http://localhost:3001/api/vacantes/${idVacante}`);
        
        if (!responseVacante.ok) {
            throw new Error('Error en la solicitud de la vacante');
        }
        
        // Extraer la vacante de la respuesta
        vacante = await responseVacante.json();
        console.log('Información de la vacante:', vacante);

        if (token) {
            console.log("Token home", token);
            // Realizar la solicitud para obtener el perfil del usuario
            const responseUsuario = await fetch('http://localhost:3001/api/usuarios/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
                }
            });

            if (!responseUsuario.ok) {
                throw new Error('Error en la solicitud de perfil de usuario');
            }

            // Extraer la información del usuario de la respuesta
            const data = await responseUsuario.json();
            usuario = data;
            idUsuario = data.usuario_id;
            
            console.log('Información del usuario:', data);
        } else {
            console.log('No se encontró ningún token en el localStorage');
            return null;
        }

        // Crear el objeto FormData para enviar la solicitud con el archivo
        const formData = new FormData();
        formData.append('archivo', archivoPDF);
        formData.append('comentarios', comentarios);
        formData.append('vacante_id', idVacante);
        formData.append('usuario_id', idUsuario);

        // Realizar la solicitud para enviar la nueva solicitud con el archivo
        const responseSolicitud = await fetch('http://localhost:3001/api/solicitudes/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            },
            body: formData // Usar el objeto FormData en lugar de JSON.stringify
        });

        if (!responseSolicitud.ok) {
            throw new Error('Error al crear la solicitud');
        }

        const data = await responseSolicitud.json();
        console.log('Solicitud creada exitosamente:', data.solicitud);
        window.location.href = "vacantes.html";
        // Aquí puedes manejar la respuesta del servidor, si lo deseas
    } catch (error) {
        console.error('Error:', error);
        // Manejar el error si ocurre
    }
}

/**
 * Cierra el modal de detalle de vacante.
 */
function cerrarModal() {
    let divModal = document.getElementById("divModal");
    divVacantes.style.display = "flex"
    divModal.style.display = "none";
    divPaginacion.style.display = "flex";
    let divModalSolicitud = document.getElementById("divModalSolicitud");
    divModalSolicitud.style.display = "none";
}

/**
 * Muestra el modal de solicitud de vacante.
 */
function solicitarVacante() {
    let divModalSolicitud = document.getElementById("divModalSolicitud");
    divModalSolicitud.style.display = "flex";
    section = document.getElementById("section");
    section.classList.add("solicitud"); 
}

/**
 * Cierra el modal de solicitud de vacante.
 */
function cerrarModalSolicitud() {
    let divModalSolicitud = document.getElementById("divModalSolicitud");
    divModalSolicitud.style.display = "none";
    section = document.getElementById("section");
    section.classList.remove("solicitud");    
}

/**
 * Formatea la fecha en formato "YYYY-MM-DD".
 * @param {string} fechaCompleta - Fecha completa en formato ISO.
 * @returns {string} - Fecha formateada.
 */
function formatearFecha(fechaCompleta){
    const fecha = fechaCompleta.split('T')[0];
    return fecha;
}