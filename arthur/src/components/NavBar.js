import React from "react";
import { Link } from "react-router-dom";
import "../assets/NavBar.css";
import Login from "../assets/svg/Login.svg";
import Marteau from "../assets/svg/Marteau.svg";
import Profil from "../assets/svg/Profil.svg";

function NavBar() {

  return (
    <>
      <nav className="NavBar">
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="arthur/">
            <img
              src={Login}
              alt="Login"
              style={{ width: "35px", height: "35px", filter: "invert(100%)" }}
            />
            Login
          </Link>
        </div>
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="arthur/tribunal">
            <img
              src={Marteau}
              alt="Trial"
              style={{ width: "35px", height: "35px", filter: "invert(100%)" }}
            />
            Trial
          </Link>
        </div>
        <div className="ButtonContainer">
          <Link className="NavBarButton" to="arthur/profil">
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
