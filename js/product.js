/* pagina productos */

class Producto { //creamos el objeto producto
    constructor(nombre, precio, sku) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        this.sku = sku;
        
    }
}

function toast (mensaje){
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

function actualizarUsuario(usuario){
    console.log(usuario)
    let userName = document.querySelectorAll(".session-name")
    userName[0].innerHTML = `<i class="fa-solid fa-user-large navlink"></i> ${usuario.toUpperCase()} `
    userName[1].innerHTML = `<i class="fa-solid fa-user-large navlink"></i> ${usuario.toUpperCase()} `
   
}

function renderProducts(arrProducts){   //imprime todas las cotizaciones
     
    let prodList = document.querySelector("#products-container") 
        clearQuoteDOM()            
  
        for(let producto of arrProducts){
            let quoteItem = document.createElement("div")
            quoteItem.classList.add('col-12',  'justify-content-between', 'producto')           
            quoteItem.innerHTML= `  <ul id="${producto.sku}" class="col-12 product-list-grid justify-content-between">
                                        <li  id="sku">${producto.sku}</li>
                                        <li  id="nombre">${producto.nombre}</li>                                     
                                        <li  id="precio">$ ${producto.precio}</li>
                                        
                                        <div class="options">
                                            <i id="${producto.sku}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="fa-solid fa-ellipsis-vertical erase-quote ${producto.sku}"></i> 
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <h6 id= "Editar ${producto.sku}" class="dropdown-item">Editar</h6>
                                                <h6 id="Eliminar ${producto.sku}"class="dropdown-item">Eliminar</h6>
                                            </div>
                                    </div>                       
                                    </ul>                     
                                `
            prodList.appendChild(quoteItem) //agregamos todas las cotizaciones al DOM
        }   
  }

let usuario;
let usuarioEnLS = JSON.parse(localStorage.getItem('usuario'))
let listaProductos = obtenerLocalS()

document.body.onload = function(){
    if(usuarioEnLS != null){
        usuario = usuarioEnLS.toUpperCase() 
        actualizarUsuario(usuario)
        renderProducts(listaProductos)
    } else{
        toast("Inicia sesión para comenzar") 
        //newQuote.style.display="none"
        clearQuoteDOM()
        //mostrarModal()
    }
    
}
function clearQuoteDOM(){ //limpia al DOM donde estan las cotizaciones
    let items = document.querySelectorAll(".producto")
    console.log(items)
    for(let i =0; i<items.length; i++){ //limpiamos el DOM
        items[i].remove()
    }
}

//DOM del FOrmulario de ingreso de productos
const productForm = document.querySelector("#product-form")
const productName = document.querySelector("#productName")
const productPrice = document.querySelector("#productPrice")
const productSKU = document.querySelector("#productSKU")
const overlay = document.querySelector(".overlay")
const prodForm = document.getElementsByClassName("product-form-container")[0]

function resetProductForm(){    
    productForm.reset()
}


function renderProdForm (){ //creamos el formulario en blanco con la lista de articulos  
    
    overlay.classList.remove("hidden")
    let titulo = document.querySelector("#titulo")
     titulo.innerText = `Agregar Productos`    
    productForm.reset()    
    prodForm.style.display="block"    
     
}

const guardarLocal = (clave, valor) => { //funcion para guardar en localstorage
    localStorage.setItem(clave, JSON.stringify(valor))       
    
 };

 function obtenerLocalS (){      //obtener cotizaciones en LS   
    let almacenados= JSON.parse(localStorage.getItem("listaProductos"))        
    const productos = []
    if(almacenados){
        for(let producto of almacenados){
            let objected = new Producto(producto.nombre, producto.precio, producto.sku)           
            productos.push(objected)
        }  
    } //else debo imprimir un mensaje para indicar que no hay cotizaciones
    return productos       
}


function saveProductLS(){ 
    const formTitle = document.querySelector("#titulo")
    let actionType = formTitle.innerText.split(" ")[0]
    if(actionType == "Agregar"){
        let product = new Producto(productName.value, productPrice.value, productSKU.value)
        listaProductos.push(product)
        toast("Articulo Creado Exitosamente")
    }else if(actionType== "Editar"){
        
        for(let product of listaProductos){            
            if(product.sku == productSKU.value){
                product.nombre = productName.value
                product.precio = productPrice.value
            }
        }
        toast("Articulo Modificado Exitosamente")
    }
    guardarLocal("listaProductos", listaProductos)
    resetProductForm()
    closeProdForm()
    renderProducts(listaProductos)

}



const saveProductBtn = document.querySelector("#saveProductBtn")
saveProductBtn.addEventListener("click", saveProductLS)

function eraseProd(SKU){    
    for(let i=0; i<listaProductos.length; i++){        
        if(listaProductos[i].sku == SKU){            
            listaProductos.splice(i,1)
            let prodToErase = document.getElementById(SKU)
            prodToErase.remove()
            guardarLocal("listaProductos", listaProductos)
            renderProducts(listaProductos)
            toast("Producto Eliminado")                        
        }  
    }
}

function editProd(SKU){
    
    renderProdForm()
    const formTitle = document.querySelector("#titulo")
    titulo.innerText = "Editar Producto"
    let listaProductos = obtenerLocalS()
    
    for(let producto of listaProductos){        
        if(producto.sku == SKU){            
            productName.value = producto.nombre
            productPrice.value = producto.precio
            productSKU.value = producto.sku
            productSKU.disabled = "true"
        }
    }
}


window.onclick = e => { 
    let buttonId= e.target.id.split(" ")   
    if(buttonId[0]=="Eliminar"){
        eraseProd(buttonId[1])
    }else if(buttonId[0]=="Editar"){      
        editProd(buttonId[1])
    }else if(buttonId[0]=="online-user"){
        mostrarModal()
    } 
}

function closeProdForm () {
    overlay.classList.add("hidden")   
    prodForm.style.display="none"    

}
const plusBtn = document.querySelector(".new-product")
plusBtn.addEventListener("click", renderProdForm)

const closBtn = document.querySelector("#dismissBtn")
closBtn.addEventListener("click", closeProdForm)

