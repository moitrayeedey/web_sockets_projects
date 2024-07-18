const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
//  this will handle our sockets
const io = new Server(server);
io.on('connection', (client) => {
    client.on('user-message', (message) => {
        io.emit('message', message);
    });
})

app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
    return res.sendFile("/public/index.html")
})

server.listen(8000, () => {
    console.log("Server started at port 8000");
})