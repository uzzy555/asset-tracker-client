import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../css/distributorform.css";
import Modal from "react-modal";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ManufactureSignUp } from "../redux/auth/auth.actions";
import { FakeProductClient } from "../http/config";

const ManufacturerSignUp = () => {
  const dispatch = useDispatch();

  const { web3Modal, Web3 } = useSelector((state) => state.Web3Instance);
  const customStyle = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "250px",
      borderRadius: "20px",
    },
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      organization_name: "",
      email: "",
      wallet_address: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      dispatch(ManufactureSignUp(values));
      navigate("/");
    },
  });
  const handleWalletConnect = async () => {
    const provider = await web3Modal.connect();
    const web3Instance = new Web3(provider);

    const accounts = await web3Instance.eth.getAccounts();
    const connectedWallet = accounts[0];

    formik.setFieldValue("wallet_address", connectedWallet);
  };
  return (
    <div>
      <Modal ariaHideApp={false} style={customStyle}>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <h2>Your have successfully Registerated.. 🚀</h2>
          <p>You will get a mail if vendor assigns you a dispatch order</p>
          <br />
          <a href="/">Proceed to the Home Page</a>
        </div>

        <span
          style={{
            position: "absolute",
            top: 3,
            right: 20,
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </span>
      </Modal>
      <div style={{ display: "flex", justifyContent: "between" }}>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          className="menu-icon"
          style={{ cursor: "pointer", marginTop: 20 }}
          onClick={() => navigate(-1)}
        />

        <br />
        <br />
      </div>

      <div>
        <form className="form" onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Register Here</h2>
          <br />
          <label className="lable">Organization Name</label>

          <input
            type="text"
            placeholder="Organization Name"
            name="organization_name"
            className="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.organization_name && (
            <small style={{ color: "red" }}>
              {formik.errors.organization_name}
            </small>
          )}
          <br />
          <label className="lable">Wallet Address</label>
          <div className="walletContainer">
            <input
              type="text"
              placeholder="Wallet Address"
              name="wallet_address"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-wallet"
              onClick={handleWalletConnect}
            />
          </div>
          {formik.touched.wallet_address && (
            <small style={{ color: "red" }}>
              {formik.errors.wallet_address}
            </small>
          )}
          <br />

          <label className="lable">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && (
            <small style={{ color: "red" }}>{formik.errors.email}</small>
          )}
          <br />

          <button className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ManufacturerSignUp;

const validate = object().shape({
  organization_name: string()
    .required()
    .min(5, "Must be at least 5 characters"),
  email: string()
    .email()
    .required()
    .test("email", "Email is already registered", async (val) => {
      return new Promise((resolve, reject) => {
        FakeProductClient.post("api/v1/auth/checkEmailManufacturer", {
          email: val,
        }).then((res) => {
          resolve(res.status === 200);
        });
      });
    }),
  wallet_address: string()
    .matches("0x[0-9a-fA-F]{40}", "Incorrect address")
    .required()
    .test(
      "wallet_address",
      "Wallet Address is already registered",
      async (val) => {
        return new Promise((resolve, reject) => {
          FakeProductClient.post("api/v1/auth/checkwalletAddressManufacturer", {
            wallet_address: val,
          }).then((res) => {
            resolve(res.status === 200);
          });
        });
      }
    ),
});
