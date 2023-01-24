const express = require('express');
const { existsSync } = require('fs');
const app = new express();

const products = require('../ProductManager.js');
const classProducts = new products('./Products.json');

app.get('/products', (req, res) =>{
    let limit = req.query.limit;
    classProducts.getProducts().then(
        resp =>
        { 
            if(limit) {
                let newProduct = [];
                resp.forEach(element => {
                    if(newProduct.length <= limit)
                        newProduct.push(element); 
                });
                return res.send(newProduct)
            }
            return res.send(resp) 
        } 
    );
});

app.get('/product/:pid', (req, res) =>{
    let id = req.params.pid;
    classProducts.getProductById(id).then(
        resp =>
        { 
            return res.send(resp)
        } 
    );
})

const server = app.listen(8080, () => console.log('server listening on port 8080'));
server.on('error', error => console.log(error));