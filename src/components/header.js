import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import { logout } from "../redux/auth/auth.slicer";
import { connectWallet } from "../redux/wallet/wallet.actions";
import Logo from "./logo";
import UserWalletConnection from "./walletConnection";
const Header = () => {
  return (
    <div className="root">
      <Link to="/">
        <Logo height={100} width={100} />
      </Link>
      <Box>
        <UserWalletConnection />
      </Box>
    </div>
  );
};

export default Header;
