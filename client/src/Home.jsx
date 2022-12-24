import React, { useContext, useEffect } from 'react'
import { context } from './Context'
import Header from './Header/Header'
import LandingPage from './LandingPage/LandingPage'
import Menu from './Menu/Menu'
import SectionsLanding from './SectionsLanding/SectionsLanding'
import Signup from './Signup/Signup'

function Home() {
  let { openRegister,isSigninToSpeak,isSigninOutSpeak } = useContext(context)
  console.log("🚀 ~ file: Home.jsx:11 ~ Home ~ isSigninToSpeak", isSigninToSpeak)
  useEffect(() => {
    if (isSigninToSpeak === true) {
      let text = "Welcome to our Restaurant, enjoy"
         let speach = new SpeechSynthesisUtterance(text)
         speach.pitch = 1
         window.speechSynthesis.speak(speach)
      }
  }, [isSigninToSpeak])
  
  useEffect(() => {
    if (isSigninOutSpeak === true) {
      let text = "Good bye"
         let speach = new SpeechSynthesisUtterance(text)
         speach.pitch = 1
         window.speechSynthesis.speak(speach)
      }
  },[isSigninOutSpeak])
  return (
    <div>
      
      <Header/>
      {/* <Signup/> */}
      <LandingPage />
      <Menu />
      <SectionsLanding/>
    </div>
  )
}

export default Home