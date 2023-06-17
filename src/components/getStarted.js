import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import MainBar from "./MainBar";
import "../css/products.css";
import { useSelector } from "react-redux";
import WalletConnect from "./connectWallet";

const Greetings = () => {
  const {
    UserLoggedInData: {
      userInfo: {
        name,
        organization_name,
        wallet_address,
        email,
        org_code,
        role,
      },
    },
  } = useSelector((state) => state.Auth);
  return (
    // <div id="get-started">
    <MainBar pageTitle={`Welcome to Asset Tracker dashboard`}>
      {/* <h1 className="mfr-greetings"></h1> */}
      <h1 className="secondary-txt">
        Navigate to profile to view all your registered details
      </h1>
      <h1 className="secondary-txt">
        Navigate to Track Products to track status of all of your products added
        to our system
      </h1>
      <h1 className="secondary-txt">
        Navigate to Add Products to publish a new product to our system
      </h1>

      {organization_name && <h1>Name:{organization_name}</h1>}
      {name && <h1>Name:{name}</h1>}
      <h1>Wallet Address:{wallet_address}</h1>
      <h1>Email:{email}</h1>
      {org_code && <h1>Code:{org_code}</h1>}
    </MainBar>
    // </div>
  );
};

const GetStarted = () => {
  const { pathname } = useLocation();

  const arrURL = pathname.split("/");
  let currentPageURL = arrURL[2];
  let isLinkPage;
  if (arrURL.length >= 3) {
    isLinkPage = arrURL[2] === "";
  } else {
    isLinkPage = true;
  }

  return (
    <div className="main-container">
      <SideBar activeLink={currentPageURL} />
      {isLinkPage && <Greetings />}
      <Outlet />
    </div>
  );
};

export default GetStarted;
