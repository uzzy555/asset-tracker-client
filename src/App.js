import "./App.css";

import React from "react";

import VendorForm from "./components/VendorForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Products from "./components/TrackProducts";
import Distributors from "./components/Distributors";

// import SideBar from "./components/SideBar";

import Authenticate from "./components/Authenticate";
import GetStarted from "./components/getStarted";
import WalletConnect from "./components/connectWallet";
import ReduxProvider from "./redux/store";
import Web3Intializer from "./components/web3Intializer";
import ManufacturerSignUp from "./components/manufacturer";
import Header from "./components/header";
import ProtectedRoute from "./components/ProtectedRoute";
import InviteDistributors from "./components/inviteDistributors";
import Profile from "./components/profile";

library.add(fas);

const App = () => {
  return (
    <ReduxProvider>
      <Web3Intializer>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/connect-wallet/:userType"
              element={<WalletConnect />}
            />
            <Route path="/" element={<Home />} />
            {/* <Route
              path="/vendor"
              element={<SideBar contract={contract} account={currentAccount} />}
            ></Route> */}
            <Route path="/vendor" element={<GetStarted />}>
              <Route path="products" element={<Products />} />
              <Route path="addproduct" element={<VendorForm />} />
              <Route path="available-distributors" element={<Distributors />} />
              <Route
                path="invite-distributors"
                element={<InviteDistributors />}
              />
            </Route>
            <Route path="/userprofile/:walletAddress" element={<Profile />} />
            <Route
              path="/distributorform"
              element={<DistributorForm />}
            ></Route>
            <Route
              path="/manufacturerform"
              element={<ManufacturerSignUp />}
            ></Route>
            <Route path="" />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </BrowserRouter>
      </Web3Intializer>
    </ReduxProvider>
  );
};

export default App;
