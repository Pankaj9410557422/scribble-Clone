let cvs = document.getElementById("flappy");
let ctx = cvs.getContext("2d");
let cont = document.querySelector(".flappy-container");
let frames =0;


// setting the canvas 
cvs.style.height = "100%";
cvs.style.width ="100%";
cvs.height=cvs.offsetHeight;
cvs.width=cvs.offsetWidth;


const sprite= new Image();
sprite.src="img/sprite.png";

const gameState={
    current :0,
    getReady :0, //At the statrting
    playing : 1, //while the game is playing
    gameOver :2 // when player gets out
}

//controlling the game
cont.addEventListener("click",function(e){
    if(gameState.current == gameState.getReady){
        gameState.current= gameState.playing;
    }else if(gameState.current == gameState.playing){
        bird.flap();
    }else if(gameState.current == gameState.gameOver){
        gameState.current= gameState.getReady;
    }
})

const backGrnd = {
    sX :0,
    sY :0,
    w :275,
    h :226,
    x :0,
    y :cvs.height - 180,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x, this.y, this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x+this.w, this.y, this.w,this.h);
    }
}

const foreground={
    sX :276,
    sY :0,
    w :224,
    h :112,
    x :0,
    y :cvs.height - 60,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x, this.y, this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x+this.w, this.y, this.w,this.h);
    }
}
const bird ={
    anim :[
        {sX:276, sY:112},
        {sx:276, sY:139},
        {sX:276, sY:164},
        {sx:276, sY:139},
    ],
    x:50,
    y:150,
    w:34,
    h:26,

    frame : 0,
    draw: function(){
        let bird = this.anim[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h , this.x, this.y, this.w,this.h);
    },

    flap: function(){

    } 
}

//starting ka get ready wala fn

const getReady ={
    sX:0,
    sY:228,
    w:173,
    h:152,
    x:cvs.width/2 -173/2,
    y:80,

    draw : function(){
        if(gameState.current == gameState.getReady){

            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x, this.y, this.w,this.h);
        }
    }
}
const gameOver ={
    sX:175,
    sY:228,
    w:225,
    h:202,
    x:cvs.width/2 -100,
    y:90,

    draw : function(){
        if(gameState.current ==gameState.gameOver){

            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h , this.x, this.y, this.w,this.h);
        }
    }
}


function draw(){
    ctx.fillStyle ="#70c5ce";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    backGrnd.draw();
    foreground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}
function update(){

}
(function loop(){
    update();
    draw();

    requestAnimationFrame(loop);

})();

