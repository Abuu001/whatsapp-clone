const router = require('express').Router()
const pool = require('../config/db')
const pusher = require('../config/pusher')
const path=require('path')

let pgClient;
pool.connect(async(err,client)=>{
    try {
        if(err) { 
            console.log("there was an error connecting to the db");
        }
    
        pgClient= client ;
       
       await  client.on('notification',(msg)=>{
            //    pusher.trigger('watch_whatsappmainmessages', 'new_record', JSON.parse(msg.payload));
            //    const query = client.query('LISTEN watch_whatsappmainmessages');
           })
    
        console.log("Db connected");
        
    } catch (error) {
        console.log(error.message);
    }
})
//API ENDPOINTS

//get messages api
router.get('/messages',async(req,res)=>{
    try {
        const response = await pool.query("SELECT * FROM whatsappmainmessages  ORDER BY  groups ASC ");
        // const response = await pgClient.query("SELECT messages,groups,groups_id,images FROM whatsappmainmessages RIGHT JOIN whatsappimages ON whatsappimages.groups_id = whatsappmainmessages.groups ORDER BY  groups ASC");

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
        const {name,messages,time_sent}= req.body;
        const response = await pool.query("INSERT INTO whatsappmainmessages (messages,time_sent,name)  VALUES($1,$2,$3) RETURNING *",[messages,time_sent,name])
                                                                         
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
        const {id}= req.params  ;
        const response = await pool.query("DELETE  FROM whatsappmainmessages WHERE id=$1 ",[id])
        const messges = await pool.query("SELECT * FROM whatsappmainmessages  ORDER BY  groups ASC "); 
    
        if(req.method==='DELETE'){  
            await pusher.trigger('watch_whatsappmainmessages_delete', 'delete', messges.rows); 
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
 
//posting uploads
router.post('/uploads',async(req,res)=>{
    try {
        
        const img = req.files.file;
        const {name} =req.body

      let uploadPath = path.join(__dirname,"../client/src/uploads/"+img.name)
      //moving the image to uploads path    
      await  img.mv(uploadPath) 

        let response = await pool.query('INSERT INTO whatsappimages (image_name ,images_path) VALUES($1,$2) RETURNING * ',[name,uploadPath]);

       res.status(200).json({   
        length : response.rows.length,
        message : response.rows  
       })

    } catch (error) {
        res.status(500).json({
            message : "An error occurred"
        }) 
    }
}) 

//getting uploads
router.get('/uploads',async(req,res)=>{
    try {
        const response = await pool.query("SELECT * FROM whatsappimages  ORDER BY  groups_id ASC ");
    
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

module.exports=router