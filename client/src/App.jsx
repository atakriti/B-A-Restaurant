import Home from "./Home";
import Home2 from "./Home2";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import Header from "./Header/Header"
import UserChat from "./UserChat/UserChat";
import Freelance from "./Freelance/Freelance";
import Signup from "./Signup/Signup";
import { context } from "./Context";
import Food from "./Food/Food";
import AboutUs from "./AboutUs/AboutUs";
import Contact from "./Contact/Contact";
import Cart from "./Cart/Cart";
import "./style.scss"
import Book from "./Book/Book";
import Footer from "./Footer/Footer"

function App() {
  // I made the home2 to make the logo go to it, and not render the useEffect 

let {openRegister} = useContext(context)
  return (
    <div className="App">
      {openRegister && <Signup />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home2" element={<Home2/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userChat" element={<UserChat />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/food/:type" element={<Food />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="/book" element={<Book/>} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
