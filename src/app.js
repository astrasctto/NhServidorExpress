const express = require('express');
const app = express();
const fs = require('fs');
const { reset } = require('nodemon');

const products = JSON.parse(fs.readFileSync(__dirname + "/Productos.txt"));


app.get('/productos', (req, res) => {
    let limite = req.query.limit;
    if (!limite || products.length == limite) {
        res.send(products);
    }
    else if (products.length > limite) {
        res.send(products.slice(0, limite));
    }
    else if (products.length < limite) {
        res.status(404).send("Limite excedido.");
    }
});

