import React from 'react'
import "./ChatSection.css"
import ChartHeader from "./ChatHeader";
import Chat from "./Chat"
import ChatForm from "./ChatForm"

function ChartSection() {
    return (
        <div>
            <ChartHeader />
            <Chat />
            <ChatForm />
        </div>
    )
}

export default ChartSection
