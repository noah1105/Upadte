import React, { createContext, useState } from "react";
import "./styles.css";
import uploadLogo from "./upload.png";
import Home from "./Pages/Home";
import firebase from "firebase/app";
import "firebase/storage";

import Profile from "./Pages/Profile";
import Login from "./Login";
import Feed from "./Pages/Feed";

import "./styles.css";
import { auth, db } from "./firebaseConfig";
import createUserWithEmailAndPassword from "firebase/auth";
import { Routes, Route, useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

// import Profile from "./Pages/Profile";
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUpload = (event) => {
    const files = event.target.files;
    const newPhotos = [...photos];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        newPhotos.push(event.target.result);
        setPhotos(newPhotos);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="container" style={{ backgroundColor: "lightblue" }}>
      <div className="logo-container" style={{ backgroundColor: "lightgreen" }}>
        <img src={uploadLogo} alt="Upload Logo" className="logo" />
        <h2 className="heading">Upload your photos here</h2>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="profile" element={<Profile />} />
        <Route path="feed" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
