import React, { useContext, useEffect, useState } from 'react'
import { ImUserTie } from "react-icons/im"
import "./userChat.scss"
import {context} from "../Context"
import axios from 'axios'
import Header from '../Header/Header'
import loading from "../images/loading.gif"

function UserChat() {
    let {signinValue,users,scrollIntoViewRef,fetchUsers,setUsers,isLoadingUsers} = useContext(context)
    let findSignedin = users.find(user => user.email === signinValue.email)
    let [foundUserState,setFoundUserState] = useState(findSignedin)
    console.log("🚀 ~ file: UserChat.jsx:8 ~ UserChat ~ findSignedin", findSignedin)
  // ==================================== Here is the full date ===========================
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let FullDate = year + "/" + month + "/" + day
    let FullTime = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
let result = FullDate + "–" + FullTime
    
  // ==================================== Here end the full date ===========================
   
    let [chatValue, setChatValue] = useState({
        text: "",
        from: "",
        timeStamp:result ,
        sender:""
    })
    

    let handleSubmitChat = async (e) => {
        e.preventDefault()
        await axios.put(`/pushChat/${findSignedin._id}`, {...chatValue,from:findSignedin?._id,sender:findSignedin?.username})
        setChatValue({
            text: "",
            from: "",
            timeStamp:result,
            sender:""
        })
    }
    let handleDeleteChat = async (item) => {
        if (item.from === foundUserState._id) {
            let filterChats = foundUserState.chat.filter(it => it._id !== item._id)
            setFoundUserState({...foundUserState,chat:filterChats})
            await axios.delete(`/deleteChat/${item._id}`)
            await axios.put(`/updateUser/${findSignedin._id}`, { ...foundUserState, chat: filterChats })
            fetchUsers().then((result) => setUsers(result));
        }
       
    }
    useEffect(() => {
        setFoundUserState(findSignedin)
    },[users])
  return (
      <div className='userChat'>
            {isLoadingUsers && (
              <div className="loading">
                  <img src={loading} alt="" />
              </div>
          )}
      <Header/>

          {/* ============== Left ============ */}
          <div className="left">
              <div className="chatWithChef">
                  <ImUserTie />
                  <h2>Chat with Admin</h2>
              </div>
                  <h6>Delete your message by Double Click</h6>
          </div>
          {/* =================== right =========== */}
          <div className="right">
              <h1>Hello { findSignedin ? findSignedin.username : "Please sign in"}</h1>
              {/* ==================== chat =============== */}
              <div className="chatField">
                 {findSignedin?.chat.length === 0 && <h1>The chat is empty, no conversation</h1>}
                  {findSignedin?.chat.map(item => (
                          <span onDoubleClick={()=>handleDeleteChat(item)} ref={scrollIntoViewRef}  className={item.from === "639d98fe13b1053bdd4945fc" ? "leftText" : "rightText"}>
                          <h6>{item.from === "639d98fe13b1053bdd4945fc" ? "Admin" : findSignedin.username}</h6>
                          <p>{ item.text}</p>
                          <h5>{ item.timeStamp}</h5>
                          </span>
                          ))}
                  
              </div>
              {/* ===================== Form ================== */}
              <form onSubmit={handleSubmitChat}>
                  <input value={chatValue.text} onChange={(e)=>setChatValue({...chatValue,text:e.target.value})} placeholder='How can we help you ?' type="text" name="chatText" />
                  <button>Send</button>
              </form>
          </div>
    </div>
  )
}

export default UserChat