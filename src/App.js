import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header/header";
import Loginheader from "./component/header/loginheader";
import Login from "./component/login/login";
import Signup from "./component/login/signup";
import Write from "./component/write/write";
import Magazine from "./component/magazine/magazine";
import { auth } from "./shared/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Update from "./component/write/update";

function App() {
  console.log(auth.currentUser);
  const [is_login, setIsLogin] = useState(false);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <div className="App">
      <Router>
        {is_login ? <Loginheader /> : <Header />}
        <Routes>
          <Route path="/" element={<Magazine />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="write" element={<Write />}></Route>
          <Route path="update/:id" element={<Update />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
