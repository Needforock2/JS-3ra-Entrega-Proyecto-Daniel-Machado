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
       
        class Usuario {
            constructor(nombre, cotizaciones){
                this.nombre = nombre
                this.cotizaciones = cotizaciones
            }
        }

        class Cliente { //creamos objeto cliente
            constructor(nombre, apellido, telefono, mail, id) {
                this.nombre  = nombre;
                this.apellido = apellido
                this.telefono  = telefono;
                this.mail = mail;
                this.id = id;
                this.cotizaciones = []                
            }
        }

        class Cotizacion { //creamos objeto cotizacion que se compone de los objetos clientes y productos.
            constructor(cliente, id , date) {
                this.cliente  = cliente;
                this.productos  = []; //array 2D que contiene el articulo (objeto) y la cantidad
                this.id = id;
                this.subTotal;
                this.iva;
                this.total;
                this.date = new Date(date || new Date());       
            
            }
                agregarProductos(productos){ //metodo para agregar un array de productos directamente al array productos del objeto.
                    this.productos = productos
                }
                //metodo para calcular los valores sub-tota iva y total
                obtenerPrecioTotal(){ 
                    
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

function toast (mensaje, codigo){
    if(codigo == "error"){
        Toastify({
            text: mensaje,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover       
            style: {
              background: "linear-gradient(90deg, rgba(255,149,0,1) 0%, rgba(255,72,0,1) 35%, rgba(255,0,0,1) 100%)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
            
    }else{
        Toastify({
            text: mensaje,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover       
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }
    
}

        let newQuote = document.querySelector(".new-quote")
        let cotizaciones = [] //array donde estarán todas las cotizaciones
        document.body.onload = function(){
            const cotBtn = document.querySelectorAll("#cotBtn")
            //const prodBtn = document.querySelectorAll("#prodBtn") 
       
            if(usuarioEnLS != null){
                usuario = usuarioEnLS.toUpperCase() 
                for(let i=0; i< cotBtn.length; i++){
                     cotBtn[i].style.display="block"
                    /*prodBtn[i].style.display="block" */
                }
                actualizarUsuario(usuario)
                toast("Cargando Cotizaciones desde el Servidor")
                toast("Por favor espere unos segundos")
                cotizaciones=recibirPantry("cargar")
                
            } else{
                for(let i=0; i< cotBtn.length; i++){
                    cotBtn[i].style.display="none"
                   // prodBtn[i].style.display="none"
                }                
                toast("Inicia sesión para comenzar") 
                newQuote.style.display="none"
                clearQuoteDOM()
                mostrarModal()                
                
                
            }
            
        }
        function clearQuoteDOM(){ //limpia al DOM donde estan las cotizaciones
            let items = document.querySelectorAll(".cotizacion")
            
            for(let i =0; i<items.length; i++){ //limpiamos el DOM
                items[i].remove()
            }
        }
        
        

 // verificaion de inicio de sesion y cargar datos iniciales
    let usuario;
    let usuarioEnLS = JSON.parse(localStorage.getItem('usuario'))

    const guardarLocal = (clave, valor) => { //funcion para guardar en localstorage
        localStorage.setItem(clave, JSON.stringify(valor))       
        
     };

    function obtenerLocalS (){      //obtener cotizaciones en LS   
        let almacenadas= JSON.parse(localStorage.getItem("listaCotizaciones")) 
             
        const cotizaciones = []
        if(almacenadas){
            for(let cotizacion of almacenadas){
                let objected = new Cotizacion(cotizacion.cliente, cotizacion.id)
                objected.agregarProductos(cotizacion.productos)
                objected.obtenerPrecioTotal()
                cotizaciones.push(objected)
            }  
        } //else debo imprimir un mensaje para indicar que no hay cotizaciones
        return cotizaciones       
    }    

function printQuote(arrQuote){   //imprime todas las cotizaciones
     
    let quoteList = document.querySelector(".quote-container") 
        clearQuoteDOM()            
  
        for(let cotizacion of arrQuote){
            let quoteItem = document.createElement("div")
            quoteItem.classList.add('col-12',  'justify-content-between', 'cotizacion')           
            quoteItem.innerHTML= `  <ul id="${cotizacion.id}" class="col-12 quote-list-grid justify-content-between">
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

const spinner = document.querySelector(".sk-circle")
const overlay = document.querySelector(".overlay")
const noCotMsg = document.querySelector("#noCot")


function processPantryData(result, operacion){
    spinner.classList.add("hidden")
    overlay.classList.add("hidden")
    console.log(result["listaCotizaciones"])
    let cotInPantry = result["listaCotizaciones"]
    const cotizacionesPantry = []
    if(result["listaCotizaciones"].length>0){
        noCotMsg.classList.add("hidden")
        if(cotInPantry){
            for(let cotizacion of cotInPantry){
                let objected = new Cotizacion(cotizacion.cliente, cotizacion.id, cotizacion.date)
                objected.agregarProductos(cotizacion.productos)
                objected.obtenerPrecioTotal()            
                cotizacionesPantry.push(objected)
            }  
        }
        if(operacion == "cargar"){
            toast("Datos cargados exitosamente desde la API")
        }
        if(operacion == "borrar"){
            toast("Cotizacion eliminada exitosamente")
        }
        if(operacion == "editar"){
            toast("Cotizacion editada exitosamente")
        }
        if(operacion == "crear"){
            toast("Cotizacion creada exitosamente")
        }
        
        printQuote(cotizacionesPantry)
        guardarLocal("listaCotizaciones", cotizacionesPantry)
        
    }else{
        noCotMsg.classList.remove("hidden")
    }
    cotizaciones = cotizacionesPantry
    
}


const  recibirPantry = async (operacion) => {    
    spinner.classList.remove("hidden")
    overlay.classList.remove("hidden")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,    
    redirect: 'follow'
    };

    try{
        const response = await fetch("https://api.jsonstorage.net/v1/json/0f90dac9-985f-4b19-8bc9-58aeab14a126/679cc292-a9be-4501-9259-b4ea642898c3", requestOptions)
        const resp = await response.json()       
        processPantryData(resp, operacion)
    }
    catch(e){
        console.log(e)
        toast("Ooops algo salió mal con la API", "error")
        toast("Refresca la página para reintentar", "error")
    }   
}
const guardarPantry = async (valor, operacion) =>{
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
    'listaCotizaciones' : valor
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    spinner.classList.remove("hidden")
    
    overlay.classList.remove("hidden")
    
    try{
        const resp = await fetch("https://api.jsonstorage.net/v1/json/0f90dac9-985f-4b19-8bc9-58aeab14a126/679cc292-a9be-4501-9259-b4ea642898c3?apiKey=cff9f49f-9b9e-4fe8-97ee-124643309064", requestOptions)
        recibirPantry(operacion)
    }
    catch(e){
        console.log(e)
        toast("Ooops algo salió mal con la API", "error")
        toast("Refresca la página para reintentar", "error")
    }
    
 
}

function crearCotizacion (cliente, productos){ // funcion para crear cotizaciones a partir de un objeto cliente y un array de productos, ademas aumenta el contador de ID de la cotizacion
   
    let cotLS = obtenerLocalS()
    
    let lastQuoteId =0;
    if(cotLS.length>0){
        lastQuoteId = cotLS[cotLS.length-1].id   // ID de la ultima cotizacion
    }    
        
    let cotizacion = new Cotizacion(cliente, lastQuoteId+1)    
    cotizacion.agregarProductos(productos)
    cotizacion.obtenerPrecioTotal()    
    cotizaciones.push(cotizacion)  
    
    guardarLocal("listaCotizaciones", cotizaciones) //guardar en LS
    toast("Creando Cotización")
    spinner.classList.remove("hidden")
    overlay.classList.remove("hidden")
    guardarPantry(cotizaciones, "crear") // guardar JSON en API Pantry
   
    
}

function editarCotizacion(cotizacion, listaArticulos){ 
    
    cotizacion.agregarProductos(listaArticulos)
    cotizacion.obtenerPrecioTotal()
    guardarLocal("listaCotizaciones", cotizaciones)
    toast("Editando Cotización, por favor espere")
    guardarPantry(cotizaciones, "editar")
    
}

let clientes = [] //array donde se guardan los clientes registrados

//funcion para eliminar cotizaciones

function eraseQuote(id){    
    for(let i=0; i<cotizaciones.length; i++){        
        if(cotizaciones[i].id == id){            
            cotizaciones.splice(i,1)
            let quoteToErase = document.getElementById(id)
            quoteToErase.remove()
            guardarLocal("listaCotizaciones", cotizaciones)
            toast("Eliminando Cotización, por favor espere")
            guardarPantry(cotizaciones, "borrar")
                                  
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

function eraseItem(){ //borramos los articulos de la lista del DOM para que no se agreguen nuevamente
    let articulos = document.querySelectorAll(".form-check")   
    for(let articulo=0; articulo<articulos.length; articulo++){       
        articulos[articulo].remove()
    }
}

function blankQuote (){ //creamos el formulario en blanco con la lista de articulos
    //limpiamos el formulario   
    
    overlay.classList.remove("hidden")
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
        let quoteID = titulo.innerText.match(/\d/g).join("") //leemos el id de la cotizacion
        
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
            
            if(listaArticulos.length>=1){                
                editarCotizacion(cotizacion[0], listaArticulos)                
                closeQuote()
                
            }else{
                toast("Debes seleccionar al menos un articulo")
           } 
        
     } else if(nombre=="" || apellido=="" || telefono=="" || mail==""){ //validamos que todos los campos esten rellenados
        //confirm("Debes ingresar todos los datos del cliente")
        event.preventDefault()
     } else{  // sino, entonces estamos creando una nueva cotizacion     
           //capturar los checkbox de los articulos           
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
            
            if(listaArticulos.length>=1){
                crearCotizacion(newCliente, listaArticulos)              
                closeQuote()
               
            }else{
                toast("Debes seleccionar al menos un articulo")
            }
        }
 
}

function closeQuote (){    
    overlay.classList.add("hidden")
    let quoteForm = document.getElementsByClassName("quote-form-container")
    for(let i=0; i<quoteForm.length; i++){
        //console.log(quoteForm)
        quoteForm[i].style.display="none"
    }     
      
}

/* eventos */
//crear una nueva cotizacion

newQuote.addEventListener("click", blankQuote)

//eliminar - editar una cotizacion
window.onclick = e => {
    let quoteId= e.target.id.split(" ")
   
    if(quoteId[0]=="Eliminar"){
        eraseQuote(quoteId[1])
    }else if(quoteId[0]=="Editar"){      
        showQuote(quoteId[1])
    }else if(quoteId[0]=="online-user"){
        mostrarModal()
    } 
} 

//cerrar pagina de cotizacion
let closeQuoteFn = document.querySelector(".closeForm__btn")
closeQuoteFn.addEventListener("click", closeQuote )

// boton guardar cotizacion
let createQuote =document.querySelector(".quoteForm__btn")
createQuote.addEventListener("click", captureInputs)

// chequear el tamaño de la pantalla:
function reportWindowSize() {    
    var w = window.innerWidth;
    const cotTag = document.querySelector(".quote-list-grid").firstElementChild.firstElementChild
   
    if(w<1000){        
        cotTag.innerText = "#"
    }else{
        cotTag.innerText = "# Cotización"
    }
};

window.onresize = reportWindowSize;




