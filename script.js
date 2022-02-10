const letrasUsadasContenedor = document.querySelector("#letras-usadas");
const areaNuevasPalabras = document.querySelector("#nuevas-palabras");
const palabraActualContenedor = document.querySelector("#letras");
const inputMobile = document.querySelector("#mobile-input");
const juegoContenedor = document.querySelector(".juego");
const botonIniciar = document.querySelector("#iniciar");
const controles = document.querySelector(".controles");
const modal = document.querySelector(".modal");

var letrasValidas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function obtenerNuevaPalabra() {
    let todasLasPalabras = [
        ...JSON.parse(localStorage.getItem("palabras-usuario")||"[]"), 
        ...bancoDePalabras
    ];
    let longitud = todasLasPalabras.length;
    let palabraAleatoria = todasLasPalabras[Math.floor(Math.random() * longitud)];
    return palabraAleatoria;
}

function mostrarModal(titulo = "", mensaje = "", cb = ()=>window.location.reload() ){
    modal.querySelector("#titulo").textContent = titulo;
    modal.querySelector("#mensaje").textContent = mensaje;
    modal.querySelector(".btn").onclick = cb;
    modal.style.display = "flex";
}

function darEspacios(palabra) {
    return palabra.split("").join(" ");
}

function Juego() {
    shapeStart();
    let gameState = "playing";
    let palabra = obtenerNuevaPalabra();
    let letras = palabra.split("");
    let letrasAdivinadas = [];
    let letrasUsadas = [];
    let palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)? letra : "_" ).join("");
    let isMobile = window.matchMedia("(max-width: 600px)").matches

    palabraActualContenedor.textContent = darEspacios(palabraActual);

    function probarLetra(e) {
        // Validar el estado del juego y obtener tecla en función del dispositivo
        if (gameState !== "playing") return;
        let tecla = (isMobile? e.data : e.key).toUpperCase();

        // Validaciones de letra
        if (!letrasValidas.includes(tecla)) return;

        if (letrasUsadas.includes(tecla)){
            gameState = "pause";
            mostrarModal("ERROR", `Ya usaste la letra ${tecla}`, ()=>{
                gameState = "playing" 
                modal.style.display = "none"
            })
            return;
        }

        // Si es valida agregarla a las letras usadas y mostrar
        letrasUsadas.push(tecla);
        letrasUsadasContenedor.textContent = letrasUsadas.join(" ");

        // Lógica del juego
        if (letras.includes(tecla)) {
            letrasAdivinadas.push(tecla);
            let palabraActual = letras.map(letra => letrasAdivinadas.includes(letra)? letra : "_" ).join("");
            palabraActualContenedor.textContent = darEspacios(palabraActual);

            if(palabraActual === palabra) {
                mostrarModal("¡Ganaste!", `La palabra es ${palabra}`);
                gameState = "won";
            }
        }else if (shapes.length > 1) {
            shapes.shift()();
        }else if(shapes.length === 1) {
            shapes.shift()();
            mostrarModal("Perdiste", `La palabra era ${palabra}`);
            gameState = "over";
        }else {
            mostrarModal("Perdiste", `La palabra era ${palabra}`);
            gameState = "over";
        }
    }
    document.addEventListener(isMobile? "input" : "keydown" , probarLetra);
}

function agregarPalabras() {
    // Obtener nuevas palabras y validar
    var nuevasPalabras = areaNuevasPalabras.value.toUpperCase().replaceAll(" ","").split(",");
    if (nuevasPalabras[0] === "") return;

    // Verificar que no se repitan
    let palabrasUsuario =  JSON.parse(localStorage.getItem("palabras-usuario")||"[]");
    let interseccion = [
        ...bancoDePalabras.filter(pl=>nuevasPalabras.includes(pl)), 
        ...palabrasUsuario.filter(pl=>nuevasPalabras.includes(pl))
    ];
    let sinRepeticiones = nuevasPalabras.filter(pl=>!interseccion.includes(pl));
    
    // Si no se repiten agregarlas al almacenamiento local
    if (sinRepeticiones.length > 0) localStorage.setItem("palabras-usuario", JSON.stringify(palabrasUsuario.concat(sinRepeticiones)))
}

// Limpiar el input mostrado en mobile cada 170ms
inputMobile.addEventListener("input", ()=> {
    setTimeout(()=> {
        inputMobile.value = "";
    }, 170);
})

botonIniciar.onclick = function () {
    // INICIAR JUEGO
    Juego();

    // ESCONDER INPUTS Y PONER EL JUEGO
    juegoContenedor.style.display = "flex";
    controles.style.display = "none";

    // AGREGAR PALABRAS DEL USUARIO
    agregarPalabras()
}   