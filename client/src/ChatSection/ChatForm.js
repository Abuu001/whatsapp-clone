import React ,{useState,useEffect}from 'react'
import "./ChatForm.css"
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Picker from 'emoji-picker-react';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment"


function ChatForm({authInfo}) {
 
    const [sendMsg,setSendMsg]=useState('')
    const [sendFile,setSendFile]=useState("")
    const [record,setRecord]=useState(false)
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false)
    const [disableSubmitBtn,setDisableSubmitBtn]=useState(true) 

    const onEmojiClick = (event, emojiObject) => {
        //  setSendMsg([...sendMsg,emojiObject.emoji]);
        const msg=sendMsg.concat(emojiObject.emoji)
        setSendMsg(msg);
    };

    const submitMsgHandler=()=>{

        //if there !text => dont send empty msgs
        if(!sendMsg.length <1 && !sendMsg !=='' ){
            
            const currentTime =moment().format('LT');  //fetches the time posted
            const data={
                name : authInfo[0].additionalUserInfo?.profile.given_name,
                messages : sendMsg,
                time_sent : currentTime
            }
         axios.post("/api/v1/messages",data) 
        }

        //for sending files
        if(sendFile !==''){
            const formData = new FormData();
            
            // gets the name of the file to be uploaded
            formData.append('name' ,sendFile.name);
            formData.append('file' ,sendFile);
 
          //setSendFile(formData)
             
            console.log(sendFile); 
            console.log(formData); 
            const   fileConfig={
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }
 
            axios.post("/api/v1/uploads",formData,fileConfig)
        }

        setSendMsg('') 
        setSendFile('')
        setOpenEmojiPicker(false)
    } 
    
    const handleFileChange=(e)=>{
        setSendFile(e.target.files[0])

        //after img sent clear the filechooser
        if(sendFile === ''){
            return e.target.value =null;
        }
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
                  <span className="file__clip"> 
                        <input  type="file" name="image" id="file__Input"  accept=".jpg" onChange={e=>handleFileChange(e)}/>
                        <i className="fas fa-paperclip form__Icon file__clip__Icon"  ></i>
                  </span>
                </div>
                    <input className="chat__Input" placeholder="message" name="name" value={sendMsg} onChange={e=>setSendMsg(e.target.value)}/>  <IconButton onClick={submitMsgHandler}  >< SendIcon /></IconButton>
                   <i className="fas fa-microphone  form__Icon form__Icon__active"onChange={e=>setSendFile(e)}></i>
            </div> 
        </> 
    )
}
// className={`${disableSubmitBtn ===true ?  'btn__disable' :  'btn__enable'  }`}  
//  disabled={`${sendMsg.length < 1 ?  true : false}`}
export default ChatForm;
