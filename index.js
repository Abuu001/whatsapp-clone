require('dotenv').config({path : "./config/dev.env"});
const express =require('express');
const app =express()
const http= require('http')
const server = http.createServer(app)
const cors =require('cors')
const routes=require('./routes/routes')

//middlewares
app.use(cors())
app.use(routes);
app.use(express.static("uploads"),)
app.use(express.json())


const io = (module.exports.io =require('socket.io')(server))
const socketManager = require('./socketManager/socketManager')
io.on("connection",socketManager)

const PORT= process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server Running in port ${PORT}`));