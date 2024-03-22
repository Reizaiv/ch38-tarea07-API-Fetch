
const url = "https://reqres.in/api/users?delay=3";

const getUsersUsingAsyncAwait = async (url) => {

    const resolve = await fetch(url); //JSON CRUDO
    const objetoUsuarios = await resolve.json(); //covertit de JSON a Object
    console.log(objetoUsuarios); // data, page, paginas
    const arregloUsuarios = objetoUsuarios.data; //Guardamos el valor de data en arreglo usuarios que contiene la informacion de cada uno de los usuarios
    console.log(arregloUsuarios); // [{nombre, email, apellido},{nombre, email, apellido},{nombre, email, apellido}...]
    //const valorPagina = objetoUsuarios.page;
    //console.log(valorPagina); // 1

    guardarDatosEnLocalStorage(arregloUsuarios);
    imprimirCartasEnElHtml( crearCardsDeUsuarios(arregloUsuarios) );

}


const crearCardsDeUsuarios = ( arregloDondeEstanLosUsuarios ) => {
    // [ "<div>...</div", "", "" ];
return arregloDondeEstanLosUsuarios.map( porCadaUsuario => `    
<div class="col-1 col-sm-4 col-md-3 mx-1">
<div class="card mb-2 mx-1">
<img src="${porCadaUsuario.avatar}" class="card-img-top rounded-circle mx-auto" alt="...">
<div class="card-body justify-content-center bg-dark text-light">
<h4 class="card-title">${ porCadaUsuario.first_name} ${porCadaUsuario.last_name}</h4>
<h6 class="card-subtitle mb-2">${ porCadaUsuario.email}</h6>
<p class="card-text">Id: ${porCadaUsuario.id}</p>
</div>
</div>
</div>
`  );
}
// [ "<div>...</div", "", "" ]; //Genera un arreglo de cards por cada Usuario

const imprimirCartasEnElHtml = ( arregloDeCartas ) => document.getElementById("user-cards").innerHTML= arregloDeCartas.join("");
                                              //  "<div>...</div" "" "" ;

const guardarDatosEnLocalStorage = (arregloDeUsuarios) => {

    // Guardar en el Local Storage con la marca de tiempo
    const timestamp = new Date().getTime();
    const datosAGuardar = { usuarios: arregloDeUsuarios, hora: timestamp };
    localStorage.setItem("PrimerRequest", JSON.stringify(datosAGuardar));

}

const obtenerDatosDeLocalStorage = () => {
    
    //const url = "https://reqres.in/api/users?delay=3"

    const datosDeLocalStorage = JSON.parse(localStorage.getItem("PrimerRequest")); //OBJETO
    console.log(datosDeLocalStorage);

    const horaActual = new Date().getTime();
    console.log(horaActual);

    if (datosDeLocalStorage === null){ 
        getUsersUsingAsyncAwait(url);
        console.log("Creacion de cartas con URL primer visita");
    } else if(horaActual - datosDeLocalStorage.hora > 60000){
        getUsersUsingAsyncAwait(url);
        console.log("Creacion de cartas con URL tiempo mayor a 1 minuto");
        localStorage.removeItem("PrimerRequest");
    }else{
        imprimirCartasEnElHtml( crearCardsDeUsuarios(datosDeLocalStorage.usuarios) );
        console.log("Creacion de cartas con local storage");
    }
  
    
}

obtenerDatosDeLocalStorage();