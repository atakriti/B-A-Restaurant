import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage"
import Pusher from 'pusher-js'
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
  let [products,setProducts] = useState([])
  useEffect(() => {
    fetchUsers().then(result => setUsers(result))
    fetchingProducts().then(result => setProducts(result))

    // var pusher = new Pusher('f53671d3665007b93cb0', {
    //   cluster: 'eu'
    // });

    // var channel = pusher.subscribe('updateUsers');
    // channel.bind('inserted', (data) => {
    //   alert(JSON.stringify(data));
    // });








  },[])
  return (
      <context.Provider value={{users,setUsers,signinValue, setSigninValue,products,setProducts}}>{ children}</context.Provider>
  )
}

export default Context