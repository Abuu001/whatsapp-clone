import React from 'react'
import "./ChatForm.css"

function ChatForm() {
    return (
        <div className="chartForm">
            <div className="action__Butn">
                <i className="far fa-smile form__Icon"></i>
                <i className="fas fa-paperclip form__Icon"></i>
            </div>
                <input className="chat__Input" placeholder="message"/>
                <i className="fas fa-microphone  form__Icon form__Icon__active"></i>
        </div>
    )
}

export default ChatForm
