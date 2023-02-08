let costoArticulo1 = 10000
let costoArticulo2 = 50000
let costoArticulo3 = 5500
let customerName = ""

let x= " "
if(isNaN(parseInt(x))){
    console.log(parseInt(x))
}

function finalQuote(cuenta){
    let iva = cuenta*0.19
    let total = cuenta + iva;   
    alert("Cliente: "+ customerName+"\nEl Sub-total de los productos es $"+ cuenta + "\n" +
           "IVA: $" + iva +"\n" +
           "Total: $" + total )
    console.log("Cliente: "+ customerName + "\nEl Sub-total de los productos es $"+ cuenta + "\n" +
    "IVA: $" + iva +"\n" +
    "Total: $" + total)
}

function sumArticles(quoteList){
    let cuenta = 0;
    for(let i=0; i<quoteList.length; i++){        
        if(quoteList[i]!=" " && quoteList[i]>0 && quoteList[i]<=3){           
            switch (parseInt(quoteList[i])){
                case 1:
                    cuenta += costoArticulo1;                                       
                    break;
                case 2:
                    cuenta += costoArticulo2                                       
                    break;
                case 3:
                    cuenta += costoArticulo3                                         
                    break;
              
            }
       
        } 
    }
       
    finalQuote(cuenta)
}


function showArticles(comfirmation){
    if(comfirmation){
        let quoteList = prompt("1.- Articulo 1 " + costoArticulo1 + " Pesos\n"+ "2.- Articulo 2 " + costoArticulo2 + " Pesos\n" + "3.- Articulo 3 " + costoArticulo3 + " Pesos\n\n"+ "Introduce el(los) numero(s) del(los) articulo(s) a cotizar\nUsa un espacio para separar los numeros")
        let alerta =false
        for(let i=0; i<quoteList.length; i++){            
            if((parseInt(quoteList[i])<0 || parseInt(quoteList[i])>3 || (isNaN(parseInt(quoteList[i])) && quoteList[i] != " "))) {               
                alerta = true                
            }       
        }
        if(alerta){
            //daconsole.log(quoteList[i])
            alert ("Colocaste un articulo no válido")
            showArticles(true)
        }else{
            sumArticles(quoteList)  
        }
              
    }
}

function requestInfo(){
    customerName = prompt("Introduce Nombre y apellido del cliente");
    var comfirmation = confirm("Deseas ver la lista de articulos?");
    showArticles(comfirmation)
}

requestInfo();






