import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./baner.scss"
import test from "../images/test.jpg"
import a from "./images/a.jpg";
import b from "./images/b.jpg";
import c from "./images/c.jpg";
import d from "./images/d.jpg";
import e from "./images/e.jpg";

function Baner() {
  return (
  <div className="slider-main">
<div className="slider">
<Carousel fade>
      <Carousel.Item interval={600}>
        
          <img className='d-block w-100'

            src={test}

            alt="First slide"
          />
       

        <Carousel.Caption>
          <h3>
              WELCOME TO B & A 
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={600}>
        
          <img className='d-block w-100'

            src={a}

            alt="Second slide"
          />
        <Carousel.Caption>
        <h3>
              EVERYTHING YOU NEED
          </h3>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item interval={600}>
        
          <img className='d-block w-100'

            src={b}

            alt="Third slide"
          />
        <Carousel.Caption>
        <h3>
              ONSITE AND DELIVERY
          </h3>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item interval={600}>
        
          <img className='d-block w-100'

            src={e}

            alt="Fourth slide"
          />
        <Carousel.Caption>
        <h3>
              SHARE YOUR SPEICAL MEAL 
          </h3>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item interval={600}>
        
          <img className='d-block w-100'

            src={d}

            alt="Fifth slide"
          />
        <Carousel.Caption>
        <h3>
             YOUR FEEDBACK IS IMPORTANT
          </h3>
        </Carousel.Caption>
      </Carousel.Item >
    </Carousel>
</div>

  </div>
  );
}

export default Baner;