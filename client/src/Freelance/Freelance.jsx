import React from "react";
import Header from "../Header/Header";
import "./freelance.scss"
function Freelance() {
  return (
    <div className="freelance">
      <Header />
      <div className="freelance_container">
        <div className="form_container">
          <form>
           <div className="form_left">
              <input placeholder="Meal's name..." type="text" name="meal" id="" />
              <input placeholder="Price..." type="number" name="price" id="" />
              <input placeholder="Meal's description..." type="text" name="description" id="" />
              <input placeholder="Your name..." type="text" name="chefName" id="" />
              <input placeholder="Mobile Nr..." type="number" name="tel" id="" />
              <input placeholder="Your Address..." type="text" name="address" id="" />
              <input type="file" name="image" id="" />
           </div>
            {/* =================== Type ================= */}
            <div className="type">
                  <h3>Select the type</h3>
                  <label htmlFor="meat">
                 <h5>   Meat</h5>
                  <input type="radio" required value="meat" name="type" id="meat" />
                  </label>
                  <label htmlFor="dessert"> 
                 <h5> Desserts</h5>  
                  <input type="radio" required value="dessert" name="type" id="dessert" />
                  </label>
                  <label htmlFor="pasta">
                 <h5>   Pasta</h5>
                  <input type="radio" required value="pasta" name="type" id="pasta" />
                  </label>
                  <label htmlFor="chicken">
                 <h5>   Chicken</h5>
                  <input type="radio" required value="chicken" name="type" id="chicken" />
                  </label>
                  <label htmlFor="vegetarian">
                 <h5>   Vegetarian</h5>
                  <input type="radio" required value="vegetarian" name="type" id="vegetarian" />
                  </label>
                  <label htmlFor="bakery">
                 <h5>   Bakery</h5>
                  <input type="radio" required value="bakery" name="type" id="bakery" />
                  </label>
                  <label htmlFor="fish">
                 <h5>   Fish</h5>
                  <input type="radio" required value="fish" name="type" id="fish" />
                  </label>
                  <label htmlFor="drink">
                 <h5>   Drink</h5>
                  <input type="radio" required value="drink" name="type" id="drink" />
                  </label>
                 
                </div>
            {/* ==================== File ============= */}
          <div className="form_bottom">
              {/* ====================== */}
              <div className="agrement">
              <span>
                <input type="checkbox" name="" id="" />
                <h3>I Agree</h3>
              </span>
              <p>
                The published meal or drink MUST NOT include any traces of alcohol
                or pork or any materials that contain drugs, harmful herbs, or
                materials that cause allergies or carcinogens
              </p>
              </div>
              <button>Publish</button>
          </div>
          </form>
        </div>
         

        {/* ============================= */}
      </div>
    </div>
  );
}

export default Freelance;
