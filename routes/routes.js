const router =require('express').Router();
const controller=require('../controllers/controller')
const {userProfileUpload,audioUpload,imageMgsFileUpload} =require('../controllers/helper')

router.post('/api/login',userProfileUpload,controller.userLogin)
router.get('/api/users-list/:id',controller.getUserList)
router.get('/api/user/:id',controller.getUserInfo)
router.post('/api/chats',controller.getUserChats)
router.get('/api/user/is-offline/:id',controller.checkIfUserOffline)
router.post('/api/upload-voice',audioUpload,controller.uploadVoice)
router.post('/api/upload-image-file',imageMgsFileUpload,controller.uploadImageFile)

module.exports= router;