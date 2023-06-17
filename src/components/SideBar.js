import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/sidebar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MenuItem = ({ iconName, title, isActive, url }) => {
  let menuClass = "menu-item";
  if (isActive) {
    menuClass += " active-menu";
  }
  return (
    <div className={menuClass}>
      <NavLink className="menu-link" to={url}>
        <FontAwesomeIcon icon={iconName} className="menu-icon" />

        <h1 className="menu-title">{title}</h1>
      </NavLink>
    </div>
  );
};

const SideBar = ({ activeLink }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.Auth.UserLoggedInData.userInfo);
  return (
    <React.Fragment>
      <div id="sidebar-container">
        <div className="two-div-flex">
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            className="menu-icon"
            style={{ cursor: "pointer", marginTop: 20 }}
            onClick={() => navigate(-1)}
          />
        </div>

        <div id="menu-item-container">
          <MenuItem
            iconName={"fa-solid fa-truck"}
            title="All Products."
            isActive={activeLink === "products"}
            url="/vendor/products"
          />
          {role === "manufacturer" && (
            <>
              {" "}
              <MenuItem
                iconName={"fa-solid fa-shirt"}
                title="Add Product."
                isActive={activeLink === "addproduct"}
                url="/vendor/addproduct"
              />
              <MenuItem
                iconName={"fa-solid fa-user"}
                title="Distributors."
                isActive={activeLink === "available-distributors"}
                url="/vendor/available-distributors"
              />
              <MenuItem
                iconName={"fa-solid fa-user"}
                title="Invite Distributor"
                isActive={activeLink === "invite-distributors"}
                url="/vendor/invite-distributors"
              />
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
