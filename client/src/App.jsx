import Pusher from "pusher-js";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import { context } from "./Context";
import Home from "./Home";
import "./style.scss"
import UserChat from "./UserChat/UserChat";

function App() {

  let {signinValue,users,products,fetchUsers,setUsers,allChat,setAllChat,selectedUserToChat,setSelectedUserToChat} = useContext(context)


  









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
