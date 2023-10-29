const express = require('express');
const app = express();
const http = require('http').createServer(app);
const {Server} = require('socket.io');
const connect = require('./config/db');
require('dotenv').config({path:'./process.env'})
// importing our router
const userRouter = require('./routes/userRoutes');
const io = new Server(http,{});
app.use(express.json()); // for parsing the body sent over the http request
app.use(express.urlencoded({extended:true})); //used to parse data sent in the body of an HTTP POST request

//defining routes
app.use('/api/v1/user',userRouter);



http.listen(3000,()=>{
    console.log("Server listening");
connect();
  
})