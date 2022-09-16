import React from 'react'
import {Avatar} from '@material-ui/core';
import "../CSS Files/Chat.css"

function Chat({roomName, caption}) {
  return (
    <div className="chat">
        <Avatar />
        <div className='nameDis__Container'>
            <h3>{roomName}</h3>
            <p>{(caption.length >= 17)? `${caption.slice(0, 17)}...` : `${caption}`}</p>
        </div>
    </div>
  )
}

export default Chat