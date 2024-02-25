const empresas = [
    {
        cif: "A000",
        nombre: "Apple",
        email: "apple@gmail.com",
        password: "1234",
        descripcion: "Empresa dedicada a la tecnología",
        imagen: "apple.jpg"
    },
    {
        cif: "G000",
        nombre: "Google",
        email: "google@gmail.com",
        password: "1234",
        descripcion: "Empresa líder mundial en la tecnología",
        imagen: "google.png"
    },
    {
        cif: "Q000",
        nombre: "Quirón Salud",
        email: "quiron@gmail.com",
        password: "1234",
        descripcion: "Empresa dedicada a la salud",
        imagen: "quironsalud.png"
    },
    {
        cif: "B000",
        nombre: "Burger King",
        email: "burger@gmail.com",
        password: "1234",
        descripcion: "Empresa dedicada a vender hamburguesas",
        imagen: "burgerking.png"
    },
    {
        cif: "M000",
        nombre: "Microsoft",
        email: "microsoft@gmail.com",
        password: "1234",
        descripcion: "Empresa dedicada al desarrollo de software",
        imagen: "microsoft.webp"
    }
]

const vacantes = [
    {
        titulo: "Desarrollador iOS",
        descripcion: "Desarrollador iOS con experiencia en Swift y UIKit.",
        requisitos: "Experiencia previa en desarrollo de aplicaciones iOS.",
        salario: 60000,
        estatus: "CREADA",
        destacado: 1,
        categoria: "Tecnología",
        empresa: empresas[0],
        vacante_id: 1,
        ubicacion: "madrid"
    },
    {
        titulo: "Ingeniero de Machine Learning",
        descripcion: "Ingeniero de Machine Learning para proyectos de inteligencia artificial.",
        requisitos: "Experiencia en Python, TensorFlow y modelos de aprendizaje automático.",
        salario: 80000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[1],
        vacante_id: 2,
        ubicacion: "barcelona"
    },
    {
        titulo: "Médico General",
        descripcion: "Médico general para atención primaria.",
        requisitos: "Licenciatura en medicina y título homologado.",
        salario: 50000,
        estatus: "CREADA",
        destacado: 1,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 3,
        ubicacion: "pamplona"
    },
    {
        titulo: "Cajero/a",
        descripcion: "Atención al cliente y manejo de caja.",
        requisitos: "Experiencia previa en atención al cliente.",
        salario: 20000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 4,
        ubicacion: "valencia"
    },
    {
        titulo: "Director de Marketing y Publicidad",
        descripcion: "Se requiere de un director para el departamento de marketing y publicidad",
        requisitos: "Experiencia mínima de 2 años ejerciendo como director",
        salario: 85000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Marketing",
        empresa: empresas[4],
        vacante_id: 5,
        ubicacion: "valencia"
    },
    {
        titulo: "Chef",
        descripcion: "Se requiere de cocinero/a para el departamento de alimentación",
        requisitos: "Experiencia mínima de 3 años ejerciendo como chef",
        salario: 32000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[1],
        vacante_id: 6,
        ubicacion: "madrid"
    },
    {
        titulo: "Especialista en Inteligencia Artificial (IA)",
        descripcion: "Se necesita desarrollador especialista en IA",
        requisitos: "Altos conocimientos en desarrollo de IA con Python",
        salario: 40000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[1],
        vacante_id: 7,
        ubicacion: "barcelona"
    },
    {
        titulo: "Ingeniero de Software",
        descripcion: "Desarrolla software innovador y de vanguardia para millones de usuarios en todo el mundo",
        requisitos: "Conocimientos de Python, Java o C++. Habilidades de resolución de problemas.",
        salario: 40000,
        estatus: "CREADA",
        destacado: 1,
        categoria: "Tecnología",
        empresa: empresas[1],
        vacante_id: 8,
        ubicacion: "pamplona"
    },
    {
        titulo: "Científico de Datos",
        descripcion: "Utiliza datos para obtener información valiosa y tomar decisiones estratégicas",
        requisitos: "Experiencia en análisis de datos. Habilidades de visualización de datos",
        salario: 25000,
        estatus: "CREADA",
        destacado: 1,
        categoria: "Tecnología",
        empresa: empresas[1],
        vacante_id: 9,
        ubicacion: "valencia"
    },
    {
        titulo: "Especialista en Marketing Digital",
        descripcion: "Desarrolla estrategias de marketing digital efectivas para promover los productos y servicios de Google",
        requisitos: "Conocimientos de SEO, SEM y analítica web. Experiencia en marketing digital",
        salario: 21000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[1],
        vacante_id: 10,
        ubicacion: "barcelona"
    },
    {
        titulo: "Ingeniero de Redes",
        descripcion: "Diseña y desarrolla software de alta calidad para dispositivos Apple, como iPhone, iPad y Mac",
        requisitos: "Experiencia en desarrollo de software. Conocimientos de programación en Swift, Objective-C o C++",
        salario: 38000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[0],
        vacante_id: 11,
        ubicacion: "valencia"
    },
    {
        titulo: "Diseñador de Productos",
        descripcion: "Crea diseños innovadores y atractivos para los productos de Apple, desde dispositivos hasta software",
        requisitos: "Experiencia en diseño de productos. Conocimientos de herramientas de diseño como Adobe Creative Suite",
        salario: 26000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[0],
        vacante_id: 12,
        ubicacion: "madrid"
    },
    {
        titulo: "Especialista en Experiencia del Cliente",
        descripcion: "Proporciona soporte técnico y asistencia a los clientes de Apple para garantizar una experiencia excepcional",
        requisitos: "Experiencia en atención al cliente o soporte técnico. Conocimientos profundos de los productos y servicios de Apple",
        salario: 18000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[0],
        vacante_id: 13,
        ubicacion: "valencia"
    },
    {
        titulo: "Gerente de Marketing",
        descripcion: "Desarrolla y ejecuta estrategias de marketing para promover los productos y servicios de Apple",
        requisitos: "Capacidad para desarrollar campañas creativas y efectivas. Conocimientos de análisis de mercado y tendencias",
        salario: 24000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Marketing",
        empresa: empresas[0],
        vacante_id: 14,
        ubicacion: "pamplona"
    },
    {
        titulo: "Ingeniero de Hardware",
        descripcion: "Diseña y desarrolla hardware de vanguardia para dispositivos Apple, desde computadoras hasta dispositivos móviles",
        requisitos: "Experiencia en diseño de hardware. Conocimientos de electrónica y diseño de circuitos",
        salario: 52000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[0],
        vacante_id: 15,
        ubicacion: "madrid"
    },
    {
        titulo: "Enfermero/a",
        descripcion: "Proporciona atención y cuidados de enfermería a pacientes en diferentes áreas, como hospitalización, unidades de cuidados intensivos, quirófano, entre otros",
        requisitos: "Título de Grado en Enfermería",
        salario: 20000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 16,
        ubicacion: "valencia"
    },
    {
        titulo: "Médico/a Especialista en Traumatología",
        descripcion: "Diagnostica y trata enfermedades y lesiones relacionadas con el sistema musculoesquelético, incluyendo fracturas, luxaciones y lesiones deportivas",
        requisitos: "Título de Médico/a Especialista en Traumatología",
        salario: 55000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 17,
        ubicacion: "madrid"
    },
    {
        titulo: "Técnico/a de Radiología",
        descripcion: "Realiza estudios radiológicos siguiendo las indicaciones del médico radiólogo, asegurando la calidad de las imágenes obtenidas",
        requisitos: "Título de Técnico/a Superior en Imagen para el Diagnóstico y Medicina Nuclear",
        salario: 27000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 18,
        ubicacion: "barcelona"
    },
    {
        titulo: "Auxiliar de Enfermería",
        descripcion: "Asiste al personal de enfermería en la atención directa a los pacientes, realizando tareas de higiene, movilización y control de constantes vitales",
        requisitos: "Título de Técnico/a en Cuidados Auxiliares de Enfermería",
        salario: 24000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 19,
        ubicacion: "valencia"
    },
    {
        titulo: "Administrativo/a de Admisión",
        descripcion: "Gestiona el proceso de admisión de pacientes en el centro hospitalario, recopilando información, realizando trámites administrativos y coordinando agendas",
        requisitos: "Título de Formación Profesional en Administración y Finanzas o similar",
        salario: 17000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Salud",
        empresa: empresas[2],
        vacante_id: 20,
        ubicacion: "madrid"
    },
    {
        titulo: "Cajero/a",
        descripcion: "Atiende a los clientes en el mostrador, toma los pedidos, procesa los pagos y maneja la caja registradora",
        requisitos: "Experiencia previa en atención al cliente deseable",
        salario: 14000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 21,
        ubicacion: "pamplona"
    },
    {
        titulo: "Cocinero/a",
        descripcion: "Prepara alimentos siguiendo los estándares de la empresa, operando equipos de cocina y manteniendo el área de trabajo limpia y ordenada",
        requisitos: "Experiencia previa en cocina rápida o restauración rápida deseable",
        salario: 16000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 22,
        ubicacion: "valencia"
    },
    {
        titulo: "Gerente de Restaurante",
        descripcion: "Supervisa las operaciones diarias del restaurante, gestionando al equipo de empleados, controlando inventarios, y asegurando la satisfacción del cliente",
        requisitos: "Experiencia previa en gestión de equipos en el sector de restauración rápida",
        salario: 21000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 23,
        ubicacion: "barcelona"
    },
    {
        titulo: "Asistente de Gerente de Restaurante",
        descripcion: "Apoya al gerente en la gestión diaria del restaurante, supervisando al personal, garantizando el cumplimiento de los estándares de calidad y atención al cliente",
        requisitos: "Experiencia previa en roles de supervisión en restaurantes de comida rápida",
        salario: 18000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 24,
        ubicacion: "madrid"
    },
    {
        titulo: "Limpieza y Mantenimiento",
        descripcion: "Realiza tareas de limpieza y mantenimiento del restaurante, incluyendo la limpieza de áreas comunes, sanitarios y áreas de cocina",
        requisitos: "Experiencia previa en limpieza o mantenimiento preferida",
        salario: 16000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Alimentación",
        empresa: empresas[3],
        vacante_id: 25,
        ubicacion: "valencia"
    },
    {
        titulo: "Ingeniero de Software",
        descripcion: "Desarrolla, prueba y mantiene software de alta calidad, participando en todas las fases del ciclo de vida del desarrollo de software",
        requisitos: "Experiencia con lenguajes de programación como Java, C++, C# o Python",
        salario: 62000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[4],
        vacante_id: 26,
        ubicacion: "barcelona"
    },
    {
        titulo: "Especialista en Seguridad de la Información",
        descripcion: "Protege la infraestructura, los datos y los sistemas de la empresa, identificando vulnerabilidades y aplicando medidas de seguridad",
        requisitos: "Experiencia previa en seguridad de la información o ciberseguridad",
        salario: 65000,
        estatus: "CREADA",
        destacado: 1,
        categoria: "Tecnología",
        empresa: empresas[4],
        vacante_id: 27,
        ubicacion: "madrid"
    },
    {
        titulo: "Ingeniero de Desarrollo de Cloud",
        descripcion: "Diseña, implementa y mantiene soluciones basadas en la nube, utilizando plataformas como Azure o AWS",
        requisitos: "Experiencia en desarrollo de aplicaciones en la nube",
        salario: 56000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[4],
        vacante_id: 28,
        ubicacion: "valencia"
    },
    {
        titulo: "Gerente de Proyecto de Tecnología",
        descripcion: "Lidera equipos de desarrollo de software para entregar proyectos tecnológicos en tiempo y forma, gestionando recursos y comunicándose con los stakeholders",
        requisitos: "Certificaciones en gestión de proyectos como PMP o PRINCE2",
        salario: 68000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[4],
        vacante_id: 29,
        ubicacion: "madrid"
    },
    {
        titulo: "Especialista en Inteligencia Artificial",
        descripcion: "Desarrolla soluciones de inteligencia artificial y aprendizaje automático para mejorar productos y servicios de la empresa",
        requisitos: "Conocimientos de frameworks como TensorFlow, PyTorch o scikit-learn",
        salario: 75000,
        estatus: "CREADA",
        destacado: 0,
        categoria: "Tecnología",
        empresa: empresas[4],
        vacante_id: 30,
        ubicacion: "pamplona"
    }




];

