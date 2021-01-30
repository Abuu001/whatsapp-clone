const io =require('../index').io
const {getTime} = require('../controllers/helper')
const {saveChats}= require('../models/common.models')

module.exports =(socket)=>{
    try {
        console.log("connected");
        socket.on("join-user",(data,callback)=>{
            const {createdAt,name,profileImg,sessionId,updatedAt,_id}=data;
            const currentTime = getTime()

            const newUser ={
                createdAt,
                name,
                profileImg,
                sessionId,
                updatedAt :  currentTime,
                _id
            }
        })

        socket.on('send-msg',async (data,callback)=>{
            const {senderId,receiverId,msg}=data;
            const chatObj={
                room : [senderId,receiverId],
                senderId,
                receiverId,
                msg,
                time : getTime()
            }
            await saveChats(chatObj)
            
            io.to(receiverId).emit("receive-msg",chatObj)
            callback(chatObj)
        })

        socket.on('user-typing',async (data,callback)=>{
            const {senderId,receiverId,msg}=data;
            const chatObj={
                room : [senderId,receiverId],
                senderId,
                receiverId,
                msg,
                time : getTime()    
            }

            io.to(receiverId).emit("user-typing",chatObj)
            callback(chatObj)
        })

        socket.on("disconnect",()=>{
            const {sessionId}=socket;
            if(sessionId){
                const offlineUsers={
                    time : getTime()    ,
                    sessionId
                }
                console.log("User left");
            }
            socket.broadcast.emit("new-offline-user",offlineUsers)
        })

    } catch (error) {
        console.log(error.message);
    }
}