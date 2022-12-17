import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import Home from "./Home";
import "./style.scss"
import UserChat from "./UserChat/UserChat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userChat" element={<UserChat/>}/>
      </Routes>
    </div>
  );
}

export default App;
