document.body.onload = function(){
//creamos una base de productos precargados
class Producto { //creamos el objeto producto
    constructor(nombre, precio, sku) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        this.sku = sku;
        
    }
}

let productStock =[ ] //creamos los productos y los pusheamos en un array
productStock.push([new Producto("Disco Duro", 50000, 1),1])
productStock.push([new Producto("Monitor", 100000, 2),1])
productStock.push([new Producto("Laptop", 350000, 3),1])
productStock.push([new Producto("CPU", 50000, 4),1])
productStock.push([new Producto("Memoria RAM", 20000, 5),1])


class Cliente { //creamos objeto cliente
    constructor(nombre, apellido, telefono, mail) {
        this.nombre  = nombre;
        this.apellido = apellido
        this.telefono  = telefono;
        this.mail = mail
        
    }
}

class Cotizacion { //creamos objeto cotizacion que se compone de los objetos clientes y productos.
    constructor(cliente, id) {
        this.cliente  = cliente;
        this.productos  = []; //array 2D que contiene el articulo (objeto) y la cantidad
        this.id = id;
        this.subTotal;
        this.iva;
        this.total;
        this.date = new Date();       
       
    }
    agregarProductos(productos){ //metodo para agregar un array de productos directamente al array productos del objeto.
        this.productos = productos
    }
    //metodo para calcular los valores sub-tota iva y total
    obtenerPrecioTotal(){ 
        console.log(this.productos)
        let precios = this.productos.map(item =>item[0].precio)
        let cantidades = this.productos.map(item => item[1])        
        let subTotales = []
        for(let i=0; i< cantidades.length; i++){
            subTotales[i] = cantidades[i]*precios[i]
        }
        
        
        this.subTotal= subTotales.reduce((suma, precio) => suma + precio, 0);
        this.iva = this.subTotal*0.19;
        this.total = this.subTotal + this.iva;
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


function printQuote(arrQuote){   //imprime todas las cotizaciones  
    let quoteList = document.querySelector(".quote-container") 
    let items = document.querySelectorAll(".cotizacion")
        for(let i =0; i<items.length; i++){ //limpiamos el DOM
                items[i].remove()
        }           
  
        for(let cotizacion of arrQuote){
            let quoteItem = document.createElement("div")
            quoteItem.classList.add('col-12',  'justify-content-between', 'cotizacion')           
            quoteItem.innerHTML= `  <ul id="${cotizacion.id}" class="col-12 list-grid justify-content-between">
                                        <li  id="cotizacion">${cotizacion.id}</li>
                                        <li  id="cliente">${cotizacion.cliente.nombre} ${cotizacion.cliente.apellido}</li>                                     
                                        <li  id="fecha">${cotizacion.date.getDate()}-${cotizacion.date.getMonth()+1}-${cotizacion.date.getFullYear()}</li>
                                        <li  id="total">$ ${cotizacion.total}</li> 
                                        <div class="options">
                                            <i id="${cotizacion.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="fa-solid fa-ellipsis-vertical erase-quote ${cotizacion.id}"></i> 
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <h6 id= "Editar ${cotizacion.id}" class="dropdown-item">Editar</h6>
                                                <h6 id="Eliminar ${cotizacion.id}"class="dropdown-item">Eliminar</h6>
                                            </div>
                                    </div>                       
                                    </ul>                     
                                `
            quoteList.appendChild(quoteItem) //agregamos todas las cotizaciones al DOM
        }   
  }



let cotizaciones = [] //array donde estarán todas las cotizaciones
let cotId =2 //valor inicial del Id de la cotizacion

function crearCotizacion (cliente, productos){ // funcion para crear cotizaciones a partir de un objeto cliente y un array de productos, ademas aumenta el contador de ID de la cotizacion
    //console.log(productos)
    cotId +=1;    // aumenta id cada vez que se hace una cotizacion nueva
    let cotizacion = new Cotizacion(cliente, cotId) 
    cotizacion.agregarProductos(productos)
    cotizacion.obtenerPrecioTotal()
    console.log(productos)
    cotizaciones.push(cotizacion)
    console.log("Lista de cotizaciones:")
    console.log(cotizaciones)
    //finalQuote(cotizacion)
    
    printQuote(cotizaciones) //llama al cotizador como tal
}

function editarCotizacion(cotizacion, listaArticulos){
    cotizacion.agregarProductos(listaArticulos)
    cotizacion.obtenerPrecioTotal()
    printQuote(cotizaciones)
    console.log("Lista de cotizaciones:")
    console.log(cotizaciones)

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



function datosIniciales(){ //creamos cotizaciones hardcoded para mostrar desde el principio
    let arrQuoteInicial =[]
    let cliente1= new Cliente("Emiliano", "machado", 123465, "emiliano@gmail.com")
    let cliente2= new Cliente("Sara", "Cabrera", 123465, "sara@gmail.com")
    let quote1 = new Cotizacion(cliente1,1)
    let quote2 = new Cotizacion(cliente2,2)
    quote1.productos=productStock
    quote1.obtenerPrecioTotal()   
    quote2.productos=productStock
    quote2.obtenerPrecioTotal()        
    cotizaciones.push(quote1)
    cotizaciones.push(quote2)
    console.log(cotizaciones)
    //console.log(arrQuoteInicial)
    printQuote(cotizaciones)
    //requestInfo();
}
 
datosIniciales()

//funcion para eliminar cotizaciones

function eraseQuote(id){
    //console.log("hola "+ id)
    for(let i=0; i<cotizaciones.length; i++){
        //console.log(cotizacion)
        if(cotizaciones[i].id == id){            
            cotizaciones.splice(i,1)
            let quoteToErase = document.getElementById(id)
            quoteToErase.remove()
                        
        }
    }
}

 function  showQuote(quoteId){ //nos muestra una cotizacion a editar segun el ID de la cotizacion
    
    let cotizacion={}
    let nombre = document.getElementById("customerName")
     let apellido = document.getElementById("customerLastName")
     let telefono = document.getElementById("customerPhone")
     let mail = document.getElementById("customerEmail") 
     let titulo = document.querySelector("#titulo")      
     blankQuote()  // generamos una cotizacion en blanco
     titulo.innerText = `COTIZACIÓN #${quoteId}`
    if(parseInt(quoteId)){
        for(let i=0; i<cotizaciones.length; i++){  
             // rellenamos todos los campos del formulario con los datos de la cotizacion original
            if(cotizaciones[i].id == quoteId){            
                cotizacion = cotizaciones[i]  
                //colocamos los datos del cliente             
                nombre.value = cotizacion.cliente.nombre
                apellido.value= cotizacion.cliente.apellido
                telefono.value= cotizacion.cliente.telefono
                mail.value = cotizacion.cliente.mail                
                let articulosCotizados = cotizacion.productos
                let articulosSeleccionados = document.querySelectorAll(".form-check-input")                              
                for(let articulo of articulosCotizados){                        
                        for(let producto of articulosSeleccionados){
                            let cantidades= document.querySelector(`#SKU-${articulo[0].sku}`)
                            cantidades.value=articulo[1] //colocamos las cantidades de cada producto
                            if(producto.value==articulo[0].sku){
                                producto.checked = true //colocamos los check a los productos
                            }
                          
                        }           
                      
                }        
            }
        }
        
    }  
    
} 

function eraseItem(){ //borramos los articulos de la lista para que no se agreguen nuevamente
    let articulos = document.querySelectorAll(".form-check")
   
    for(let articulo=0; articulo<articulos.length; articulo++){       
        articulos[articulo].remove()
    }
}

function blankQuote (){ //creamos el formulario en blanco con la lista de articulos
    //limpiamos el formulario
    let titulo = document.querySelector("#titulo")
     titulo.innerText = `COTIZACIÓN` 
    let form= document.querySelector("#quote-form")
    form.reset()


    let quoteForm = document.getElementsByClassName("quote-form-container")[0]
    quoteForm.style.display="block"    
    let articulos = document.querySelector(".contenedor-articulos")

    eraseItem() //limpiamos el DOM


   for(let articulo of productStock){   
    let item =document.createElement("div")    
    item.classList.add('form-check', 'd-flex','row', 'align-items-center', 'justify-content-around')
    item.innerHTML= `   <div class="col-6">
                            <input class="form-check-input" type="checkbox" name="exampleRadios" id="exampleRadios" value=${articulo[0].sku} >
                            <label class="form-check-label" for="exampleRadios1">${articulo[0].nombre}</label>
                        </div>
                        <div class="col-3"> 
                            <input type="number" class="form-control" id="SKU-${articulo[0].sku}" placeholder="0" min="0" required>
                        </div>
                          `
    articulos.appendChild(item) // creamos la lista de los articulos y mostramos en pantalla

   
   }      
}

function captureInputs(event){
    event.preventDefault()
    //capturar datos de los input del formulario
    let nombre = document.getElementById("customerName").value
    let apellido = document.getElementById("customerLastName").value
    let telefono = document.getElementById("customerPhone").value
    let mail = document.getElementById("customerEmail").value
    let newCliente = new Cliente(nombre, apellido,telefono,mail)    

    let titulo = document.querySelector("#titulo")
     if(titulo.innerText.match(/\d/g) != null){ //si no es null entonces estamos editando una cotizacion existente
        let quoteID = titulo.innerText.match(/\d/g)[0] //leemos el id de la cotizacion
        let cotizacion = cotizaciones.filter(cotizacion=> cotizacion.id == quoteID) //y la extraemos del array de cotizaciones
        cotizacion[0].cliente = newCliente
        let articulosSeleccionados = document.querySelectorAll(".form-check-input")
            let listaArticulos =[]
            for(let articulo of articulosSeleccionados){
                if(articulo.checked){                    
                        for(let producto of productStock){
                            if(articulo.value == producto[0].sku){
                                let cantidad = document.querySelector(`#SKU-${producto[0].sku}`)                    
                                listaArticulos.push([producto[0], cantidad.value])                               
                            }
                        }
                }   
            }
            console.log(listaArticulos.length)
            if(listaArticulos.length>=1){                
                editarCotizacion(cotizacion[0], listaArticulos)                
                closeQuote()
            }else{
                confirm("Debes seleccionar al menos un producto")
           } 
        
     } else if(nombre=="" || apellido=="" || telefono=="" || mail==""){ //validamos que todos los campos esten rellenados
        confirm("Debes ingresar todos los datos del cliente")
     } else{  // sino, entonces estamos creando una nueva cotizacion     
           //capturar los checkbox de los articulos           
            let articulosSeleccionados = document.querySelectorAll(".form-check-input")
            let listaArticulos =[]          
            for(let articulo of articulosSeleccionados){               
                if(articulo.checked){                               
                        for(let producto of productStock){
                            if(articulo.value == producto[0].sku){  
                                console.log(producto[0].sku)
                                let cantidad = document.querySelector(`#SKU-${producto[0].sku}`)                  
                                listaArticulos.push([producto[0], cantidad.value])
                                
                            }
                        }                       
                }    
            }
            console.log(listaArticulos.length)
            if(listaArticulos.length>=1){
                crearCotizacion(newCliente, listaArticulos)              
                closeQuote()
            }else{
                confirm("Debes seleccionar al menos un producto")
            }
        }
 
}



function closeQuote (){
    let quoteForm = document.getElementsByClassName("quote-form-container")
    for(let i=0; i<quoteForm.length; i++){
        //console.log(quoteForm)
        quoteForm[i].style.display="none"
    }   
    
      
}



/* eventos */
//crear una nueva cotizacion
let newQuote = document.querySelector(".new-quote")
newQuote.addEventListener("click", blankQuote)

//eliminar - editar una cotizacion
window.onclick = e => {
    let quoteId= e.target.id.split(" ")
    //console.log(quoteId)
    if(quoteId[0]=="Eliminar"){
        eraseQuote(quoteId[1])
    }else if(quoteId[0]=="Editar"){      
        showQuote(quoteId[1])
    }
    
} 

//cerrar pagin de cotizacion
let closeQuoteFn = document.querySelector(".closeForm__btn")
closeQuoteFn.addEventListener("click", closeQuote )

// boton guardar cotizacion
let createQuote =document.querySelector(".quoteForm__btn")
createQuote.addEventListener("click", captureInputs)




}

