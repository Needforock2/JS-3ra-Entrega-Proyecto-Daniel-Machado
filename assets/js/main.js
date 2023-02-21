//creamos una base de productos precargados
class Producto { //creamos el objeto producto
    constructor(nombre, precio) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        
    }
}

let productStock =[ ] //creamos los productos y los pusheamos en un array
productStock.push(new Producto("Disco Duro", 50000))
productStock.push(new Producto("Monitor", 100000))
productStock.push(new Producto("Laptop", 350000))
productStock.push(new Producto("CPU", 50000))
productStock.push(new Producto("Memoria RAM", 20000))


class Cliente { //creamos objeto cliente
    constructor(nombre, telefono) {
        this.nombre  = nombre;
        this.telefono  = telefono;
        
    }
}

class Cotizacion { //creamos objeto cotizacion que se compone de los objetos clientes y productos.
    constructor(cliente, id) {
        this.cliente  = cliente;
        this.productos  = [];
        this.id = id;
        this.subTotal;
        this.iva;
        this.total;       
       
    }
    agregarProductos(productos){ //metodo para agregar un array de productos directamente al array productos del objeto.
        this.productos = productos
    }//metodo para calcular los valores
    obtenerPrecioTotal(){ 
        this.subTotal= this.productos.map(producto => producto.precio)
                             .reduce((suma, precio) => suma + precio, 0);
        this.iva = this.subTotal*0.19;
        this.total = this.subTotal + this.iva;
    }    
}

function restart(){ // esta funcion reinicia el script si el usuario confirma el confirm
    var confirmation = confirm("Deseas realizar otra cotización?");
    if(confirmation){
        requestInfo();
    }
}

function crearMsj(arr){ // funcion para ensamblar un mensaje para posterior impresion por prompt
    let promptMessage=""
        let n=1
        for (const producto of arr) {           
            promptMessage += `Item ${n} ${producto.nombre} Precio: $${producto.precio} \n`
            n +=1
        }
        return promptMessage;
}

function finalQuote(cotizacion){ // funcion que recibe un objeto cotizacion y llama al metodo de totalizar ademas de imprimir el alert con la cotizacion final
    cotizacion.obtenerPrecioTotal()    //llamada al metodo para totalizar
    let promptMessage= crearMsj(cotizacion.productos)
    alert(  "Cotizacion: #" + cotizacion.id + "\n" +
            "Cliente: "+ cotizacion.cliente.nombre+"\n"+
            "Teléfono: "+ cotizacion.cliente.telefono+"\n"+
            promptMessage + 
            "El Sub-total de los productos es $"+ cotizacion.subTotal + "\n" +
            "IVA: $" + cotizacion.iva +"\n" +
            "Total: $" + cotizacion.total )
    console.log( "Cotizacion: #" + cotizacion.id + "\n" +
                "Cliente: "+ cotizacion.cliente.nombre+"\n"+
                 "Teléfono: "+ cotizacion.cliente.telefono+"\n"+
                promptMessage + 
                "El Sub-total de los productos es $"+ cotizacion.subTotal + "\n" +
                "IVA: $" + cotizacion.iva +"\n" +
                "Total: $" + cotizacion.total )
    restart() //ejecutamos esta funcion para preguntar si desea empezar de nuevo
}

let cotizaciones = [] //array donde estarán todas las cotizaciones
let cotId =0
function crearCotizacion (cliente, productos){ // funcion para crear cotizaciones a partir de un objeto cliente y un array de productos, ademas aumenta el contador de ID de la cotizacion
    cotId +=1;    
    let cotizacion = new Cotizacion(cliente, cotId) 
    cotizacion.agregarProductos(productos)
    cotizaciones.push(cotizacion)
    console.log("Lista de cotizaciones:")
    console.log(cotizaciones)
    finalQuote(cotizacion) //llama al cotizador como tal
}



function showArticles(comfirmation, cliente){ // funcion para mostrar la lista de articulos disponibles para cotizacion, realiza validaciones sobre el input del prompt
    if(comfirmation){
        let promptMessage= crearMsj(productStock)    
        let quoteList = prompt("Selecciona el o los numeros de los productos a cotizar separados por un espacio \n" + promptMessage).split(" ")       
        //console.log(quoteList)
        let listaProductos = []
               
        let alerta =false
        for(let i=0; i<quoteList.length; i++){            
            if((parseInt(quoteList[i])<0 || parseInt(quoteList[i])>productStock.length || (isNaN(parseInt(quoteList[i])) && quoteList[i] != " "))) {               
                alerta = true                
            }       
        }
        if(alerta){            
            alert ("Colocaste un articulo no válido")
            showArticles(true, cliente)
        }else{
            for(let i=0; i<quoteList.length;i++){
                listaProductos.push(productStock[quoteList[i]-1])
            }
            //console.log(cliente)
            crearCotizacion(cliente, listaProductos )
        } 
    }
}

let clientes = [] //array donde se guardan los clientes registrados

function requestInfo(){ // funcion inicial para solicitar datos del cliente
    let customerName = prompt("Introduce Nombre y Apellido del cliente");
    let phone = prompt ("Introduce teléfono del cliente") 
    let cliente = new Cliente(customerName, phone)   
    clientes.push(cliente)
    console.log("Lista de Clientes:")
    console.log(clientes)
    var comfirmation = confirm("¿Deseas ver la lista de articulos?");
    showArticles(comfirmation, cliente); 
    
}


requestInfo();







