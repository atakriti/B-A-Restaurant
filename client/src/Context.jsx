import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage"
export let context = createContext()
function Context({ children }) {
  let fetchUsers = async () => {
    let fetching = await fetch("http://localhost:4000/getAllUsers")
    let json = await fetching.json()
    return json
  }
  let [users, setUsers] = useState([])
  let [signinValue, setSigninValue] = useLocalStorage("signedin",{
    email: "",
    password:""
})
  useEffect(() => {
    fetchUsers().then(result => setUsers(result))
  },[])
  return (
      <context.Provider value={{users,setUsers,signinValue, setSigninValue}}>{ children}</context.Provider>
  )
}

export default Context