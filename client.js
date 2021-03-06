// const socket= io("http://localhost:8000");

let sendBox = document.querySelector(".msgInp");
let msgContainer = document.querySelector(".chat-box");
let sendBtn = document.querySelector(".sendbtn");
let inpMsg = document.querySelector(".input-bar");
let scores = document.querySelector(".active-part-box");



const append = (message,position)=>{
    const messageEle = document.createElement("div");
    messageEle.innerText=message;
    messageEle.classList.add("chat");
    messageEle.classList.add(position);
    msgContainer.appendChild(messageEle);
}


function appendAtnde(name){
    let atendDiv = document.createElement("div");
    atendDiv.classList.add("attendee");
    atendDiv.innerText=name;
    scores.appendChild(atendDiv);
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


socket.emit('new-user-joined',playerName);

socket.on("user-joined",name=>{
    append(`"${name} joined the room`,'right');
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


socket.on('state',users=>{
    scores.innerHTML="";
    for(let key of Object.keys(users)){
        appendAtnde(users[key]);
    }
})

