const palabraActualContenedor = document.querySelector("#letras");
// Boton iniciar juego 
const botonIniciar = document.querySelector("#iniciar");
const juegoContenedor = document.querySelector(".juego");
const modal = document.querySelector(".modal");
const letrasUsadasContenedor = document.querySelector("#letras-usadas");

botonIniciar.onclick = function () {
    juegoContenedor.style.display = "flex";
    botonIniciar.style.display = "none";
}

var letrasValidas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
shapeStart();

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
}

function mostrarModal(titulo="", mensaje="", cb=(()=>window.location.assign(""))){
    modal.querySelector("#titulo").textContent = titulo;
    modal.querySelector("#mensaje").textContent = mensaje;
    modal.querySelector(".btn").onclick = cb;
    modal.style.display = "flex";
}

async function Juego() {
    var palabra = await obtenerNuevaPalabra();
    var letras = palabra.split("");
    var letrasAdivinadas = [];
    var letrasUsadas = [];
    var palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)?` ${letra} `:" _ ").join("");
    palabraActualContenedor.textContent = palabraActual;

    document.addEventListener("keypress", function (e) {
        let tecla = e.key.toUpperCase();
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
                mostrarModal("Perdiste", `La palabra era ${palabra}`)
            }
            else {
                mostrarModal("Perdiste", `La palabra era ${palabra}`)
            }
        }
        if(palabraActual?.replaceAll(" ","") === palabra) {
            mostrarModal("¡Ganaste!", `La palabra es ${palabra}`)
        }
    })
}

Juego();