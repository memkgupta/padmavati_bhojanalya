const app = require('express')();
const http = require('http').createServer(app);
const {Server} = require('socket.io');

const io = new Server(http,{});



http.listen(3000,()=>{
    console.log("Server listening");
    console.log(process.env.DB_URI)
})