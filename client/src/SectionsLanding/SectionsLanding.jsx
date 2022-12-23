import React from "react";
import "./sectionsLanding.scss";
import chef from "../images/chef.png";
import calender from "../images/calender.jpg";
import { Link } from "react-router-dom";
import androidPic from "../images/android.jpg"
function SectionsLanding() {
  return (
    <div className="sectionsLanding">
      <div className="fixedImg"></div>
      <div className="sections">
        {/* ================ */}
        <div className="freelance">
          <a className="anchorImg">
            <img src={chef} alt="" />
          </a>
          <div className="text_">
            <p>
              Are you a good chef, you want to have a extra job, sooooooo......{" "}
              <br />
              you can easly publish your meal in the freelance section and this
              is free for you. <br />
            </p>
              <Link to="freelance">Go the Freelance Page</Link>
          </div>
        </div>
        {/* ================== Book =============== */}
        <div className="book_">
          <div className="text_">
            <p>
              You come to us and sometimes you don't find an empty table, we
              have a solution for you... <br />
              in book section you can easly select the date,time and how many presons
              then you will get a confirmation E-Mail. <br />
            </p>
              <Link to="book">Go to Reservation Page</Link>
          </div>
          <a className="anchorImg">
            <img src={calender} alt="" />
          </a>
        </div>
      </div>
      {/* ===================================== Second Section ========================= */}
      <div className="fixedImg2"></div>
      <div className="sections2">
        <div className="android">
          <a className="androidImg"><img src={androidPic} alt="" /></a>
          <div className="androidText">
          <p>Surprise.... you can download this website as an App on your android smartphone, and discover our restaurant offline</p>
          <a href="">Download App</a>
          </div>
        </div>   
      </div>
    </div>
  );
}

export default SectionsLanding;
