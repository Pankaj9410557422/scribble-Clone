//Node server which will handle socket.io connecrtion

const io = require("socket.io")(8000);
const users ={};

io.on("connection",socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        io.emit("state",users);
        socket.broadcast.emit('user-joined',name);
    })
    
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id]);

        
        delete users[socket.id];
        io.emit("state",users);
    })
    socket.on("mousemove", function(point){
        socket.broadcast.emit("onmousemove", point);
    })
    socket.on("mousedown", function(point){
        socket.broadcast.emit("onmousedown", point);
    })
})



