import NavBar from "../components/NavBar";
import ProfilDiv from "../components/ProfilDiv";
import { getTop5TracksWithHighestPopularity, getUserData, getUserPlaylists } from "../services/spotify";
import { useEffect, useState } from "react";

console.log(getTop5TracksWithHighestPopularity())

function Profil() {
  return (
    <>
      <ProfilDiv />
      <NavBar />
    </>
  );
}

export default Profil;
