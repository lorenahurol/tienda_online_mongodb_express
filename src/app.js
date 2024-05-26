// Creación y configuración de la APP de Express
const express = require('express');
// Cors filtra y controla desde donde llegan las peticiones:
const cors = require('cors');

const app = express();
// Recibir objetos json dentro de nuestra app:
app.use(express.json());
app.use(cors());

// Configuración de rutas: Todas las peticiones que vengan con /api, las gestiona el fichero routes/api
app.use("/api", require("./routes/api"));

// Middlewear de error:
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
    next();
});


module.exports = app;