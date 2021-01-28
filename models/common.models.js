const {MONGO_DB,M_CONNECT}=require('../config/db')

exports.userLogin=async (payload)=>{
    try {
        const db =(await M_CONNECT).db(process.env.MONGO_DB_NAME)
        let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
        let response = await collection.insertOne(payload)
    
        return response.insertedId
    } catch (error) {
        console.log(error);
    }

}

exports.getUserList= async (sessionId)=>{
    try {
        const db =(await M_CONNECT).db(process.env.MONGO_DB_NAME)
        let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
        let response = await collection.find({sessionId :{$ne :sessionId}}).toArray()
    
        return response
    } catch (error) {
        console.log(error);
    }

}

exports.getUserInfo=async (sessionId)=>{
    try {
        const db =(await M_CONNECT).db(process.env.MONGO_DB_NAME)
        let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
        let res =  await collection.findOne({sessionId : sessionId})
    
        return res;
    } catch (error) {
        console.log(error);
    }
 
}

exports.getUserChats=async (senderId,receiverId)=>{
    try {
        const db =(await M_CONNECT).db(process.env.MONGO_DB_NAME)
        let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
        let res =  await collection.find({room : {$all : [senderId,receiverId]}}).toArray()
    
        return res;
    } catch (error) {
        console.log(error);
    }

}


exports.saveChats=async (payload)=>{
    try {
        const db =(await M_CONNECT).db(process.env.MONGO_DB_NAME)
        let collection = await db.collection(process.env.MONGO_DB_USERS_COLLECTION)
        let res =  await collection.insertOne(payload)
    
        return res.insertedId;
    } catch (error) {
        console.log(error);
    }

}