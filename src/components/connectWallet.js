import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { connectWallet } from "../redux/wallet/wallet.actions";

const WalletConnect = ({ isManufacturer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType } = useParams();
  const handleNavigate = () => {
    if (userType === "manufacturer") {
      navigate("/manufacturerform");
    } else {
      navigate("/distributorform");
    }
  };
  const handleWalletConnect = () => {
    dispatch(connectWallet());
  };
  return (
    <div>
      <div>
        <div className="connectWalletContainer">
          <button onClick={handleNavigate} className="connectWalletBtn">
            Sign In
          </button>
          <h3>OR</h3>
          <button onClick={handleWalletConnect} className="connectWalletBtn">
            <img
              src={
                "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
              }
              className="img"
              alt="metamask"
            />{" "}
            Please Connect Your Wallet to Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
