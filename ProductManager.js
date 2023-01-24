const fs = require('fs');

class ProductManager {

    pathFile;

    constructor(strPath) {
        //console.log(strPath);
        this.pathFile = strPath;
        
        if (!fs.existsSync(this.pathFile)) {
            console.log('fffff');
            try {
                fs.promises.writeFile(this.pathFile, JSON.stringify([]));
                console.log('archivo creado');
            }
            catch (error) {
                console.log(error);
                return error;
                
            }
        }
    }

    async addProduct(producto) {
        try {
            if (producto.title && producto.description && producto.price && producto.thumbnail && producto.code && producto.stock) {
                let data = await fs.promises.readFile(this.pathFile, 'utf-8');
                let productos = JSON.parse(data);
                let verificacion = productos.find(elem => elem.code == producto.code);
                if (verificacion) {
                    return 'código de producto ya existe.';
                }
                else {
                    producto.id = productos.length + 1;
                    productos.push(producto);
                    await fs.promises.writeFile(this.pathFile, JSON.stringify(productos));
                    return 'Nuevo producto agregado.';
                }
            }
            else {
                return 'todos los campos son necesarios.';
            }
        }
        catch (error) {
            return error;
        }
    }

    async getProducts() {
        let data = await fs.promises.readFile(this.pathFile, 'utf-8');
        let productos = JSON.parse(data);
        return productos;
    }

    async getProductById(id) {
        let data = await fs.promises.readFile(this.pathFile, 'utf-8');
        let productos = JSON.parse(data);
        let busqueda = productos.find(elem => elem.id == id);
        if (busqueda)
            return busqueda;
        else
            return `Not Found`;
    }

    async updateProduct(idProducto, producto) {
        try {
            let data = await fs.promises.readFile(this.pathFile, 'utf-8');
            let productos = JSON.parse(data);
            let listaProductos = [];
            let encontrado = false;
            productos.forEach(elemento => {
                if (elemento.id == idProducto) {
                    encontrado = true;
                    elemento.title = producto.title;
                    elemento.description = producto.description;
                    elemento.price = producto.price;
                    elemento.thumbnail = producto.thumbnail;
                    elemento.code = producto.code;
                    elemento.stock = producto.stock;
                    listaProductos.push(elemento);
                }
                else {
                    listaProductos.push(elemento);
                }
            });
            await fs.promises.writeFile(this.pathFile, JSON.stringify(listaProductos));
            if (encontrado) {
                return 'Producto actualizado.';
            }
            else {
                return 'Producto no encontrado.';
            }
        }
        catch (error) {
            return error;
        }
    }

    async deleteProduct(idProducto) {
        try {
            let data = await fs.promises.readFile(this.pathFile, 'utf-8');
            let productos = JSON.parse(data);
            let listaProductos = [];
            let encontrado = false;
            productos.forEach(elemento => {
                if (elemento.id == idProducto) {
                    encontrado = true;
                }
                else {
                    listaProductos.push(elemento);
                }
            });
            await fs.promises.writeFile(this.pathFile, JSON.stringify(listaProductos));
            if (encontrado) {
                return 'Producto eliminado.';
            }
            else {
                return 'Producto no encontrado.';
            }
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = ProductManager;


/*let producto = {
    title: 'titulo4',
    description: 'Descripción del producto 4',
    price: 4000000,
    thumbnail: 'htts://www.imagenProducto4.cl',
    code: 'cod-0000004',
    stock: 400
}*/



//let classProduct = new ProductManager('Products.json');
//classProduct.getProducts();
//classProduct.addProduct(producto);
//classProduct.getProductById(2);
//classProduct.updateProduct(2, producto);
//classProduct.deleteProduct(2);

