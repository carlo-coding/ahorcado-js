const palabraActualContenedor = document.querySelector("#letras");
const botonIniciar = document.querySelector("#iniciar");
const juegoContenedor = document.querySelector(".juego");
const modal = document.querySelector(".modal");
const letrasUsadasContenedor = document.querySelector("#letras-usadas");
const controles = document.querySelector(".controles");
const areaNuevasPalabras = document.querySelector("#nuevas-palabras");

const inputMobile = document.querySelector("#mobile-input");

var letrasValidas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function obtenerNuevaPalabra() {
    let todasLasPalabras = [...JSON.parse(localStorage.getItem("palabras-usuario")||"[]"), ...bancoDePalabras];
    let longitud = todasLasPalabras.length;
    let palabraAleatoria = todasLasPalabras[Math.floor(Math.random() * longitud)].toUpperCase();
    return palabraAleatoria;
}


inputMobile.addEventListener("input", ()=> {
    setTimeout(()=> {
        inputMobile.value = "";
    }, 170);
})
/*
 FUNCIÓN QUE USA UNA API
async function obtenerNuevaPalabra() {
    let palabraValida = false;
    var palabra = "";
    while (!palabraValida) {
        var respuesta = await fetch("https://palabras-aleatorias-public-api.herokuapp.com/random");
        var datos = await respuesta.json();
        palabra = datos.body.Word.toUpperCase();
        for (var letra of palabra) {
            if (!letrasValidas.includes(letra)){
                break;
            }
            palabraValida = true;
        }
    }
    return palabra;
}*/

function mostrarModal(titulo="", mensaje="", cb=(()=>window.location.assign(""))){
    modal.querySelector("#titulo").textContent = titulo;
    modal.querySelector("#mensaje").textContent = mensaje;
    modal.querySelector(".btn").onclick = cb;
    modal.style.display = "flex";
}

async function Juego() {
    shapeStart();
    let gameState = "playing";
    var palabra = await obtenerNuevaPalabra();
    var letras = palabra.split("");
    var letrasAdivinadas = [];
    var letrasUsadas = [];
    var palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)?` ${letra} `:" _ ").join("");
    palabraActualContenedor.textContent = palabraActual;
    var isMobile = window.matchMedia("(max-width: 600px)").matches


    function probarLetra(e) {
        if (gameState !== "playing") return;

        let tecla = "";
        if (isMobile) {
            tecla = e.data?.toUpperCase();
        }else {
            tecla = e.key.toUpperCase();
        }
        if (!letrasValidas.includes(tecla)) {
            mostrarModal("", `La letra ${tecla} no es válida`, ()=>{
                modal.style.display = "none"
            })
            return;
        }
        if (letrasUsadas.includes(tecla)){
            mostrarModal("", `Ya usaste la letra ${tecla}`, ()=>{
                modal.style.display = "none"
            })
            return;
        }else {
            letrasUsadas.push(tecla);
        }
        letrasUsadasContenedor.textContent = letrasUsadas.join(" ");

        if (letras.includes(tecla)) {
            letrasAdivinadas.push(tecla);
            var palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)?` ${letra} `:" _ ").join("");
            palabraActualContenedor.textContent = palabraActual;
        }else {
            if (shapes.length > 1) {
                shapes.shift()();
            }else if(shapes.length === 1) {
                shapes.shift()();
                mostrarModal("Perdiste", `La palabra era ${palabra}`);
                gameState = "over";
            }
            else {
                mostrarModal("Perdiste", `La palabra era ${palabra}`);
                gameState = "over";
            }
        }
        if(palabraActual?.replaceAll(" ","") === palabra) {
            mostrarModal("¡Ganaste!", `La palabra es ${palabra}`);
            gameState = "won";
        }
    }

    if (isMobile) {
        document.addEventListener("input", probarLetra);
    }else {
        document.addEventListener("keydown", probarLetra);
    }
}


botonIniciar.onclick = function () {
    // INICIAR JUEGO
    Juego();

    // ESCONDER INPUTS Y PONER EL JUEGO
    juegoContenedor.style.display = "flex";
    controles.style.display = "none";

    // AGREGAR PALABRAS DEL USUARIO
    var nuevasPalabras = areaNuevasPalabras.value.toUpperCase().replaceAll(" ","").split(",");
    if ((nuevasPalabras.length > 0) && (nuevasPalabras[0] !== "")) {


        let palabrasUsuario =  JSON.parse(localStorage.getItem("palabras-usuario")||"[]");
        let interseccion = [
            ...bancoDePalabras.filter(pl=>nuevasPalabras.includes(pl.toUpperCase())),
            ...palabrasUsuario.filter(pl=>nuevasPalabras.includes(pl.toUpperCase()))
        ];
        let sinRepeticiones = nuevasPalabras.filter(pl=>!interseccion.includes(pl));
        if (sinRepeticiones.length > 0) localStorage.setItem("palabras-usuario", JSON.stringify(palabrasUsuario.concat(sinRepeticiones)))

    }
}   