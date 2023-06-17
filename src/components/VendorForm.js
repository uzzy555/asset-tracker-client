import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import "../css/addProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import MainBar from "./MainBar";
import ImageUpload from "./imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getAllDistributors } from "../redux/distributors/distributors.actions";
import { useFormik } from "formik";
import { addProduct } from "../redux/product/product.actions";
import { mixed, object, string } from "yup";
import TransactionModal from "./transactionModal";

const FormStyles = styled.div`
  form {
    margin: 10px;
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    aside {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;
    }
    section {
      flex: 1 1 auto;
      display: flex;
      flex-flow: column nowrap;
    }
    button {
      margin: 5px;
      padding: 5px;
      width: 100px;
      align-self: flex-end;
    }
  }
`;

const ReactForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [txInfo, setTxInfo] = useState({
    txStatus: null,
    txMessage: null,
    txHash: null,
  });
  const { allDistributors, isProductAdded } = useSelector(
    (state) => state.Distributors
  );

  const {
    userInfo: { wallet_address, org_code, organization_name },
  } = useSelector((state) => state.Auth.UserLoggedInData);

  const formik = useFormik({
    initialValues: {
      file: "",
      product_name: "",
      product_description: "",
      d_wallet_address: "",
      cost: "",
      quantity: "",
    },
    validationSchema: object().shape({
      file: mixed("")
        .test(
          "image",
          "Please select a valid image or video.",
          (file) =>
            file &&
            /\.(jpg|jpeg|png|gif|tiff|tif|heif|heic|svg|svgz|ai|mp4|ogg|webm|mov)$/.test(
              file.name.toLowerCase()
            )
        )
        .required("Image is required"),
      product_name: string().required("Name is required"),
      product_description: string().required("Description is required"),
      d_wallet_address: string().required("Select a distributor"),
      cost: string().required(),
      quantity: string().required(),
    }),
    onSubmit: async (values) => {
      const payload = {
        file: values.file,
        name: values.product_name,
        description: values.product_description,
        m_wallet_address: wallet_address,
        d_wallet_address: values.d_wallet_address,
        cost: values.cost,
        quantity: values.quantity,
        manufacturer: organization_name,
      };

      dispatch(addProduct({ setTxInfo, ...payload }));
    },
  });
  const handleModalClose = () =>
    setTxInfo({
      txStatus: null,
      txMessage: null,
      txHash: null,
    });
  useEffect(() => {
    dispatch(getAllDistributors(org_code));
  }, [dispatch, formik.values, isProductAdded, org_code]);
  return (
    <>
      <TransactionModal txInfo={txInfo} onClose={handleModalClose} />
      <FormStyles style={{ marginTop: "40px" }}>
        <form className="add-form" onSubmit={formik.handleSubmit}>
          <h2 className="form-title">Add Product</h2>
          <br />
          <aside>
            <section>
              <ImageUpload
                value={formik.values.file}
                formik={formik}
                helperText={
                  (formik.touched.file && formik.errors.file) || `&nbsp;`
                }
                error={formik.touched.file && Boolean(formik.errors.file)}
              />
            </section>
            <section>
              <label className="lable">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="product_name"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.product_name && (
                <small style={{ color: "red" }}>
                  {formik.errors.product_name}
                </small>
              )}
              <br />
              <label className="lable">Description</label>
              <textarea
                type="text"
                placeholder="Product description"
                name="product_description"
                rows="5"
                className="input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.product_description && (
                <small style={{ color: "red" }}>
                  {formik.errors.product_description}
                </small>
              )}
              <br />
              <label className="lable">Cost</label>
              <input
                type="text"
                placeholder="Cost"
                name="cost"
                className="input"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cost && (
                <small style={{ color: "red" }}>{formik.errors.cost}</small>
              )}
              <br />
              <label className="lable">Quantity</label>
              <input
                type="text"
                placeholder="Quantity"
                name="quantity"
                className="input"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity && (
                <small style={{ color: "red" }}>{formik.errors.quantity}</small>
              )}

              <br />

              <label className="lable">Distributors:</label>
              <select
                className="VendorInfo"
                name="d_wallet_address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                {allDistributors.map(({ name, id }, i) => (
                  <option key={i} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {formik.touched.d_wallet_address && (
                <small style={{ color: "red" }}>
                  {formik.errors.d_wallet_address}
                </small>
              )}
              <button className="button" type="submit">
                Add
              </button>
            </section>
          </aside>
        </form>
      </FormStyles>
    </>
  );
};

const Main = styled.main`
  border-radius: 5px;
  padding: 10px;
  background: white;
  h2 {
    text-align: center;
  }
`;
const Invoice = (props) => {
  const [amountDue, setAmountDue] = React.useState(0);

  return (
    <MainBar>
      <ReactForm
        amountDue={amountDue}
        setAmountDue={setAmountDue}
        account={props.account}
        contract={props.contract}
        distributors={props.distributors}
      />
    </MainBar>
  );
};

const App = (props) => {
  const [distributors, setDistributors] = useState([]);
  const getDistributors = async () => {
    let dis = await props.contract.getAlldistributors();
    console.log("distributors Id: ", dis);
    setDistributors(dis);
  };
  useEffect(() => {
    getDistributors();
  }, []);
  return (
    <div>
      <Invoice
        account={props.account}
        contract={props.contract}
        distributors={distributors}
      />
    </div>
  );
};
export default App;
