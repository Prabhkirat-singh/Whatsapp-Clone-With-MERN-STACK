import React from 'react'
import {Avatar} from '@material-ui/core';
import "../CSS Files/Chat.css"

function Chat() {
  return (
    <div className="chat">
        <Avatar />
        <div className='nameDis__Container'>
            <h3>ROOM NAME</h3>
            <p>Start New Chat!!!</p>
        </div>
    </div>
  )
}

export default Chat