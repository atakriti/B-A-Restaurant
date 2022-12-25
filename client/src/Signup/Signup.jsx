import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signup.scss"
import axios from "axios"
import { context } from '../Context'
import loading from "../images/loading.gif"

function Signup() {
    let { users, setUsers, signinValue, setSigninValue,isSignedIn,setIsSignedIn,setOpenRegister,fetchUsers,changeValueSignin, setChangeValueSignin,isSigninToSpeak,setIsSigninToSpeak,isLoadingUsers } = useContext(context)
    
    console.log("🚀 ~ file: Signup.jsx:8 ~ Signup ~ signinValue", signinValue)
    let [switchBtn, setSwitchBtn] = useState(1)
    let navigate = useNavigate()
    let [signupValue, setSignupValue] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
        street: "",
        plz: "",
        tel:""
    }) 
    let [rePassword, setRePassword] = useState("")
    let [passwordNotMatch, setPasswordNotMatch] = useState("")
    let [passwordReq,setPasswordReq] = useState("")
    
    // ======================== Sign up =====================
    let handleChangeSignup = (e) => {
        setSignupValue({ ...signupValue, [e.target.name]: e.target.value })
       
    }
    let handleSubmitSignup = async (e) => {
        e.preventDefault()
        if (users.some(user => user.email === signupValue.email)) {
            alert("This user is allready exist !")
        }  else if (signupValue.password === rePassword) {
            await axios.post("/newUser", signupValue)
            setSignupValue({
                username: "",
                email: "",
                password: "",
                city: "",
                street: "",
                plz: "",
                tel:""
            })
            setRePassword("")
            alert("Your registration is successfully done")
            setSwitchBtn(1)
            setPasswordNotMatch("")
            setPasswordReq("")
            setSigninValue({
                email: signupValue.email,
                password:signupValue.password
            })
            
        } else {
            setPasswordNotMatch("The passwords are not matched !")
        }
      
    }
    // ============================ Sign in ======================
    let handleChangeSignin = (e) => {
        setChangeValueSignin({...changeValueSignin,[e.target.name]:e.target.value})
    }
    let handleSubmitSignin = (e) => {
        e.preventDefault()


        if(users.some(user => user.email === changeValueSignin.email && user.password === changeValueSignin.password)) {
            setIsSignedIn(true)
            setSigninValue({
                email: changeValueSignin.email,
                password:changeValueSignin.password
            })
            setOpenRegister(false)
            navigate("/")
            setIsSigninToSpeak(true)
        } else if (changeValueSignin.email === "admin-ba@baTeam.com" && changeValueSignin.password === "Admin123") {
            navigate("/admin") 
            setSigninValue({
                email: "",
                password:""
            })
            setOpenRegister(false)
            
        }else{
            alert("Username or Password is not correct !")
        }
       
    }
    useEffect(() => {
        fetchUsers().then(result => setUsers(result))
    }, [switchBtn])
    
  return (
      <div className='signup'>
           {isLoadingUsers && (
              <div className="loading">
                  <img src={loading} alt="" />
              </div>
          )}
          <div className="signup-container">
             
              {/* ===================== Titles ================== */}
              <div className="titles">
                  <button className={switchBtn === 1 && "line"} onClick={()=>setSwitchBtn(1)}>Sign in</button>
                  <button className={switchBtn === 2 && "line"} onClick={()=>setSwitchBtn(2)}>Sign up</button>
              </div>
              {/* ======================= Form ==================== */}
              {switchBtn === 1 && (
                  <form onSubmit={handleSubmitSignin}>
                  <input required onChange={handleChangeSignin} value={changeValueSignin.email} type="email" name="email" placeholder='Enter your E-Mail...' />
                  <input required onChange={handleChangeSignin} value={changeValueSignin.password} type="password" name="password" placeholder='Enter your Passowrd...' />
                      <button>Sign in</button>
                      <article onClick={() => setOpenRegister(false)}>Close</article>
              </form>
              )}
              {switchBtn === 2 && (
                  <form onSubmit={handleSubmitSignup} >
                      <span>
                      <input required onChange={handleChangeSignup} value={signupValue.username} type="text" name="username" placeholder='Enter your full name...' />
                      <input required onChange={handleChangeSignup} value={signupValue.email} type="email" name="email" placeholder='Enter you E-Mail...' />
                    </span>
                      <span>
                      <input title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={handleChangeSignup} value={signupValue.password} type="password" name="password" placeholder='Enter your Password...' />
                      <input title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e)=>setRePassword(e.target.value)} value={rePassword} type="password" name="rePassword" placeholder='Repeat your Passowrd...' />
                      </span>
                      <h4>{passwordNotMatch}</h4>
                      <h4>{passwordReq}</h4>
                      
                      <input required onChange={handleChangeSignup} value={signupValue.city} type="text" name="city" placeholder='Enter City...' />
                      <input required onChange={handleChangeSignup} value={signupValue.street} type="text" name="street" placeholder='Enter Street...' />
                      <input required onChange={handleChangeSignup} value={signupValue.plz} type="text" name="plz" placeholder='Enter PLZ...' />
                      <input required onChange={handleChangeSignup} value={signupValue.tel} type="tel" name="tel" placeholder='Enter mobile-Nr...' />
                      <button >Sign up</button>
                      <article onClick={() => setOpenRegister(false)}>Close</article>
                  </form>
              )}
              
          </div>
    </div>
  )
}

export default Signup