import '../CSS Files/App.css';
import SideBar from "./SideBar";
import SignIn from "./SignIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <Router>
    <div className="app">
      <div className="app__body">
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/chats" element={<SideBar />} />
      </Routes>

      </div>
    </div>
    </Router>
  );
}

export default App;
