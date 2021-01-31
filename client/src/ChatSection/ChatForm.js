import React ,{useState,useEffect}from 'react'
import "./ChatForm.css"
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Picker from 'emoji-picker-react';
import IconButton from '@material-ui/core/IconButton';

function ChatForm({authInfo}) {
 
    const [sendMsg,setSendMsg]=useState('')
    const [sendFile,setSendFile]=useState([])
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
    const [disableSubmitBtn,setDisableSubmitBtn]=useState(true) 

    const onEmojiClick = (event, emojiObject) => {
        //  setSendMsg([...sendMsg,emojiObject.emoji]);
        const msg=sendMsg.concat(emojiObject.emoji)
        setSendMsg(msg);
    };

    const submitMsgHandler=async()=>{
console.log(sendMsg.length);
                   
        const data={
                    name : authInfo[0].additionalUserInfo?.profile.given_name,
                    image : sendFile,
                    message : sendMsg
                }
              await  axios.post("/api/v1/messages",data)

                 // if  !messages => disable button 
                //  if(sendMsg.length <=1 ){
                //     setDisableSubmitBtn(prevState=>!prevState)
                // }

        setSendMsg('') 
        setSendFile('')
        setOpenEmojiPicker(false)
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
                    <input className="chat__Input" placeholder="message" name="name" value={sendMsg} onChange={e=>setSendMsg(e.target.value)}/>  <IconButton onClick={submitMsgHandler}  >< SendIcon /></IconButton>
                    <i className="fas fa-microphone  form__Icon form__Icon__active" value={sendFile} onChange={e=>setSendFile(e)}></i>
            </div>
        </>
    )
}
// className={`${disableSubmitBtn ===true ?  'btn__disable' :  'btn__enable'  }`}  
//  disabled={`${sendMsg.length < 1 ?  true : false}`}
export default ChatForm;
