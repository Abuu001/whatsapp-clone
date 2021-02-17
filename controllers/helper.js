//multer is used to handle uploading files
const multer = require('multer')
require('dotenv').config({path : '../config/.env'})
const path =require('path')
const {v4 : uuidv4} = require('uuid')

exports.getUniqueId=()=>{
    return uuidv4()
}

exports.getTime=()=>{
    return Date.now()
} 

//upload profile pic
const userProfileStorage=multer.diskStorage({
    destination: `../uploads/${process.env.PROFILE_IMAGE_PATH}/`,
    filename:function (req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

exports.userProfileUpload=multer({
    storage:userProfileStorage,
    limits : {fileSize : 1000000}
}).single("profileImg")

//upload voice
const audioStorage=multer.diskStorage({
    destination: `../uploads/${process.env.AUDIO_PATH}/`,
    filename:function (req,file,cb){
        cb(null,Date.now()+".webm")
    }
})

exports.audioUpload=multer({
    storage:audioStorage,
    limits : {fileSize : 1000000}
}).single('track')

//upload image  msg file
const imageMsgFileStorage=multer.diskStorage({
    destination: `../uploads/${process.env.IMG_MSG_PATH}/`,
    filename:function (req,file,cb){
        cb(null,Date.now()+".webm")
    }
})

exports.imageMgsFileUpload=multer({
    storage:imageMsgFileStorage,
    limits : {fileSize : 1000000}
}).single('track')
