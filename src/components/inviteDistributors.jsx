import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inviteDistributors } from "../redux/distributors/distributors.actions";
import MainBar from "./MainBar";
import TransactionModal from "./transactionModal";

const InviteDistributors = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(
    (state) => state.Auth.UserLoggedInData.userInfo
  );
  const [txInfo, setTxInfo] = useState({
    txStatus: null,
    txMessage: null,
    txHash: null,
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      const payload = {
        organizationEmail: email,
        distributorEmail: values.email,
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone,
      };
      dispatch(inviteDistributors({ setTxInfo, ...payload }));
    },
  });
  const handleModalClose = () =>
    setTxInfo({
      txStatus: null,
      txMessage: null,
      txHash: null,
    });
  return (
    <MainBar pageTitle={"Add and Invite Distributors"}>
      <TransactionModal txInfo={txInfo} onClose={handleModalClose} />
      <form onSubmit={formik.handleSubmit}>
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

        <label className="lable">Email</label>
        <input
          type="text"
          placeholder="Distributor Email"
          name="email"
          required
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && (
          <small style={{ color: "red" }}>{formik.errors.email}</small>
        )}
        <label className="lable">Address</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && (
          <small style={{ color: "red" }}>{formik.errors.address}</small>
        )}
        <label className="lable">Phone Number</label>
        <input
          type="text"
          placeholder="Name"
          name="phone"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && (
          <small style={{ color: "red" }}>{formik.errors.phone}</small>
        )}
        <button className="button" type="submit">
          Add Distributor
        </button>
      </form>
    </MainBar>
  );
};

export default InviteDistributors;
