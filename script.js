var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 4;
    eraserClicked=false;
    paintBrush=false;

function init() {
    canvas = document.getElementById('board');
    let boardCont = document.querySelector('.board-container');
    console.log(boardCont);
    ctx = canvas.getContext("2d");
    canvas.width = boardCont.offsetWidth;
    canvas.height = boardCont.offsetHeight;
    w = canvas.width;
    h = canvas.height;
    window.addEventListener("resize",function(){
        canvas.width = boardCont.offsetWidth;
        canvas.height = boardCont.offsetHeight;
        w = canvas.width;
        h = canvas.height;
        init();
    })

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    });
    canvas.addEventListener("mousedown", function (e) {
        tools()
        findxy('down', e)
    });
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    });
    
}

function tools() {
    let Color = document.querySelector(".colors");
    let eraser = document.querySelector(".eraser");
    let pencil=document.querySelector(".pencil");
    let paintBrush=document.querySelector(".paint-brush");

    // let redColor = document.querySelector(".red");
    // let greenColor = document.querySelector(".green");
    // let blueColor = document.querySelector(".blue");
    // let yellowColor = document.querySelector(".yellow");
    // let orangeColor = document.querySelector(".orange");
    // let blackColor = document.querySelector(".black");
    // let pinkColor = document.querySelector(".pink");
    // let lgreenColor = document.querySelector(".lightgreen");
    Color.addEventListener("click", function(e){
        // console.log(e.target.getAttribute("color"));
        if(eraserClicked==false){
            x=e.target.getAttribute("color");
        }
    });
    eraser.addEventListener("click",function(){
        x = "aliceblue";
        y =30;
        eraserClicked=true;
    });
    pencil.addEventListener("click",function(){
        if(eraserClicked==true){
            erasedClicked=false;
            y=4;
            x="black";
        }
    })


}

function draw() {
    ctx.lineJoin="round";
    ctx.linkeCap="round";
    if(paintBrush==true){
        ctx.shadowBlur=10;
        ctx.shadowColor=x;
        ctx.shadowOffsetX=2;
        ctx.shadowOffsetY=2;
    }
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up') {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}
// getCordinates();
init();