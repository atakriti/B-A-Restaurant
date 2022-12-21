import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage"
import Pusher from 'pusher-js'
// import "dotenv/config";
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
  let fetchingProducts = async () => {
    let fetching = await fetch("http://localhost:4000/getProducts")
    let json = await fetching.json()
    return json
  }
  let [products, setProducts] = useState([])

  let fetchingFreelance = async () => {
    let fetching = await fetch("http://localhost:4000/getFreelance")
    let json = await fetching.json()
    return json
  }
  let [freelanceMeals,setFreelanceMeals] = useState([])




  let [allChat, setAllChat] = useState([])
  let [selectedUserToChat, setSelectedUserToChat] = useState()
  // let [isSignedIn, setIsSignedIn] = useState(false)
  let [isSignedIn, setIsSignedIn] = useLocalStorage("isSignedIn",false)
  let [openRegister,setOpenRegister] = useState(false)
  console.log("🚀 ~ file: Context.jsx:23 ~ Context ~ allChat", allChat)



  useEffect(() => {
    fetchUsers().then(result => setUsers(result))
    fetchingProducts().then(result => setProducts(result))
    fetchingFreelance().then(result => setFreelanceMeals(result))
  }, [])

  useEffect(() => {
    let pusher = new Pusher("f53671d3665007b93cb0", {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('updateUsers');
    channel.bind('inserted', (data) => {
      console.log("🚀 ~ file: Context.jsx:34 ~ channel.bind ~ data", data)
      // alert(JSON.stringify(data));
      setAllChat([...allChat, data])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe()
    }
  },[allChat])



  useEffect(() => {
    fetchUsers().then(result => setUsers(result))
  }, [selectedUserToChat])

  useEffect(() => {
    fetchUsers().then(result => setUsers(result))
  }, [allChat])
  
  return (
      <context.Provider value={{users,setUsers,signinValue, setSigninValue,fetchingProducts,products,setProducts,fetchUsers,setUsers,allChat,setAllChat,selectedUserToChat,setSelectedUserToChat,isSignedIn,setIsSignedIn,openRegister,setOpenRegister,fetchingFreelance,freelanceMeals,setFreelanceMeals}}>{ children}</context.Provider>
  )
}

export default Context