import React, { useEffect } from "react";
import "../css/home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useSelector((state) => state.Auth);
  useEffect(() => {
    isUserLoggedIn && navigate("/vendor");
  }, [isUserLoggedIn, navigate]);
  return (
    <div className="container">
      <div id="login-type-container">
        <br />
        <div id="login-type">
          <h1 id="greetings">Welcome to Asset Tracker!</h1>
          <h1 id="subtitle-txt">
            A Blockchain Based Fake Product Detection 🕵️‍♀️
          </h1>
          <div id="options-container">
            <NavLink to="/manufacturerform" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/manufacturer.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">
                  Register as Manufacturer
                </h1>
              </div>
            </NavLink>
            {/* <NavLink to="/distributorform" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/distributor.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">
                  Register as Distributor
                </h1>
              </div>
            </NavLink> */}
            <NavLink to="/authenticate" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/qr-code-scan.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">Authenticate Product</h1>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
