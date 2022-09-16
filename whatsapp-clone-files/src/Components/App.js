import React from 'react';
import '../CSS Files/App.css';
import SideBar from "./SideBar";
import SignIn from "./SignIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateAccount from './CreateAccount';

function App() {
  document.title = "Whatsapp Clone"
  return (
    <Router>
    <div className="app">
      <div className="app__body">
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/chats" element={<SideBar />} />
        <Route exact path="/create-account" element={<CreateAccount />} />
      </Routes>

      </div>
    </div>
    </Router>
  );
}

export default App;
