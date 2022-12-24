import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Context'
import {BsPaypal} from "react-icons/bs"
import Header from '../Header/Header'
import "./cart.scss"
import axios from 'axios'
import Review from "../Review/Review"
function Cart() {


    let { isSignedIn, setIsSignedIn, openRegister, setOpenRegister, users, signinValue,setSigninValue,fetchUsers, setUsers,products,showReview,setShowReview} = useContext(context)
    let findSignedInUser = users.find(found => found.email === signinValue.email)

    let [foundUserState, setFoundUserState] = useState(findSignedInUser)

    // let [selectedMeal,setSelectedMeal] = useState()
  let [isPopup, setIsPopup] = useState(false)
    let handlePay = async () => {
        if (isSignedIn === true) {
            setIsPopup(true)
            setTimeout(() => setIsPopup(false), 3600)
            // ================ Speak ===============
            let text = "Thank you for your visiting, you can't pay, because this website is Demo"
            let speach = new SpeechSynthesisUtterance(text)
            speach.pitch = 1
            window.speechSynthesis.speak(speach)
            // ============= Speak end ==============


      setFoundUserState({ ...foundUserState, cart: [] })
      await axios.put(`/updateUser/${foundUserState?._id}`, { ...foundUserState, cart: [] })
      fetchUsers().then(result => setUsers(result))
      if (foundUserState.comment === undefined && foundUserState.rate === undefined) {
          setTimeout(() => setShowReview(true), 3600)
      }
        } else {
            alert("You are not signed in")
      }
    

      
      
    }
    let total = findSignedInUser?.cart.reduce((prev, curr) => prev + curr?.quan * curr?.price, 0)
    let handleDelete = async (item) => {
        let findMeal = findSignedInUser?.cart.filter(it => it._id !== item._id)
        setFoundUserState({...foundUserState,cart:findMeal})

        await axios.put(`/updateUser/${foundUserState?._id}`, { ...foundUserState, cart: findMeal })
        fetchUsers().then(result => setUsers(result))
    }
   



  







    useEffect(() => {
        setFoundUserState(findSignedInUser)
    }, [users])
    console.log("🚀 ~ file: Cart.jsx:11 ~ Cart ~ foundUserState", foundUserState)
    
  return (
      <div className='cart_'>
          {showReview && (
          <Review/>
          )}
          <Header />
          <div className="cart_container">
              {/* ===================== Left =============== */}
              <div className="cart_left">
                  {findSignedInUser?.cart.map(item => (
                      <div className="cart_box">
                          <h1>{item.name}</h1>
                          <h4>Type: { item.type}</h4>
                          <h4>Price: {item.price}€</h4>
                          <h4>Quantity: {item.quan}</h4>
                          <button onClick={()=>handleDelete(item)} >Remove</button>
                      </div>
              ))}
              </div>
              {/* ==================== Right ================= */}
              <div className="cart_right">
                  <div className="cart_right_invoice">
                      <h1>Invoice</h1>
                      {findSignedInUser?.cart.map(item => (
                          <div className="singleInvoice">
                              <h2>{item.name}</h2>
                              <h3>{`${item.quan} x ${item.price}€`}</h3>
                              <h5>{ item.quan * item.price}€</h5>
                          </div>
                    ))}
                  </div>
                  <h2>Total: { total?.toFixed(2)}€</h2>
                 <button onClick={handlePay}>Paypal <BsPaypal/></button>
              
              </div>

              {/* ================================= */}
              {isPopup && (
                   <div className="demo_pop">
                   <h1>Thank you for your visiting, you can't pay, because this website is Demo </h1>
                   </div>
             )}
          </div>
    </div>
  )
}

export default Cart