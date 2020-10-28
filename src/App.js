import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainNav from "./components/MainNav";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Logout from "./components/Logout";
import UploadContacts from './components/UploadContacts';
import postRegistration from './components/PostRegistration';
import RemoveContacts from './components/RemoveContacts';
import WelcomePage from './components/WelcomePage';



function App() {

  return (
    <Router>
      <div className="App">
        <MainNav />
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
