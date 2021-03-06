require('dotenv').config({path : "./.env"});
const express =require('express');
const app =express()
const http= require('http')
const server = http.createServer(app)
const cors =require('cors')   
const router=require('./routes/routes')
const fileUpload =require('express-fileupload')
const path= require('path')
 
//middlewares 
app.use(cors()) 
app.use(express.static("uploads"),)
app.use(express.json())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
 
  if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'./client/build')))
  }      
 
app.use("/api/v1",router)

const PORT= process.env.PORT ;
server.listen(PORT,()=>console.log(`Server Running in port ${PORT}`)); 