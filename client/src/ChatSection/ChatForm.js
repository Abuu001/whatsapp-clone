import React ,{useState,useEffect}from 'react'
import "./ChatForm.css"
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Picker from 'emoji-picker-react';

function ChatForm({authInfo}) {
 
    const [sendMsg,setSendMsg]=useState('')
    const [sendFile,setSendFile]=useState([])
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)

    const onEmojiClick = (event, emojiObject) => {
        setSendMsg(...sendMsg,emojiObject.emoji);
      };

    const submitMsgHandler=async()=>{
        const data={
                    name : authInfo[0].additionalUserInfo?.profile.given_name,
                    image : sendFile,
                    message : sendMsg 
                }
              await  axios.post("/api/v1/messages",data)

        setSendMsg("") 
        setSendFile([])
    }
    
    useEffect(()=>{
        submitMsgHandler()
    },[])
    
    return (
        <>
                {openEmojiPicker ?  <Picker onEmojiClick={onEmojiClick}/>  :  null}
            <div className="chartForm">
                <div className="action__Butn">
                    <i className="far fa-smile form__Icon"  value={sendMsg} onClick={()=>setOpenEmojiPicker(prevState=>!prevState)}></i>
                    <i className="fas fa-paperclip form__Icon"  value={sendFile} onChange={e=>setSendFile(e)}></i>
                </div>
                    <input className="chat__Input" placeholder="message" name="name" value={sendMsg} onChange={e=>setSendMsg(e.target.value)}/>< SendIcon style={{cursor:'pointer'}} onClick={submitMsgHandler}/>
                    <i className="fas fa-microphone  form__Icon form__Icon__active" value={sendFile} onChange={e=>setSendFile(e)}></i>
            </div>
        </>
    )
}

export default ChatForm;
