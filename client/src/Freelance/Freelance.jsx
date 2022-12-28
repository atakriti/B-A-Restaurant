import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import axios from "axios"
import "./freelance.scss"
import {MdLocationPin} from "react-icons/md"
import { context } from "../Context";
import loading from "../images/loading.gif"

function Freelance() {
  let { signinValue, users,isSignedIn,freelanceMeals,fetchingFreelance,setFreelanceMeals,isLoadingFreelance } = useContext(context)
  console.log("🚀 ~ file: Freelance.jsx:8 ~ Freelance ~ freelanceMeals", freelanceMeals)
  let findUserId = users.find(user => user?.email === signinValue?.email)
  let [isAgreed,setIsAgreed] = useState(false)
  let [freelanceValue, setFreelanceValue] = useState({
    meal: "",
    price: null,
    tel: null,
    type: "",
    image: "",
    description: "",
    address: "",
    chefName:""
  })
  let [isPublished,setIsPublished] = useState(false)
  let handleChangeFreelance = (e) => {
    setFreelanceValue({...freelanceValue,[e.target.name]:e.target.value})
  }
  let handleSubmitFreelance = async (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    if (isSignedIn) {
      setIsPublished(true)

      await axios.post(`/freelance/${findUserId?._id}`, formData, freelanceValue, {
        headers:{"Content-Type":"multipart/form-data"}
      })
      fetchingFreelance().then(result => setFreelanceMeals(result))
      setIsPublished(false)
      alert("Your meal is successfully published")
      e.target.reset()
      setFreelanceValue({
        meal: "",
        price: null,
        tel: null,
        type: "",
        image: "",
        description: "",
        address: "",
        chefName:""
      })
    } else if (!isSignedIn) {
      alert("Sign in to publish")
    } else {
      alert("The meal is not published, Try again later")
    }
  }

  let handleDelete = async (item) => {
    setIsPublished(true)
    await axios.delete(`/deleteFreelanceMeal/${item._id}`)
    fetchingFreelance().then(result => setFreelanceMeals(result))
    setIsPublished(false)

  }
  return (
    <div className="freelance_">
       {isLoadingFreelance && (
          <div className="loading">
          <img src={loading} alt="" />
      </div>
      )}
      {isPublished && (
          <div className="loading">
          <img src={loading} alt="" />
      </div>
      )}
      <Header />
      <div className="freelance_container">
        <div className="form_container">
          <form onSubmit={handleSubmitFreelance}>
           <div className="form_left">
              <input required onChange={handleChangeFreelance} placeholder="Meal's name..." type="text" name="meal" value={freelanceValue.meal} />
              <input required onChange={handleChangeFreelance} placeholder="Price..." type="number" name="price" value={freelanceValue.price} />
              <input required onChange={handleChangeFreelance} placeholder="Meal's description example: meat,tomato,bread" type="text" name="description" value={freelanceValue.description} />
              <input required onChange={handleChangeFreelance} placeholder="Your name..." type="text" name="chefName" value={freelanceValue.chefName} />
              <input required onChange={handleChangeFreelance} placeholder="Mobile Nr..." type="number" name="tel" value={freelanceValue.tel} />
              <input required onChange={handleChangeFreelance} placeholder="Your City..." type="text" name="address" value={freelanceValue.address} />
              <input required onChange={handleChangeFreelance} type="file" name="image" id="" value={freelanceValue.image} />
           </div>
            {/* =================== Type ================= */}
            <div className="type">
                  <h3>Select the type</h3>
                  <label htmlFor="meat">
                 <h5>   Meat</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="meat" name="type" id="meat" />
                  </label>
                  <label htmlFor="dessert"> 
                 <h5> Desserts</h5>  
                  <input onChange={handleChangeFreelance} type="radio" required value="dessert" name="type" id="dessert" />
                  </label>
                  <label htmlFor="pasta">
                 <h5>   Pasta</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="pasta" name="type" id="pasta" />
                  </label>
                  <label htmlFor="chicken">
                 <h5>   Chicken</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="chicken" name="type" id="chicken" />
                  </label>
                  <label htmlFor="vegetarian">
                 <h5>   Vegetarian</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="vegetarian" name="type" id="vegetarian" />
                  </label>
                  <label htmlFor="bakery">
                 <h5>   Bakery</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="bakery" name="type" id="bakery" />
                  </label>
                  <label htmlFor="fish">
                 <h5>   Fish</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="fish" name="type" id="fish" />
                  </label>
                  <label htmlFor="drink">
                 <h5>   Drink</h5>
                  <input onChange={handleChangeFreelance} type="radio" required value="drink" name="type" id="drink" />
                  </label>
                 
                </div>
            {/* ==================== File ============= */}
          <div className="form_bottom">
              {/* ====================== */}
              <div className="agrement">
              <label htmlFor="agreement">
                <input onChange={()=>setIsAgreed(!isAgreed)} type="checkbox" name="" id="agreement" />
                <h3>I Agree</h3>
              </label>
              <p>
                The published meal or drink MUST NOT include any traces of alcohol
                or pork or any materials that contain drugs, harmful herbs, or
                materials that cause allergies or carcinogens
              </p>
              </div>
              <button disabled={isAgreed === false}>Publish</button>
          </div>
          </form>
        </div>
        {/* ========================================================================  */}
        <div className="showMeals_">
          <div className="showMeals_container">
            {freelanceMeals?.map(item => (
              <div className="meal_">
                <h1>Meal: {item.meal}</h1>
                <h3>Type: {item.type}</h3>
                <h3>Price: {item?.price?.toFixed(2)}€</h3>
                <h3>Description: </h3>
                <ul>{item.description?.split(",").map(item => <li>{ item}</li>)}</ul>
                <h3>{item.address} <MdLocationPin/></h3>
                <h3>{ item.chefName}</h3>
                <a className="mealImg_"><img src={`${item.image}`} alt="" /></a>
                <div className="meal_btns">
                  <a data-tel={item.tel} href={`tel:+${item.tel}`}>Call</a>
                  {item?.userId === findUserId?._id && (
                    <button onClick={()=>handleDelete(item)}>Delete</button>
                  )}
                </div>
              </div>
          ))}
          </div>
        </div>
         

        {/* ============================= */}
      </div>
    </div>
  );
}

export default Freelance;
