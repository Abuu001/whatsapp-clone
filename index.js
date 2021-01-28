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

const PORT= process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server Running in port ${PORT}`));