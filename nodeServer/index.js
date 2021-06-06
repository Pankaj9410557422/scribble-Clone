//Node server which will handle socket.io connecrtion

const io = require("socket.io")(8000);
let Words =["mango","boat","railway","india","natural","flower","crane","crate"];
const users ={};
let arr=[];
let connectCounter=0;
// var previdx;
const gameState ={
    players : {}
}
io.on("connection",socket=>{
    socket.on('new-user-joined',name=>{
        connectCounter++;
        users[socket.id]=name;
        gameState.players[socket.id]={
            playerName : name,
            playerScore : "0"
        }
        arr = Object.keys(users);
        io.emit("state",gameState);
        socket.broadcast.emit('user-joined',name);
    })
    
    async function asyncCall(){
        await sendWord(0);
        await resolveAfter10Sec();
        await sendWord(1);
        await resolveAfter10Sec();
    }
    // setInterval(asyncCall,20000)
       
    
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id]);
        if(connectCounter>0){
            connectCounter--;
        }
        
        delete users[socket.id];
        delete gameState.players[socket.id];
        io.emit("state",gameState);
    })
    socket.on("mousemove", function(point){
        socket.broadcast.emit("onmousemove", point);
    })
    socket.on("mousedown", function(point){
        socket.broadcast.emit("onmousedown", point);
    })
})
 function randomNoGenerator(min,max){
     return Math.floor(Math.random() *(max-min)+ min);
 }
//  let arr = Object.keys(users);
//  setInterval(()=>{
//     console.log(arr);
//  },3000)
function sendWord(idx){
    let word =Words[randomNoGenerator(0,7)];
    //let idx = randomNoGenerator(0,arr.length);
    io.to(arr[idx]).emit("word",word);
}
function resolveAfter10Sec(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            // io.to(arr[i]).emit("clear");
            resolve();
        },10000);
    })
}


