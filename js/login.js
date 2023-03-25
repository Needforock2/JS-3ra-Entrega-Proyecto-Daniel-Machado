 // verificaion de inicio de sesion y cargar datos iniciales

 //let usuarioEnLS = JSON.parse(localStorage.getItem('usuario'))
 let loginBtn = document.querySelector(".session")


 function actualizarUsuario(usuario){
    
     let userName = document.querySelectorAll(".session-name")
     userName[0].innerHTML = `<i class="fa-solid fa-user-large navlink"></i> ${usuario.toUpperCase()} `
     userName[1].innerHTML = `<i class="fa-solid fa-user-large navlink"></i> ${usuario.toUpperCase()} `
    //toast(`Bienvenido ${usuario}`)
 }

 function cerrarSesion(e){ 
    e.preventDefault()     
     
     localStorage.removeItem("usuario")
     window.location.replace("index.html")
     
    
 }

function capturarUser (){                 
    let usuario = document.getElementById("userName").value            
    if(usuario.trim().length>0){                
        guardarLocal("usuario", usuario.trim())
        actualizarUsuario(usuario.trim())
        let cotAlmacenadas = obtenerLocalS() //obtener las cotizaciones guardadas
        printQuote(cotAlmacenadas) //llama al cotizador como tal
    }else{
        e.preventDefault()
    }             
  
}    

function mostrarModal(){
    let sessionName= document.querySelector("#online-user").innerText.trim()
    let userName = document.querySelector("#userName")
    let loginBtn = document.querySelector(".session")
    let logoffBtn = document.querySelector(".close-session")
    let modalTitle= document.querySelector(".card-title")
    let modalContainer = document.querySelector("#exampleModalCenter")
    
    if(sessionName != "Iniciar Sesión"){
        console.log(sessionName)
        modalContainer.classList.remove("hidden")
        modalTitle.innerText = "¿Desea Cerrar Sesión?"
        userName.value = JSON.parse(localStorage.getItem('usuario'))
        userName.disabled ="true"
        loginBtn.style.display="none"
    }else{
        logoffBtn.style.display="none"
    }
}

loginBtn.addEventListener("click", capturarUser) 

const logoff =document.querySelector(".close-session")
logoff.addEventListener("click", cerrarSesion )