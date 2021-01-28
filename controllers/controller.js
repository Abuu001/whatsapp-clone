const {getUniqueId,getTime}= require('./helper')
require('dotenv').config({path : '../config/dev.env'})
const {userLogin ,getUserList,getUserInfo,getUserChats,uploadVoice,uploadImageFile}= require('../models/common.models')

exports.userLogin=async(req,res)=>{
    try {
        const {name} =JSON.parse(req.body.payload);
        const currentTime =getUniqueId()

        let user ={
            name,
            profileImg : "",
            sessionId : getUniqueId,
            createdAt :currentTime,
            updatedAt :currentTime
        }
        if(req.file && req.file.filename){
            user["profileImg"] = `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.PROFILE_IMAGE_PATH}/${req.file.filename}`
        }

        //store this user in mongodb
        const id=await userLogin(user)
        user['_id']=id
        res.status(200).json(user)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getUserList=async(req,res)=>{
    try {
        const userList = await getUserList(req.params.id)
        let userListObj={};
        if(userList.length){
            for(let i=0 ;i < userList.length ; i++){
                userListObj[userList[i].sessionId]=userList[i]
            }
        }
        res.status(200).json(userListObj)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getUserInfo=async (req,res)=>{
    try {
        const userInfo =await getUserInfo( req.params.id)
        res.status(200).json(userInfo)

    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.getUserChats=async (req,res)=>{
    try {
        const {senderId,receiverId}=req.body;
        const chats = await getUserChats(senderId,receiverId)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.uploadVoice=async (req,res)=>{
    try {
        let filePath ="";
        if(req.file.filename){
            filePath=  `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.AUDIO_PATH}/${req.file.filename}`;
        }

        res.status(200).json(filePath)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.uploadImageFile=async (req,res)=>{
    try {
        let filePath ="";
        if(req.file.filename){
            filePath=  `${process.env.BASE_PATH}:${process.env.PORT}/${process.env.IMG_MSG_PATH}/${req.file.filename}`;
        }

        res.status(200).json(filePath)
    } catch (error) {
        res.status(400).send(error.message)
    }
}