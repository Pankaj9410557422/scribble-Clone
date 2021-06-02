const socket= io("http://localhost:8000");



let body = document.querySelector("body");
let board = document.querySelector(".board-container");
let canvas = document.querySelector("#board");
let Color = document.querySelector(".colors");

// tool k liye 
let tool = canvas.getContext("2d");
canvas.height = board.clientHeight;
canvas.width = board.clientWidth;

tool.lineCap='round';
let val = 3;
tool.lineWidth =val;
tool.strokeStyle="black";

Color.addEventListener("click",function(e){
    tool.strokeStyle = e.target.getAttribute("color");
})
window.addEventListener("resize",function(){
    canvas.height = board.clientHeight;
    canvas.width = board.clientWidth;
})

// tools
let pencilBtn = document.querySelector(".pencil");
let eraserBtn = document.querySelector(".eraser");
let brustBtn = document.querySelector(".paint-brush");
let activeTool = "pencil";

let isMouseDown = false;

canvas.addEventListener("mousedown",function(e){
    tool.beginPath();
    tool.moveTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
    isMouseDown=true;
    // console.log(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
    let point ={
        x : e.clientX-canvas.offsetLeft,
        y : e.clientY-canvas.offsetTop,
        task : "mousedown",
        color : tool.strokeStyle,
        width : tool.lineWidth
    };
    socket.emit("mousedown", point);
});
canvas.addEventListener("mousemove", function(e){
    if(isMouseDown==true){
        tool.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
        tool.stroke();
        let point ={
            x : e.clientX-canvas.offsetLeft,
            y : e.clientY-canvas.offsetTop,
            task : "mousemove",
            color : tool.strokeStyle,
            width : tool.lineWidth
        };
        socket.emit("mousemove",point);
    }
    
})

canvas.addEventListener("mouseup",function(){
    
    isMouseDown=false;
})
socket.on("onmousedown",function(point){
    const {x,y,color,width } = point;
    tool.lineWidth=width;
    tool.strokeStyle = color;
    tool.beginPath();
    tool.moveTo(x,y);
});
socket.on("onmousemove",function(point){
    const {x,y,color,width } = point;
    tool.lineWidth=width;
    tool.strokeStyle = color;
    tool.lineTo(x,y);
    tool.stroke();
})
