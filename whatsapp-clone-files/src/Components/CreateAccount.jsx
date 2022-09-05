import React, { useState } from "react";
import "../CSS Files/CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";

function CreateAccount() {
  const [userInput, setUserInput] = useState({ userName: "", fname: "", lname: "", password: "" });
  const history = useNavigate();

  let name;
  let value;
  const handleInput = (e) => {
    value = e.target.value;
    name = e.target.name;
    setUserInput({ ...userInput, [name]: value });
  };

  const postData = async () => {
    const { userName, fname, lname, password } = userInput;
    const response = await fetch("/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, fname, lname, password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      return true
    } else if (response.status === 422 || !data) {
      console.log(data);
      history("/create-account");
    }
  };

  return (
    <>
      <div className="container">
        <form className="CreateAccountForm">
          <label className="labels" htmlFor="CreateAccountInfo">
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

          <label className="labels" htmlFor="CreateAccountInfo">
            First Name
          </label>
          <div className="inputContainer">
            <input
              className="inputBoxes"
              type="text"
              id="fname"
              name="fname"
              value={userInput.fname}
              onChange={handleInput}
              placeholder="Enter Your First Name"
            />
          </div>

          <label className="labels" htmlFor="CreateAccountInfo">
            Last Name
          </label>
          <div className="inputContainer">
            <input
              className="inputBoxes"
              type="text"
              id="lname"
              name="lname"
              value={userInput.lname}
              onChange={handleInput}
              placeholder="Enter Your Last Name"
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
          <Link to="/chats">
            <button className="CreateAccountButton" onClick={postData} type="submit">
                Create Account
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
