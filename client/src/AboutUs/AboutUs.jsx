import React from 'react';
import './AboutUs.scss';
import img from "../AboutUs/team-photo/Pics1.jpeg"
import img2 from "../AboutUs/team-photo/Pics2.jpeg"
import Header from '../Header/Header';


function AboutUs() {
  const [showTeam, setShowTeam] = React.useState(false);

  const handleTeamButtonClick = () => {
    setShowTeam(!showTeam);
  }

  return (
    <div className="about-us">
      <Header/>
      <h1>About Us</h1>
      <p>We are a team of creative professionals who are passionate about designing and building beautiful and functional websites and applications.</p>
      <div className="team-photo-container">
        <span>
          <a href=""><img src={img} alt="Our team" /></a>
          <h3>Anwar</h3>
        </span>

        <span><a href=""><img src={img2} alt="Our team" /></a>
          <h3>Baha</h3>
          </span>
      </div>
      <button onClick={()=>setShowTeam(true)}>
          Meat Team
        </button>
      {showTeam && (
         <div className="teamPopup">
         <h6 onClick={()=>setShowTeam(false)}>x</h6>
       <span>
       <h3>Anwar Takriti</h3>
             <p>Started learning Web Dev since dec.2021. My lovely friend is the Computer.</p>
       </span>
   <span>
   <h3>Baha Alden Hasim</h3>
             <p>Hey!! I am a Web Developer Student man_technologist. I spend my whole day, studying memo, practically every day, experimenting with HTML, CSS, JavaScript and React.</p>
   </span>

       </div>
      )}

       
    </div>
  );
}

export default AboutUs;
