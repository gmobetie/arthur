import NavBar from "../components/NavBar";
import TribunalDiv from "../components/TribunalDiv";
import {
  getUserData,
} from "../services/spotify";
import { useEffect, useState } from "react";

function Tribunal() {

  return (
    <>
      <TribunalDiv />
      <NavBar />
    </>
  );
}

export default Tribunal;
