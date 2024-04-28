import React from "react";
import { Link } from "react-router-dom";
import "../assets/NavBar.css";
import Login from "../assets/svg/Login.svg";
import Marteau from "../assets/svg/Marteau.svg";
import Profil from "../assets/svg/Profil.svg";

function NavBar() {
  const activeTab = 1; //active tab number (1, 2, or 3)

  return (
    <>
      <nav className="NavBar">
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="/">
            <img
              src={Login}
              alt="Login"
              style={{ width: "35px", height: "35px", filter: "invert(100%)" }}
            />
            Login
          </Link>
        </div>
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="/tribunal">
            <img
              src={Marteau}
              alt="Trial"
              style={{ width: "35px", height: "35px", filter: "invert(100%)" }}
            />
            Trial
          </Link>
        </div>
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="/profil">
            <img
              src={Profil}
              alt="Profil"
              style={{ width: "35px", height: "35px", filter: "invert(100%)" }}
            />
            Profil
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
