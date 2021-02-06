import React,{useState,useEffect} from 'react'
import "./Chat.css"
import axios from "axios"
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import { toast } from 'react-toastify';
import Pusher from "pusher-js";
import FlipMove from 'react-flip-move';

const Chat= ({authInfo})=> {
    const [messages,setMessages]=useState([])

    const getMessages=async()=>{
       await  axios.get("/api/v1/messages")
        .then(response=>{
            setMessages([...response.data.message])
        })
    }

    const deleteMsgHandler= async(id)=>{
       // toast.warning("Message deleted !!!",{position:"top-right"})
     await axios.delete(`/api/v1/messages/${id}`)
    } 
 
    useEffect(()=>{
        getMessages() 
        deleteMsgHandler()
    },[]) 

    useEffect(()=>{
        const pusher = new Pusher('55c0872bf47901e1b4a2', {
            cluster: 'eu',
            encrypted: true
          });
        
           const channel = pusher.subscribe('watch_whatsappmainmessages');
           channel.bind('new_record', (newMessage)=> { 
                
            //   alert(JSON.stringify(newMessage))  
              messages.push(newMessage)
              setMessages([...messages])
        });
 
        //for delete
        const pusher_delete = new Pusher('55c0872bf47901e1b4a2', {
            cluster: 'eu',
            encrypted: true
          });
        
        const channel_delete = pusher_delete.subscribe('watch_whatsappmainmessages_delete');
            pusher_delete.bind('delete', (newMessage)=> { 
            setMessages(newMessage)
        });
        return()=>{  
            channel.unbind_all()
            channel.unsubscribe();
            channel_delete.unbind_all()
            channel_delete.unsubscribe()
        }
    },[messages])

    const msgLoop=messages.map(msg=>{
        return(
            <div className= {`${authInfo[0].additionalUserInfo?.profile.given_name  !== msg.name ?   `${'chat you'}` : `${'chat me'}` }`}  key={msg.id} >
                <span className="name">
                {msg.name}
                </span>
                <p className="msg">{msg.messages}</p>
                <span className="time">{msg.time_sent}</span> 
                <CancelOutlinedIcon fontSize="small"  className="cancelBtn" onClick={()=>deleteMsgHandler(msg.id)}/>
            </div>  
        )
    })
 
    return ( 
        <div className="chat__Section"  >
            <FlipMove >
               {msgLoop}             
            </FlipMove>
        </div>
    )
};

export default Chat
