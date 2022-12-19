import Home from "./Home";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import { context } from "./Context";
import Header from "./Header/Header"
import "./style.scss"
import UserChat from "./UserChat/UserChat";

function App() {


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userChat" element={<UserChat/>}/>
      </Routes>
    </div>
  );
}

export default App;
