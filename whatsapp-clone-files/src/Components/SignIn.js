import React, { useState } from "react";
import "../CSS Files/signIn.css";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [userInput, setUserInput] = useState({ userName: "", password: "" });
  const history = useNavigate();

  let name;
  let value;
  const handleInput = (e) => {
    value = e.target.value;
    name = e.target.name;
    setUserInput({ ...userInput, [name]: value });
  }

  const postData = async () => {
    const { userName, password } = userInput;
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    }); 

    const data = await response.json();
    if (response.status === 200) {
      setUserInput({userName: "", password: ""})      
      history("/chats");
    } else if (response.status === 422 || !data) {
      alert(data.message)
    } else if (response.status === 400 || !data) {
      alert(data.message)
    }
  };

  return (
    <>
      <div className="container">
        <form className="signInForm">
          <label className="labels" htmlFor="signInInfo">
            User Name
          </label>
          <div className="inputContainer">
            <input
              className="inputBoxes"
              type="text"
              id="userName"
              name="userName"
              value={userInput.userName}
              onChange={handleInput}
              placeholder="Enter Your User Name"
            />
          </div>

          <label className="labels" htmlFor="password">
            Password
          </label>
          <div className="inputContainer">
            <input
              className="inputBoxes"
              type="text"
              id="userPassword"
              name="password"
              value={userInput.password}
              onChange={handleInput}
              placeholder="Enter Your Password"
            />
          </div>
          <Link to="/">
            <button className="signInButton" onClick={postData} type="submit">
              Sign In
            </button>
          </Link>
        <Link to="/create-account">
          <button className="r_createAccount_Button" type="submit">
            Don't Have An Account
          </button>
        </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
