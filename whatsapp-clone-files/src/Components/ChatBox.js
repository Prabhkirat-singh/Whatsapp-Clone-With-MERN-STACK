import React from 'react'
import "../CSS Files/ChatBox.css"
import {Avatar} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';

function ChatBox() {
  function sendMsg() {
    const message__Area = document.querySelector('.message__Area')
    const msgContainer = document.createElement('div');
    const msg = document.createElement('p')
    const enteredMsg = document.querySelector('.msgInputBox').value;
    msgContainer.className = "message";
    msg.className = 'right';
    msg.innerText = enteredMsg
    msgContainer.appendChild(msg)
    message__Area.appendChild(msgContainer)
    console.log(enteredMsg)
  }

  return (
    <div className="chatBox">
      <div className='chatBox__header'>
        <div className='icon_Name'>
          <Avatar src="https://ui-avatars.com/api/?background=random&name=Kirat+Singh"/>
          <h2>Room Name</h2>
        </div>
      <div className="chatBox__headerRight">
        <SearchIcon />
        <MoreVertIcon />
      </div>
      </div>
      
      <div className="message__Area">

        <div className="message">
          <p className='left'>Hello How are you Kirat</p>
        </div>
        <div className="message">
          <p className="right">I am fine How about you</p>
        </div>
        <div className="message">
          <p className="left">I'm also doing well. I have joined coding classes</p>
        </div>

      </div>
      
      <div className="chatBox__footer">
        <div className="input__message">
          <EmojiEmotionsIcon />
          <div>
          <input className="msgInputBox" type="text" placeholder='Type a message'/>
          <button onClick={sendMsg} ><SendIcon /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox