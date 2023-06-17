import { Avatar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../redux/wallet/wallet.actions";
import MenuListComposition from "./navbarMenuList";

const UserWalletConnection = () => {
  const dispatch = useDispatch();

  const { isUserLoggedIn } = useSelector((state) => state.Auth);

  const handleConnection = () => {
    dispatch(connectWallet());
  };

  return (
    <>
      {isUserLoggedIn && <UserConnectedStatus />}

      {!isUserLoggedIn && (
        <button className="header-button" onClick={handleConnection}>
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default UserWalletConnection;

const UserConnectedStatus = () => {
  const { organization_name, name } = useSelector(
    (state) => state.Auth.UserLoggedInData.userInfo
  );
  return (
    <MenuListComposition>
      <div className="buttonsContainer">
        <Typography
          style={{ paddingRight: "5px", fontStyle: "italic" }}
          variant="h4"
        >
          {name ? name : organization_name}
        </Typography>
        {/* <div className="avatarContainer">
          <Avatar src={profileImageURL + img} />
        </div> */}
      </div>
    </MenuListComposition>
  );
};
