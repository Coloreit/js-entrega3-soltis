const usuarios = [{
    nombre: 'Evangelina',
    mail: 'eva@mail.com',
    pass: '123456'
},
{
    nombre: 'Agustin',
    mail: 'agus@mail.com',
    pass: '987654'
},
{
    nombre: 'Marta',
    mail: 'martita25@mail.com',
    pass: 'Hola456'
},{
    nombre: 'Mariana',
    mail: 'marianabs@mail.com',
    pass: 'SoyColoreit'
}]

class Producto {

    constructor(nombre, genero, edad, categoria, precio, imagen, id){
        this.nombre = nombre;
        this.genero = genero;
        this.edad = edad;
        this.categoria= categoria;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.id = id;
    }

    asignarId(array){
        this.id = array.length;
    }
}

const productos = [
    new Producto("BODY", "Varon", "0 a 3 meses", "INDUMENTARIA", 300, "./images/indumentaria/Body.jpg", 1),
    new Producto("PANTALON", "Varon", "3 a 6 meses", "INDUMENTARIA", 800,"./images/indumentaria/Ranita.jpg", 2),
    new Producto("BATITA", "Nena", "3 a 6 meses", "INDUMENTARIA", 600, "./images/indumentaria/Batita.jpg", 3),
    new Producto("REMERA", "Nena", "4 años", "INDUMENTARIA", 700, "./images/indumentaria/Remera.jpg", 4),
    new Producto("MAMADERA", "Indistinto", "0 a 12 meses", "ACCESORIOS", 1200, "./images/indumentaria/a-mamadera.png", 5),
    new Producto("CHUPETE", "Indistinto", "0 a 6 meses", "ACCESORIOS", 600, "./images/indumentaria/a-chupete.png", 6),
    new Producto("ENCASTRE", "Indistinto", "0 a 1 año", "JUGUETES", 3200,"./images/indumentaria/j-0-1.jpg", 7),
    new Producto("SHAMPOO", "Indistinto", "0 a 1 año", "PERFUMERIA", 450, "./images/indumentaria/p-shampoo.png", 8),
    new Producto("JABON", "Indistinto", "0 a 1 año", "PERFUMERIA", 350, "./images/indumentaria/p-jabon.png", 9),
]

console.log(productos);

const mailLogin = document.getElementById("emailLogin"),
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    //contTarjetas = document.getElementById("tarjetas"),
    toggles = document.querySelectorAll(".toggles"),
    contenedorTarjetas = document.querySelector(".contenedorTarjetas");

function validarUsuario(usersBD, user, pass) {
    let encontrado = usersBD.find((userBD) => userBD.mail == user);
    
    if (typeof encontrado === "undefined") {
        return false;
    } else {
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioBD, storage) {
    const usuario = {
        "name": usuarioBD.nombre,
        "user": usuarioBD.mail,
        "pass": usuarioBD.pass
    }
    storage.setItem("usuario", JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenid@, <span>${usuario.name}</span>`
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

function usuarioLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        crearTarjetas(productos, contenedorTarjetas);
        presentarInfo(toggles, "d-none");
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//ESTA SE IRÍA
function mostrarProductos(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardProducto" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreMascota">${element.nombre}</h3>
                <img src="${element.imagen}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto">
                <div class="card-body">
                    <p class="card-text" id="genero">Genero: ${element.genero}</p>
                    <p class="card-text" id="edad">Edad: ${element.edad}</p>
                    <p class="card-text" id="categoria">Categoria: ${element.categoria}</p>
                    <p class="card-text" id="precio">Precio: ${element.precio} pesos</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

//BUSQUEDA
function crearTarjetas (array, contenedor){
    contenedor.innerHTML="";
    for (const item of array) {
        let tarjeta = document.createElement('div');
        tarjeta.className = 'card my-5 bg-light';
        tarjeta.id = `${item.id}`;
        tarjeta.innerHTML = `
        <h4 class="card-header">${item.nombre}</h4>
        <img src="${item.imagen}" class="card-img-top imagenProducto" alt="${item.categoria}">
        <div class="card-body">
            <p class="card-text">Edad: ${item.edad}</p>
            <p class="card-text">Categoría: ${item.categoria}</p>
            <span id="precio">$ ${item.precio}</span>
        </div>
        <div class="card-footer"><a href="#" class="btn btn-primary">Comprar</a></div>`;
        contenedor.append(tarjeta)
    }
}

function buscar(array, criterio, input){
    return array.filter(item=>item[criterio].includes(input))
}



btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {

        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            modal.hide();
            //mostrarProductos(productos);
            crearTarjetas(productos,contenedorTarjetas);
            presentarInfo(toggles, "d-none");
        }
    }
});

btnLogout.addEventListener("click", () => {
    borrarDatos();
    presentarInfo(toggles, "d-none");
});

window.onload = () => usuarioLogueado(recuperarUsuario(localStorage));

//crearTarjetas(productos,contenedorTarjetas);

let busqueda = document.querySelectorAll(".inputBusqueda");

busqueda.forEach(input=>{
    input.addEventListener("input",()=>{
        let cadena = (input.value).toUpperCase();
        crearTarjetas(buscar(productos,input.id,cadena),contenedorTarjetas);
        input.onblur=()=>{
            input.value="";
        }
    })
})
