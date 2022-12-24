import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../Context";
import { TbRotate360 } from "react-icons/tb";
import { HiOutlineHand } from "react-icons/hi";
import Header from "../Header/Header";
import "./food.scss";
import cart_logo from "../images/cart-logo.png";
import axios from "axios";
function Food() {
  let {
    products,
    users,
    signinValue,
    isSignedIn,
    fetchUsers,
    setUsers,
    fetchingProducts,
    setProducts,
  } = useContext(context);
  let { type } = useParams();
  let findType = products.filter((item) => item.type === type);
  let findUser = users.find((user) => user.email === signinValue.email);

  let [foundUserState, setFoundUserState] = useState(findUser);
  console.log("🚀 ~ file: Food.jsx:17 ~ Food ~ foundUserState", foundUserState);
  let [foundMealState, setFoundMealState] = useState();
  console.log("🚀 ~ file: Food.jsx:19 ~ Food ~ foundMealState", foundMealState);
  // ============================== Plus =========================
  let handlePlus = () => {
    setFoundMealState({
      ...foundMealState,
      quan: foundMealState.quan + 1,
    });
  };
  // ============================== Minus =========================
  let handleMinus = () => {
    if (foundMealState.quan < 2) {
      return;
    } else {
      setFoundMealState({
        ...foundMealState,
        quan: foundMealState.quan - 1,
      });
    }
  };
  // =========================== Add to cart =====================

  let handleAddToCart = async () => {
    if (foundUserState.cart.some((item) => item?._id === foundMealState?._id)) {
      let sameFood = foundUserState.cart.map((itemMapped) =>
        itemMapped?._id === foundMealState?._id
          ? {
              ...itemMapped,
              quan: itemMapped?.quan + foundMealState?.quan,
            }
          : itemMapped
      );
      setFoundUserState({
        ...foundUserState,
        cart: sameFood,
        cartArchive: sameFood,
      });
      await axios.put(
        `/updateUser/${foundUserState?._id}`,
        { ...foundUserState, cart: sameFood, cartArchive: sameFood }
      );
      alert("The quantity changed");
      fetchUsers().then((result) => setUsers(result));
      return;
    }

    setFoundUserState({
      ...foundUserState,
      cart: [...foundUserState.cart, foundMealState],
      cartArchive: [...foundUserState.cartArchive, foundMealState],
    });
    await axios.put(`/updateUser/${foundUserState?._id}`, {
      ...foundUserState,
      cart: [...foundUserState.cart, foundMealState],
      cartArchive: [...foundUserState.cartArchive, foundMealState],
    });

    await axios.put(
      `/updateProduct/${foundMealState?._id}`,
      { rate: foundMealState.rate + 1 }
    );
    fetchingProducts().then((result) => setProducts(result));

    fetchUsers().then((result) => setUsers(result));

    alert("The meal is sucessfully added to your cart");
  };
  useEffect(() => {
    setFoundUserState(findUser);
  }, [users]);

  //! ================================== this is important in case for index usage ========================
  // <div onClick={()=>setIsFlip(i)} style={isFlip === i ? {transform: "rotateY(-180deg)"} : {transform: "rotateY(0deg)"} } className="food_box">
  return (
    <div className="food_">
      <Header />
      <div className="food_container">
        {findType.map((item, i) => (
          <div
            onMouseEnter={() => setFoundMealState(item)}
            className={"food_box"}
          >
            {/* ================== Front =============== */}
            <div className={"front_"}>
              <a className="foodImg">
                <img src={`${item.image}`} alt="" />
              </a>
              <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
              <div className="textBox_">
                <div className="text_bottom">
                  <h4>Total Chosen:{item.rate}</h4>
                  <h3>{item.price}€</h3>
                </div>
              </div>
            </div>
            {/* ================ back ============ */}
            <div className="back_">
              <div className="back_container">
                {/* =========== */}

                {/* ============== */}
                <div className="inner_back_container">
                  <a>
                    <img src={cart_logo} alt="" />
                  </a>
                  <h2>Ingredients</h2>
                  <ul>
                    {item.ing.split(",").map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                  {isSignedIn && (
                     <div className="increment">
                     <button onClick={handleMinus}>-</button>
                     <h6>{foundMealState?.quan}</h6>
                     <button onClick={handlePlus}>+</button>
                   </div>
                 )}
                  <h5>Total {foundMealState?.quan * foundMealState?.price}€</h5>
                  <button
                    disabled={isSignedIn === false}
                    onClick={handleAddToCart}
                  >
                    {isSignedIn ? "Add to cart" : "Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;
