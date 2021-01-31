import React,{useState,useEffect} from 'react'
import "./Chat.css"
import axios from "axios"
import moment from "moment"
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { toast } from 'react-toastify';


function Chat({authInfo}) {
    const [messages,setMessages]=useState([])

    const getMessages=async()=>{
        await axios.get("/api/v1/messages")
        .then(response=>{
            const gg =response.data.message
            //console.log(gg);
            gg.map(tt=>console.log(tt))  
      
            setMessages([...response.data.message])
        })
    }

    const deleteMsgHandler=async(id)=>{
        await axios.put(`/api/v1/messages/${id}`)
        toast.warning("Message deleted !!!",{position:"top-right"})
    }
 
    useEffect(()=>{
        getMessages()
        deleteMsgHandler()
    },[])

    const msgLoop=messages.map(msg=>{
        // const date = new Date(parseInt(msg.time_sent));
        // const localeSpecificTime = date.toLocaleTimeString();

        var date = new Date(parseInt(msg.time_sent));
        const localeSpecificTime = date.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit'
            });

        return(
              <div className= {`${authInfo[0].additionalUserInfo?.profile.given_name  !== msg.name ?   `${'chat you'}` : `${'chat me'}` }`}  key={msg.id} >
                    <span className="name">
                    {/* {authInfo[0].additionalUserInfo?.profile.given_name } */}
                    {msg.name}
                    </span>
                    <p className="msg">{msg.messages}</p>
                    {/* <span className="time">{msg.time_sent}</span>  */}
                    <span className="time">{localeSpecificTime}</span> 
                    <CancelOutlinedIcon fontSize="small"  className="cancelBtn" onClick={()=>deleteMsgHandler(msg.id)}/>
               </div>  
        )
    })

    return ( 
        <div className="chat__Section">
            <div className="chat you">
                <span className="name">
                  Martha
                </span>
            <p className="msg">message</p>
            <span className="time">10:50 PM</span> 
            </div>
 
            <div className="chat me">
                <span className="name">
                {authInfo[0].additionalUserInfo?.profile.given_name }
                </span>
                 <p className="msg">Niaje bro</p>
                <span className="time">10:50 PM</span> 
            </div>
       
            {msgLoop} 

        </div>
    )
}

export default Chat
