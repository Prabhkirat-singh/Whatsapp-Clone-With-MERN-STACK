import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS Files/SideBar.css";
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MessageIcon from "@material-ui/icons/Message";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "./Chat";
import ChatBox from "./ChatBox";

function SideBar() {
  const [inputSearchBar, setInputSearchBar] = useState({ name: "" });
  const [userFname, setFnameData] = useState("");
  const [userLname, setLnameData] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState([]);
  const history = useNavigate();

  const callChatPage = async () => {
    try {
      const res = await fetch("/chats", {
        method: "GET",
        heaers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      const { fname, lname } = data;
      setFnameData(fname);
      setLnameData(lname);

      if (!res.status === 200) {
        history("/");
      }
    } catch (err) {
      history("/");
    }
  };

  useEffect(() => {
    callChatPage();
  });

  useEffect(() => {
    fetch(('/chats-fetching-All-Users'), {
      method: "GET",
        heaers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((res)=>{
      res.json().then((data)=>{
        setUserData(data.users)
      })
    })
  }, [])

  const handleInput = (e) => {
    const value = e.target.value;
    setInputSearchBar({ name: value });
  };

  const postData = async () => {
    const { name } = inputSearchBar;
    const response = await fetch("/chats/find-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: name }),
    });

    const data = await response.json();
    if (response.status === 200) {
      console.log(data.message);
    } else if (response.status === 404 || !data) {
      console.log(data.message);
    }
  };

  return (
    <>
      <div className="sidebar__container">
        <div className="sidebar__header">
          <Avatar
            src={`https://ui-avatars.com/api/?background=random&name=${userFname} ${userLname}`}
          />
          <div className="sidebar__headerRight">
            <DonutLargeIcon />
            <MessageIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="sidebar__search">
          <form>
            <div>
              <div onClick={postData}>
                <SearchIcon />
              </div>
              <input
                value={inputSearchBar.name}
                onChange={handleInput}
                type="text"
                placeholder="Search Room Name"
              />
            </div>
          </form>
        </div>
        {userData.map((data) => (
          <Chat roomName={data.userName} caption={data.fname} />
        ))}
      </div>
      <ChatBox />
    </>
  );
}

export default SideBar;
