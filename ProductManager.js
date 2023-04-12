const products = [];
const fs = require('fs');


let codeProd = 1;
class ProductManager {

	constructor() {
		this.products = [];

	}

	addProducts(name, detail, cost, image, cant) {
		if (!name || !detail || !cost || !image || !cant) {
			console.error("Los datos son obligatorios");

		} else {
			products.push({
				title: name, description: detail,
				price: cost, thumbnail: image,
				code: (codeProd++), stock: cant
			});
			fs.writeFileSync("./Productos.txt", JSON.stringify(products));
		}
	}

	getProducts() {
		console.log("Listado de Productos:\n");
		for (let i = 0; i < JSON.parse(fs.readFileSync("./Productos.txt")).length; i++) {
			console.log(JSON.parse(fs.readFileSync("./Productos.txt"))[i]);
			console.log("-----------------");
		}
	}

	getProductbyID(id) {
		const product = [];
		for (let j = 0; j < JSON.parse(fs.readFileSync("./Productos.txt",)).length; j++) {
			if (id == JSON.parse(fs.readFileSync("./Productos.txt",))[j].code) {
				product.push(JSON.parse(fs.readFileSync("./Productos.txt",))[j]);
			}
		}
		if (product.length != 0) {
			return product;
		}
		else return [];
	}

	updateProduct(id, field, value) {
		const updateList = JSON.parse(fs.readFileSync("./Productos.txt"));
		if (this.getProductbyID(id).length == 0) {
			console.error("No existe el producto.");

		} else {
			let indice = updateList.findIndex(function (product) {
				if (product.code == id) {
					return true;
				}
			});

			switch (field) {
				case "nombre":
					updateList[indice].title = value;
					break;
				case "detalle":
					updateList[indice].description = value;
					break;
				case "precio":
					updateList[indice].price = value;
					break;
				case "imagen":
					updateList[indice].thumbnail = value;
					break;
				case "stock":
					updateList[indice].stock = value;
					break;

				default:
					console.log("El campo a modificar no existe.");
					break;
			}
			fs.writeFileSync("./Productos.txt", JSON.stringify(updateList));
		}
	}

	deleteProduct(id) {
		const deleteItem = JSON.parse(fs.readFileSync("./Productos.txt"));
		deleteItem.splice(deleteItem.findIndex(function (product) {
			if (product.code == id) {
				return true;
			}
		}));
		fs.writeFileSync("./Productos.txt", JSON.stringify(deleteItem));
	}
}


const listaProductos = new ProductManager();
//Carga de productos.

function numRandom() {
	let numberRan = parseInt((Math.random() * 10) + 1);
	return numberRan;
}

//Carga de datos. Codigo generado aleatorio y verificacion de no repetir codigo.

for (let i = 0; i < 3; i++) {
	listaProductos.addProducts("Producto" + (i + 1), "Descripcion" + (i + 1), (numRandom() * 100), "Image" + (i + 1), (numRandom() * 10));
}

//Listado de Productos
listaProductos.getProducts();

//Declarando el ID se puede verificar si existe el producto o no.

let productCode = 2;
console.log("Busqueda de producto por Codigo " + productCode);
if (listaProductos.getProductbyID(productCode).length == 0) {
	console.log("No existe el producto");
}
else {
	console.log(listaProductos.getProductbyID(productCode));
}

//Modificar un producto.

listaProductos.updateProduct(2, "stock", 10);
listaProductos.updateProduct(3, "origen", "Cordoba");

listaProductos.getProducts();

//Eliminar un producto
listaProductos.deleteProduct(3);

console.log("Se elimino un producto.");

listaProductos.getProducts();