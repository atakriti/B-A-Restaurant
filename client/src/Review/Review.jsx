import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Context';
import ReactStars from "react-rating-stars-component";

import "./review.scss"
import axios from 'axios';
function Review() {
    let { users, isSignedIn ,signinValue,fetchUsers,setUsers,showReview,setShowReview} = useContext(context)

    let findUser = users.find((user) => user.email === signinValue.email);

    let [foundUserState, setFoundUserState] = useState(findUser);
    let [rateValue,setRateValue] = useState(null)
    console.log("🚀 ~ file: Review.jsx:14 ~ Review ~ rateValue", rateValue)
    let [reviewValue, setReviewValue] = useState({
        comment: "",
        rate:rateValue
    })
    console.log("🚀 ~ file: Review.jsx:19 ~ Review ~ reviewValue", reviewValue)
    let handleSubmit =async (e) => {
        e.preventDefault()
        // setFoundUserState({...foundUserState,comment:})
        await axios.put(`/pushCommentAndRate/${foundUserState._id}`, reviewValue)
        alert("Thank you for your Submit")
        setShowReview(false)
    fetchUsers().then((result) => setUsers(result));
    setFoundUserState(findUser);
    }

    useEffect(() => {
        setFoundUserState(findUser);
    }, [users]);
    useEffect(() => {
        setReviewValue({...reviewValue,rate:rateValue})
    },[rateValue])
  return (
    <div className="reviewSubmit">
      <form onSubmit={handleSubmit}>
        <h1>Submit your review</h1>
        <input
          type="text"
          onChange={(e) => setReviewValue({...reviewValue,comment:e.target.value})}
          value={reviewValue?.comment}
          placeholder="Write your comment here..."
        />
        <ReactStars
          count={5}
          onChange={setRateValue}
          size={30}
          activeColor="#ffd700"
          classNames={"stars"}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Review