const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const listMember = [];

io.on('connection', function (client) {
    client.on("signup", user => {
        const isExsist = listMember.some(v => v.username == user.username);
        if (isExsist){
            return socket.emit("signup_fail")
        }

        client.peerId = user.id;

        listMember.push(user);

        client.emit("member_room", listMember);

        //gửi đến tất cả mn trừ ng gửi
        client.broadcast.emit('new_member', user)

        //gửi tất cả mọi người
        // io.emit("new_member", user);
    })

    client.on("disconnect", ()=> {
        const index = listMember.findIndex(v => v.id === client.peerId);
        listMember.splice(index, 1);
        io.emit("member_disconnect", client.peerId);
    })
}); 

server.listen(5000, ()=> {
    console.log("server run at port 5000");
})