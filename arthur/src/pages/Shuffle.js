import NavBar from "../components/NavBar";
import TribunalDiv from "../components/TribunalDiv";
import { getUserData, getUserPlaylists } from "../services/spotify";
import { useEffect, useState } from "react";

function Shuffle() {
  return (
    <>
      <NavBar />
    </>
  );
}

export default Shuffle;
