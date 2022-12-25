import React, { useContext, useEffect } from 'react'
import {Link} from "react-router-dom"
import "./header.scss"
import logo from "../images/logo.png"
import { MdOutlineMenuBook } from "react-icons/md"
import {GrMail} from "react-icons/gr"
import {FaShoppingCart,FaHome} from "react-icons/fa"
import {SlCalender} from "react-icons/sl"
import {SiCodechef} from "react-icons/si"
import {BsQuestionCircle,BsChatDots} from "react-icons/bs"
import {FaSignInAlt} from "react-icons/fa"
import {BiUser} from "react-icons/bi"
import { context } from '../Context'
function Header() {
    let { isSignedIn, setIsSignedIn, openRegister, setOpenRegister, users, signinValue,setSigninValue } = useContext(context)
    let findSignedInUser = users.find(user => user.email === signinValue.email)
    console.log("🚀 ~ file: Header.jsx:16 ~ Header ~ isSignedIn", isSignedIn)
    let handleSignOut = () => {
        // setOpenRegister(true)
        setIsSignedIn(false)
        setSigninValue({
            email: "",
            password:""
        })
    }
  // let talkTitle = (title) => {
  //   let text = title
  //   let speach = new SpeechSynthesisUtterance(text)
  //   speach.pitch = 1
  //   window.speechSynthesis.speak(speach)
  // }
  
  
  return (
      <header>
          <div className="header_container">
              <Link title="Home" to="/home2">
              <img src={logo} alt="" />
              </Link>

              <div className="links_pages">
              


              <Link  title='Chat direct with us' to="/userChat"><BsChatDots/></Link>
              <Link  title='Send us your E-Mail' to="/contact"><GrMail/></Link>
              <Link  title="Go to your Cart" to="/cart"><h3 className='cart_length'>{findSignedInUser?.cart.length} </h3><FaShoppingCart/></Link>
              <Link title="Book a table" to="/book"><SlCalender/></Link>
              <Link  title="Work as a freelancer" to="/freelance"><SiCodechef/></Link>
              <Link  title="About us" to="/aboutUs"><BsQuestionCircle/></Link>
                  <Link  title="Home" to="/home2"><FaHome /></Link>
                  {isSignedIn ?
                  (<a  onClick={handleSignOut} title='Sign out'><FaSignInAlt /></a>)
                  :
                  (<a  onClick={()=>setOpenRegister(true)} title="Sign in" ><BiUser /></a>)
                }
              </div>
              <h4>Welcome { findSignedInUser?.username}</h4>
          </div>
    </header>
  )
}

export default Header