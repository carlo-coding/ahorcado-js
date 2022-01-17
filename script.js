
/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/

const alfabeto = "abcdefghijklmnñopqrstuvwxyz";

var mensajeAEncriptar = document.querySelector("#input-texto");

var btnEncriptar = document.querySelector("#btn-encriptar");

var btnDesencriptar = document.querySelector("#btn-desencriptar");

var inputResultado = document.querySelector("#msg");

var btnCopiar = document.querySelector("#btn-copy");


// toUpperCase()

function encriptar () {
    var mensaje = mensajeAEncriptar.value.toLowerCase();

    var nuevoMensaje = mensaje.replaceAll("e", "enter")
                            .replaceAll("i", "imes")
                            .replaceAll("a", "ai")
                            .replaceAll("o", "ober")
                            .replaceAll("u", "ufat");

    inputResultado.value = nuevoMensaje;
}

function desencriptar () {
    var mensaje = mensajeAEncriptar.value;
    

    var nuevoMensaje = mensaje.replaceAll("enter", "e")
                                    .replaceAll("imes", "i")
                                    .replaceAll("ai", "a")
                                    .replaceAll("ober", "o")
                                    .replaceAll("ufat", "u");
    inputResultado.value = nuevoMensaje;
}

btnEncriptar.onclick = encriptar;

btnDesencriptar.onclick = desencriptar;

btnCopiar.onclick = function () {
    navigator.clipboard.writeText(inputResultado.value); // Copiar al portapapeles
    mensajeAEncriptar.value = "";
    mensajeAEncriptar.focus();
    
}


inputResultado.onchange = ()=> console.log("hi")