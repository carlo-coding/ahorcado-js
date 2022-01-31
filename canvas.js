const canvas = document.querySelector("#ahorcado");
const contexto = canvas.getContext("2d");
contexto.fillStyle ="#000000";
contexto.lineWidth = 5;
function shapeStart() {
    contexto.beginPath();
    contexto.moveTo(100, 400);
    contexto.lineTo(50, 450);
    contexto.lineTo(150, 450);
    contexto.lineTo(100, 400);
    contexto.fill();
    contexto.closePath();
}

function shape1() {
    var width=5; 
    var height=350;
    contexto.fillRect(100-(width/2), 50, width, height);
}
function shape2() {
    var width=200; 
    var height=5;
    contexto.fillRect(100, 50, width, height);
}
function shape3() {
    var width=5; 
    var height=50;
    contexto.fillRect(300, 50, width, height);
}
function shape4(){
    var radius=30; 
    contexto.arc(300, 100+radius, 30, 0, 2 * Math.PI);
    contexto.fill();
}
function shape5(){
    var width=5; 
    var height=100;
    contexto.fillRect(300, 160, width, height);
}
function shape6() {
    contexto.lineWidth = 5;
    contexto.beginPath();
    contexto.moveTo(300, 160);
    contexto.lineTo(260, 200);
    contexto.stroke();
    contexto.closePath();
}
function shape7() {
    contexto.beginPath();
    contexto.moveTo(300, 160);
    contexto.lineTo(340, 200);
    contexto.stroke();
    contexto.closePath();
}
function shape8() {
    contexto.lineWidth = 5;
    contexto.beginPath();
    contexto.moveTo(300, 260);
    contexto.lineTo(260, 300);
    contexto.stroke();
    contexto.closePath();
}
function shape9() {
    contexto.beginPath();
    contexto.moveTo(300, 260);
    contexto.lineTo(340, 300);
    contexto.stroke();
    contexto.closePath();
}



const shapes = [
    shape1,
    shape2,
    shape3,
    shape4,
    shape5,
    shape6,
    shape7,
    shape8,
    shape9,
]