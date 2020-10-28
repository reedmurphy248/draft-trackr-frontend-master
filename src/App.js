import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Logout from "./components/Logout";
import UploadContacts from './components/UploadContacts';
import postRegistration from './components/PostRegistration';
import RemoveContacts from './components/RemoveContacts';
import WelcomePage from './components/WelcomePage';



function App() {
  const [currentPage, updatePageLocation] = useState("http://localhost:3000/");

  useEffect(() => {
    updatePageLocation(window.location.href);
  })

  return (
    <Router>
      <div className="App">
        <Navbar currentPage = {currentPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={MainPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/upload" component={UploadContacts} />
        <Route path="/postRegistration" component={postRegistration} />
        <Route path="/remove" component={RemoveContacts} />
        <Route path="/" exact component={WelcomePage} />
      </div>
    </Router>
  );
}

export default App;
