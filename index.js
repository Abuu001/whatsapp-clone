require('dotenv').config({path : "./config/dev.env"});
const express =require('express');
const app =express()
const http= require('http')
const server = http.createServer(app)
const cors =require('cors')
const router=require('./routes/routes')
const fileUpload =require('express-fileupload')

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

const PORT= process.env.PORT || 3004;
server.listen(PORT,()=>console.log(`Server Running in port ${PORT}`));