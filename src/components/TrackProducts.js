import React, { useEffect, useState } from "react";
import Title from "./Title";
import Modal from "react-modal";
import LaunchIcon from "@material-ui/icons/Launch";
import QRCode from "qrcode.react";
import MainBar from "./MainBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsForDistributors,
  getAllProductsForManufacturer,
  getSingleProduct,
} from "../redux/product/product.actions";
import styled, { createGlobalStyle } from "styled-components";
import { CircularProgress, IconButton } from "@material-ui/core";
function TrackProducts({ contract, account }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wallet_address, role } = useSelector(
    (state) => state.Auth.UserLoggedInData.userInfo
  );
  const { allProducts, singleProduct } = useSelector((state) => state.Product);
  const [qrcode, setQrcode] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleShowModal = (id) => {
    dispatch(getSingleProduct(id));
    setQrcode();
    setShowModal(true);
  };
  useEffect(() => {
    if (role === "manufacturer") {
      dispatch(getAllProductsForManufacturer(wallet_address));
    } else {
      dispatch(getAllProductsForDistributors(wallet_address));
    }
  }, [dispatch, role, wallet_address]);
  return (
    <MainBar pageTitle="All Products">
      <QrModal
        qrcode={qrcode}
        modalIsOpen={showModal}
        closeModal={handleModalClose}
      />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Address From</th>
            <th>Address To</th>
            <th>Intialized</th>
            <th>View QR</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((item) => {
            const date = new Date(item.createdAt);
            console.log(date);
            return (
              <tr>
                <td>{item.p_id}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.product_name}
                    height={50}
                    width={50}
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{item.product_description}</td>
                <td>{item.cost}</td>
                <td>{item.quantity}</td>
                <td>{item.manufacturer_wallet_address}</td>
                <td>{item.distributor_wallet_address}</td>

                <td>{date.toLocaleDateString()}</td>
                <td>
                  <IconButton onClick={() => handleShowModal(item.p_id)}>
                    <LaunchIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainBar>
  );
}

export default TrackProducts;
const PaymentQRCode = styled(QRCode)`
  padding: 5px;
  align-self: flex-end;
`;
const QrModal = ({ modalIsOpen, closeModal, qrcode }) => {
  const { isSingleProductLoading, singleProduct } = useSelector(
    (state) => state.Product
  );
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "580px",
      borderRadius: "20px",
      backgroundClip: "text",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="QrCode Modal"
      ariaHideApp={false}
    >
      <div style={{ textAlign: "center", marginTop: 10 }}>
        {isSingleProductLoading ? (
          <CircularProgress />
        ) : (
          <PaymentQRCode
            size={500}
            value={`https://mumbai.polygonscan.com/tx/${singleProduct.transaction_hash}`}
          />
        )}
      </div>

      <span
        onClick={closeModal}
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
  );
};
