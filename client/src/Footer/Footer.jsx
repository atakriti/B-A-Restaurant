import "./Footer.scss";
import React from 'react';
import { FaFacebook, FaTwitter, FaGooglePlus, FaYoutube, FaLinkedin } from 'react-icons/fa';



function Footer() {

  // let goUp = () => {
  //   window.scroll({
  //     top: 0,
  //     behavior:"smooth"
  //   })
  // }


  return (
    // <!--Waves Container-->
    <footer className="footer">
      <div className="footer-content">
        {/* <!--add all information --> */}
        <h3>B & A Developers TEAM </h3>
        <p>We are a team of creative professionals who are passionate about designing and building beautiful and functional websites and applications.</p>
        <ul className="socials">

          <li ><FaFacebook /></li>
          <li><FaTwitter /></li>
          <li><FaGooglePlus /></li>
          <li><FaYoutube /></li>
          <li><FaLinkedin /></li>
        </ul>
        <div className="footer-bottom">
          {/* <!-- add all information --> */}
          <p>copyright &copy;2022 <a>B & A Developers TEAM</a>  </p>
        </div>

        {/* bitton animation start  */}
        {/* <div class="frame">
          <button class="custom-btn btn-12"><span>Click!</span><span>Read More</span></button>
        </div> */}
       {/* button animation end  */}

      </div>
    </footer>
    // <!--Waves end-->
  );
};

export default Footer;
