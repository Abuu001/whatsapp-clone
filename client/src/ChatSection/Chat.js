import React,{useState,useEffect} from 'react'
import "./Chat.css"
import axios from "axios"
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import { toast } from 'react-toastify';
import Pusher from "pusher-js";
import FlipMove from 'react-flip-move';
// import { css } from 'emotion';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat= ({authInfo})=> {
 
    const [messages,setMessages]=useState([])
    const [images,setImages]=useState('')

    const getMessages=()=>{
         axios.get("/api/v1/messages")
        .then(response=>{
            setMessages([...response.data.message])
        }).catch(err=>console.log(err))
    }

    const getImages=async()=>{
       await axios.get('/api/v1/uploads')
        .then(response=>{
            console.log(response.data.message[0].image_name);
       
            // const startPath="'"
            // const endPath="'"
            // const first = startPath.concat(response.data.message[0].images_path.trim())
            // const  realImg =first.concat(endPath)
            const realImg = response.data.message[0].image_name
            console.log(realImg);
            setImages(realImg)
           
            // console.log(response);
        })
    }

    const deleteMsgHandler= (id)=>{
       // toast.warning("Message deleted !!!",{position:"top-right"})
      axios.delete(`/api/v1/messages/${id}`)
    }  
 
    useEffect(()=>{
        getMessages() 
        getImages()
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
            channel_delete.unbind_all()
            channel.unsubscribe();
            channel_delete.unsubscribe()
        }
    },[messages,images])

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
            {/* <ScrollToBottom  mode="bottom" behaviour="smooth" > */}
                <FlipMove  enterAnimation="fade">
                 {msgLoop}           
                </FlipMove> 
            {/* </ScrollToBottom> */}
        </div> 
    )
};

export default Chat
