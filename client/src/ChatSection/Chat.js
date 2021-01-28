import React from 'react'
import "./Chat.css"

function Chat() {
    return (
        <div className="chat__Section">
            <div className="chat you">
                <span className="name">
                    Abuuu
                </span>
            <p className="msg">message</p>
            <span className="time">10:50 PM</span> 
            </div>

            <div className="chat me">
                <span className="name">
                    Martha
                </span>
            <p className="msg">Niaje bro</p>
            <span className="time">10:50 PM</span> 
            </div>
        </div>
    )
}

export default Chat
