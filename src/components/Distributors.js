import React, { useEffect, useState } from "react";
import "../css/distributors.css";
import Title from "./Title";
import MainBar from "./MainBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getAllDistributors } from "../redux/distributors/distributors.actions";
import { Box, CircularProgress } from "@material-ui/core";

function Distributors({ contract, account }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    UserLoggedInData: {
      userInfo: { org_code },
    },
  } = useSelector((state) => state.Auth);
  const { allDistributors, areDistributorsLoading } = useSelector(
    (state) => state.Distributors
  );
  useEffect(() => {
    dispatch(getAllDistributors(org_code));
  }, [dispatch, org_code]);
  return (
    <MainBar pageTitle={`Welcome to Asset Tracker dashboard`}>
      {areDistributorsLoading ? (
        <Box className="box">
          <CircularProgress />
        </Box>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allDistributors.map((item, i) => {
              return (
                <tr>
                  <td>{i}</td>
                  <td>{item.name}</td>
                  <td>{item.add}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </MainBar>
  );
}

export default Distributors;
