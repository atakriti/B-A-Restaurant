import React, { useContext } from 'react'
import { context } from './Context'
import LandingPage from './LandingPage/LandingPage'
import Menu from './Menu/Menu'
import Signup from './Signup/Signup'

function Home() {
  let { openRegister } = useContext(context)

  return (
    <div>
      {openRegister &&  <Signup/>  }
      {/* <Signup/> */}
      <LandingPage />
    <Menu/>
    </div>
  )
}

export default Home