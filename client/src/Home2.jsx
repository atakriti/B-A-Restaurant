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