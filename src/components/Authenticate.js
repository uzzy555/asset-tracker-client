import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Authenticate.css";
import ReactModal from "react-modal";
const Authenticate = (props) => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <QrModal
        data={data}
        modalIsOpen={showModal}
        closeModal={handleModalClose}
      />
      <div className="cam">
        <br />
        <h2 style={{ position: "absolute", top: 20 }}>
          Hold QR Code Steady and Clear to Scan
        </h2>
        <div id="scanner">
          <QrReader
            delay={500}
            {...props}
            onError={() => console.log("Error")}
            onResult={(result) => {
              if (result) {
                setData(result);
                console.log("data");
                // console.log(result);
              }
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
          }}
        ></div>
        <div style={{ position: "absolute", bottom: 90 }}>
          <h3>
            Please wait for 15 sec if Authentication messages is not appearing
            on the screen then your product is not Authenticated.
          </h3>
          <br />
          <span>Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
const QrModal = ({ modalIsOpen, closeModal, data }) => {
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
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="QrCode Modal"
      ariaHideApp={false}
    >
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <img
          src={`http://localhost:8000/assets/products/${data.image}`}
          alt={data.name}
          height={100}
          width={100}
        />
        <div>
          <h3>{data.name}</h3>
          <h3>{data.description}</h3>
          <h3>{data.cost}</h3>
        </div>
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
    </ReactModal>
  );
};
