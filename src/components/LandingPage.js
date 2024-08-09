import React from 'react';
import Header from './Header';
import main from '../images/EMSmans.png';
import instagram from '../images/Instagram.png';
import facebook from '../images/Facebook.png';
import twitter from '../images/Twitter.png';


const LandingPage = () => {
  return (

    <div className="landing-page">
      <Header/>

      <div className="contents">
        <div className="content">
          <div className="text">
            <h1>GOOD HEALTH</h1>
            <h1>IS</h1>
            <h1>THE BEST</h1>
            <h1>WEALTH</h1>
            <p>~~ happiness starts with good health</p>
          </div>
          <div className="containers">
            <h2>Open 24 Hrs</h2>
            <h5>Revolutionize healthcare with our Electronic</h5>
            <h5>Medical System-where efficiency meets exceptional</h5>
            <h5>patient care. We are always available for you"</h5>
          </div>
          <button type="forgot"><a href="a">Book an Appointment</a></button>
          <button type="forget"><a href="a">More Info</a></button>

          <div className="socials">
            <img src={instagram} alt="facebook" /><h5><a href="a">Instagram</a></h5>
            <img src={facebook} alt="facebook" /><h5><a href="a">Facebook</a></h5>
            <img src={twitter} alt="twitter" /><h5><a href="a">Twitter</a></h5>
          </div>
        </div>

        <div className="contentt">
          <img src={main} alt="EMS logo" />
        </div>
      </div>
    
    </div>
  );
};

export default LandingPage;