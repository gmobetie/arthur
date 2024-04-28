import React from "react";
import { Link } from "react-router-dom";
import "../assets/LoginDiv.css";
import { useEffect, useState } from "react";
import {
  getUserData,
  isLogged,
  loginSpotify,
  logoutSpotify,
} from "../services/spotify";

function LoginDiv() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData().then(setUser);
  }, []);

  return (
    <>
      <div className="LoginDiv">
        <div className="SpotifyDiv"></div>
        <p className="WelcomeDiv">Let Arthur judge your music !</p>
        {isLogged() ? (
          <>
            <p className="NoPremiumDiv">
              You are logged as {user?.display_name}.
            </p>
            <button className="LoginButton" onClick={logoutSpotify}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="NoPremiumDiv">No need of a premium account</p>
            <button className="LoginButton" onClick={loginSpotify}>
              Login
            </button>
          </>
        )}
      </div>

      {isLogged() ? (
        <div className="LoginDiv2">
          <Link to={"/tribunal"}>
            <div className="ArthurLogoDiv"></div>
          </Link>
          <p className="TextLoginDiv">Click on Arthur's head to be judged !</p>
        </div>
      ) : (
        <div className="LoginDiv2">
          <div className="ArthurLogoDiv"></div>
          <p className="TextLoginDiv">
            Ready to be judged ? Login to Spotify !
          </p>
        </div>
      )}
    </>
  );
}

export default LoginDiv;
