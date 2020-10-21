import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Login} />
        <Route path="/main" component={MainPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/upload" component={UploadContacts} />
        <Route path="/postRegistration" component={postRegistration} />
      </div>
    </Router>
  );
}

export default App;
