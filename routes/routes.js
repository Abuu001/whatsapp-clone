const router = require('express').Router()
const pool = require('../config/db')
const pusher = require('../config/pusher')

let pgClient;
pool.connect((err,client)=>{
    if(err) {
        console.log("there was an error connecting to the db");
    }

    pgClient= client ;
   
       client.on('notification',(msg)=>{
        //    pusher.trigger('watch_whatsappmainmessages', 'new_record', JSON.parse(msg.payload));
        //    const query = client.query('LISTEN watch_whatsappmainmessages');
       })

    console.log("Db connected");
})
//API ENDPOINTS

//get messages api
router.get('/messages',async(req,res)=>{
    try {
        const response = await pgClient.query("SELECT * FROM whatsappmainmessages  ORDER BY  time_sent ASC ");
        console.log(req.method);

        //push res data to pusher
        //await pusher.trigger('watch_whatsappmainmessages', 'new_record', response.rows);
        //listning to db change (inserted,deleted,getting) data
        //await pgClient.query('LISTEN watch_whatsappmainmessages');

        res.status(200).json({
            length : response.rows.length,
            message : response.rows
        } )
    } catch (error) {
        res.status(500).json({
            message : "An error occurred"
        })
    }
})

//post messages api
router.post('/messages',async(req,res)=>{
    try {
        const {name,image,message}= req.body;

        const payload = req.body; // stores all the user req in var payload;
        
        const response = await pgClient.query("INSERT INTO whatsappMainMessages (messages,image_sent,name)  VALUES($1,$2,$3) RETURNING *",[message,image,name])
        if(req.method === 'POST'){
            await pusher.trigger('watch_whatsappmainmessages', 'new_record', response.rows[0]);
            await pgClient.query('LISTEN watch_whatsappmainmessages');
        }  
   
        res.status(200).json({   
            length : response.rows.length,
            message : response.rows  
        } )
        
    } catch (error) {
        res.status(500).json({
            message : "An error occurred"
        })
    }
})

//delete messages api
router.delete('/messages/:id',async(req,res)=>{
    try {
        const {id}= req.params
        const response = await pgClient.query("DELETE  FROM whatsappMainMessages WHERE id=$1 ",[id])
console.log(req.method );  
        if(req.method==='DELETE'){ 
            await pusher.trigger('watch_whatsappmainmessages_delete', 'delete', response); 
            await pgClient.query('LISTEN watch_whatsappmainmessages_delete'); 
        }
           
        // res.status(200).json({ 
        //     length : response.rows.length, 
        //     message : "Deleted sucessfully"  
        // } ) 
    } catch (error) {  
        res.status(500).json({
            message : "An error occurred" 
        }) 
    }
})


module.exports=router