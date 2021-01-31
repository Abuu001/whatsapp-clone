const router = require('express').Router()
const pool = require('../config/db')

//API ENDPOINTS

//get messages api
router.get('/messages',async(req,res)=>{
    try {
        const response = await pool.query("SELECT * FROM whatsappmainmessages  ORDER BY  time_sent ASC ");
        console.log(response.rows);
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
        const {name,image,message}= req.body
        const response = await pool.query("INSERT INTO whatsappMainMessages (messages,image_sent,name)  VALUES($1,$2,$3) RETURNING *",[message,image,name])

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
router.put('/messages/:id',async(req,res)=>{
    try {
        const {id}= req.params
        const response = await pool.query("DELETE  FROM whatsappMainMessages WHERE id=$1 ",[id])

        res.status(200).json({
            length : response.rows.length,
            message : "Deleted sucessfully"
        } )
    } catch (error) {
        res.status(500).json({
            message : "An error occurred"
        })
    }
})


module.exports=router