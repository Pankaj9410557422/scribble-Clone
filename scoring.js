let arr =["mango","boat","railway","india","natural","flower","crane","crate"];
let scores = document.querySelector(".scores");
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
    playerScore.innerText=0;
    scoreEle.appendChild(playerNo);
    scoreEle.appendChild(playerName);
    scoreEle.appendChild(playerScore);
    scores.appendChild(score);
}
socket.on("user-joined",data=>{
    appendScore(data.name, data.connectCounter)
})