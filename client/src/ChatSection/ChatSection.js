import React from 'react'
import "./ChatSection.css"
import ChartHeader from "./ChatHeader";
import Chat from "./Chat"
import ChatForm from "./ChatForm"

function ChartSection({authInfo}) {
    return (
        <>
            <ChartHeader authInfo={authInfo} />
            <Chat authInfo={authInfo}/>
            <ChatForm authInfo={authInfo}/> 
        </>
    )
} 

export default ChartSection
