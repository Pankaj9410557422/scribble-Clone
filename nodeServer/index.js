//Node server which will handle socket.io connecrtion

const io = require("socket.io")(8000);

const users ={};
let connectCounter=0;
io.on("connection",socket=>{
    socket.on('new-user-joined',name=>{
        connectCounter++;
        users[socket.id]=name;
        console.log(users);
        socket.broadcast.emit('manage-scorecard',users);
        socket.broadcast.emit('user-joined',{name:name,connectCounter:connectCounter});
    })
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id]);
        if(connectCounter>0){
            connectCounter--;
        }
        delete users[socket.id];
    })
    socket.on("mousemove", function(point){
        socket.broadcast.emit("onmousemove", point);
    })
    socket.on("mousedown", function(point){
        socket.broadcast.emit("onmousedown", point);
    })
})

