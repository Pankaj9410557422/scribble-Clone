// const socket= io("http://localhost:8000");

let sendBox = document.querySelector(".msgInp");
let msgContainer = document.querySelector(".chat-box");
let sendBtn = document.querySelector(".sendbtn");
let inpMsg = document.querySelector(".input-bar");
let scores = document.querySelector(".scores");


const append = (message,position)=>{
    const messageEle = document.createElement("div");
    messageEle.innerText=message;
    messageEle.classList.add("chat");
    messageEle.classList.add(position);
    msgContainer.appendChild(messageEle);
}
function appendScore(name,count){
    let scoreEle = document.createElement("div")
    scoreEle.classList.add("score");
    let playerNo = document.createElement("div");
    playerNo.classList.add("player-no");
    playerNo.classList.add("game-data");
    let playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.classList.add("game-data");
    let playerScore = document.createElement("div");
    playerScore.classList.add("player-points");
    playerScore.classList.add("game-data");
    playerNo.innerText=count;
    playerName.innerText=name;
    playerScore.innerText="0";
    scoreEle.appendChild(playerNo);
    scoreEle.appendChild(playerName);
    scoreEle.appendChild(playerScore);
    scores.appendChild(scoreEle);
}

sendBtn.addEventListener("click",function(){
    const msg = inpMsg.innerText;
    if(msg !=""){
        append(`You: ${msg}`,'right');
        socket.emit('send',msg);
        inpMsg.innerText="";
    }
})

const playerName = prompt("Enter player name");
let playerCount = document.querySelectorAll(".score");
appendScore(playerName,playerCount.length+1);
// console.log(playerCount);

socket.emit('new-user-joined',playerName);

socket.on("user-joined",data=>{
    append(`"${data.name}" joined the room`,'right');
    
    appendScore(data.name, `${data.connectCounter}`);
})

socket.on("receive",data=>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on("left",name=>{
    append(`"${name}" left the chat`,'left');
})
inpMsg.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        const msg = inpMsg.innerText;
        if(msg !=""){
            append(`You: ${msg}`,'right');
            socket.emit('send',msg);
            inpMsg.innerText="";
        }
    }
})

socket.on('manage-scorecard',users=>{
    let count=0;
    for(const key in users){
        count++;
        appendScore(users[key],count);
        console.log(count);
    }
})
