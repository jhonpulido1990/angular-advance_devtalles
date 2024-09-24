const express = require("express");
const { dbConection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

// crear el servicio de express
const app = express();

// configurar cors
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

// bases de datos
dbConection();

// rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//mongodb+srv://jjpulido8:gawuV60KeyTEQlon@cluster0.a3hlw.mongodb.net/hospitaldb

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en el puerto " + process.env.PORT);
});
