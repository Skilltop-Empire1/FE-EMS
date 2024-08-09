import ems from "../images/EmsLogo.jpg";
import React, { useState } from 'react';
import Login from './Login';


function VisibilityToggle() {
  // Initialize state variable isVisible with false
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  

  return (
    <header className="Headers">
  
        <nav>
          <ul>
            <img src={ems} alt="EMS logo" />
              <li className="naf"><a href="#">HOME</a></li>
              <li className="nad"><a href="#">ABOUT</a></li>
              <li className="faq"><a href="#">UPDATES</a></li>
              <li className="navs"><a href="#">FAQs</a></li>
              <li className="faq"><a href="#">CONTACT</a></li>
              <div className="class"><button onClick={toggleVisibility}>{isVisible ? 'LOG OUT' : 'LOGIN'}</button></div>
          </ul>
        </nav>
            {isVisible && <div className="log"><Login/></div>}

    </header>
  );
};

export default VisibilityToggle;