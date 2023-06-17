import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../css/distributorform.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { DistributorSignUp } from "../redux/auth/auth.actions";
import { FakeProductClient } from "../http/config";
import TransactionModal from "./transactionModal";

const DistributorForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      organization_code: "",
      wallet_address: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      dispatch(DistributorSignUp(values));
      navigate("/");
    },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "between" }}>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          className="menu-icon"
          style={{ cursor: "pointer", marginTop: 20 }}
          onClick={() => navigate(-1)}
        />
        <br />
      </div>

      <div>
        <form className="form" onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Register Here</h2>
          <br />
          <label className="lable">Name</label>

          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && (
            <small style={{ color: "red" }}>{formik.errors.name}</small>
          )}
          <br />
          <label className="lable">Wallet Address</label>
          <input
            type="text"
            placeholder="Wallet Address"
            name="wallet_address"
            className="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
          <label className="lable">Organization Code</label>
          <input
            type="text"
            placeholder="Code"
            name="organization_code"
            className="input"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.organization_code && (
            <small style={{ color: "red" }}>
              {formik.errors.organization_code}
            </small>
          )}
          <br />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DistributorForm;

const validate = object().shape({
  name: string().required(),
  organization_code: string()
    .required()
    .test("organization_code", "Organization does not exist", async (val) => {
      return new Promise((resolve, reject) => {
        FakeProductClient.post(
          "api/v1/auth/checkOriganizationCode",
          {
            code: val,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        ).then((res) => {
          resolve(res.status === 209);
        });
      });
    }),
  email: string()
    .email()
    .required()
    .test("email", "Email is already registered", async (val) => {
      return new Promise((resolve, reject) => {
        FakeProductClient.post("api/v1/auth/checkEmailDistributor", {
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
          FakeProductClient.post("api/v1/auth/checkwalletAddressDistributor", {
            wallet_address: val,
          }).then((res) => {
            resolve(res.status === 200);
          });
        });
      }
    ),
});
