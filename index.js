const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const conectarBD = require("./mongo.js");
const routerEmpresas = require("./routes/empresas.js");
const routerVacantes = require("./routes/vacantes.js");
const routerUsuarios = require("./routes/usuarios.js");
const routerSolicitudes = require("./routes/solicitudes.js");

// Establece la conexión a la base de datos MongoDB
conectarBD();

// Middleware para permitir solicitudes de diferentes orígenes (CORS)
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta 'web'
app.use(express.static(path.join(__dirname, "..", "client", "web")));

// Middleware para servir archivos estáticos (CSS y JS)
app.use(
  "/styles",
  express.static(path.join(__dirname, "./public/assets/styles"))
);
app.use(
  "/scripts",
  express.static(path.join(__dirname, "./public/assets/scripts"))
);
app.use("/images", express.static(path.join(__dirname, "./public/assets/img")));
app.use(
  "./uploads/images",
  express.static(path.join(__dirname, "./public/uploads/img"))
);
app.use(
  "/fonts",
  express.static(path.join(__dirname, "./public/assets/fonts"))
);

// Middleware para manejar las solicitudes de la página principal
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Ruta para cargar la página vacantes.html
app.get("/vacantes.html", function (req, res) {
  res.sendFile(path.join(__dirname, "public",  "vacantes.html"));
});

// Middleware para enrutar las solicitudes a diferentes rutas de la API
app.use("/api/empresas", routerEmpresas);
app.use("/api/vacantes", routerVacantes);
app.use("/api/usuarios", routerUsuarios);
app.use("/api/solicitudes", routerSolicitudes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