const usuarios = [

    {
        usuario_id: 1,
        nombre: "Usuario1",
        email: "usuario1@gmail.com",
        password: "1234",
        username: "Usuario1"
    },
    {
        usuario_id: 2,
        nombre: "Usuario2",
        email: "usuario2@gmail.com",
        password: "1234",
        username: "Usuario2"
    },
    {
        usuario_id: 3,
        nombre: "Usuario3",
        email: "usuario3@gmail.com",
        password: "1234",
        username: "Usuario3"
    },
    {
        usuario_id: 4,
        nombre: "Tomas",
        email: "tomasin@gmail.com",
        password: "1234",
        username: "Tomasin"
    },
    {
        usuario_id: 5,
        nombre: "Usuario5",
        email: "usuario5@gmail.com",
        password: "1234",
        username: "Usuario5"
    }
];

const solicitudes = [
    {
        solicitud_id: 1,
        archivo: "archivo1.pdf",
        comentarios: "Estoy interesado en la vacante de Desarrollador iOS",
        fecha: new Date(),
        vacante: vacantes[0], // Utilizando la primera vacante de la lista
        usuario: usuarios[0], // Utilizando el primer usuario de la lista
        estado: 0
    },
    {
        solicitud_id: 2,
        archivo: "archivo2.pdf",
        comentarios: "Quiero aplicar para la posición de Médico General",
        fecha: new Date(),
        vacante: vacantes[2], // Utilizando la tercera vacante de la lista
        usuario: usuarios[1], // Utilizando el segundo usuario de la lista
        estado: 0
    },
    {
        solicitud_id: 3,
        archivo: "archivo3.pdf",
        comentarios: "Quiero aplicar para la posición de Médico General",
        fecha: new Date(),
        vacante: vacantes[3], // Utilizando la tercera vacante de la lista
        usuario: usuarios[2], // Utilizando el segundo usuario de la lista
        estado: 0
    },
    {
        solicitud_id: 4,
        archivo: "archivo4.pdf",
        comentarios: "Quiero aplicar para la posición de Médico General",
        fecha: new Date(),
        vacante: vacantes[3], // Utilizando la tercera vacante de la lista
        usuario: usuarios[0], // Utilizando el segundo usuario de la lista
        estado: 0
    }

];

module.exports = { empresas, vacantes, solicitudes, usuarios };