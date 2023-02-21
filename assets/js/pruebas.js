class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        
    }
}

class Cliente {
    constructor(nombre, telefono) {
        this.nombre  = nombre;
        this.telefono  = telefono;
        
    }
}



class Cotizacion {
    constructor(cliente, id) {
        this.cliente  = cliente;
        this.productos  = [];
        this.id = id;
         
       
    }
    agregarProductos(productos){
        this.productos = productos
    }
    
}



let cotizaciones = []


let cliente = new Cliente("daniel", "123456");
let azucar = new Producto("azucar", 5000)
let arrProd = [azucar, azucar]
let cotId =0
function crearCotizacion (cliente, productos){
    cotId +=1;    
    let cotizacion = new Cotizacion(cliente, cotId) 
    cotizacion.agregarProductos(productos)
    cotizaciones.push(cotizacion)   

}

crearCotizacion(cliente, arrProd)
crearCotizacion(cliente, arrProd)
console.log(cotizaciones)

/* let cliente = new Cliente("daniel", "123456");
let azucar = new Producto("azucar", 5000)
let porotos = new Producto("porotos", 15000)
let sal = new Producto("sal", 51000)
let cot1= new Cotizacion(cliente)
cot1.agregarProducto(azucar)
cot1.agregarProducto(porotos)
cot1.agregarProducto(sal)
cot1.aumentarId()
console.log(cot1)

let cot2= new Cotizacion(cliente)
cot2.agregarProducto(azucar)
cot2.agregarProducto(porotos)
cot2.agregarProducto(sal)
cot2.aumentarId()
console.log(cot2) */
