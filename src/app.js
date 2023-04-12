const express = require('express');
const app = express();

app.get('/saludo', (req, res) => {
    res.send("Hola mundungus. Te manda saludo ojoloco moody");
});

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});