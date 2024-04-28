import NavBar from "../components/NavBar";
import TribunalDiv from "../components/TribunalDiv";
import {
  getUserData,
} from "../services/spotify";
import { useEffect, useState } from "react";
//console.log(getRecommendationsFromPlaylist("2WA9b5x8Bey6iS2YpM5CGO"));
//console.log(getAveragePopularityOfAPlaylist("3EN7uVwP2mXfz4m5oU6fMH"));
function Tribunal() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData().then(setUser);
  }, []);

  return (
    <>
      <TribunalDiv />
      <NavBar />
    </>
  );
}

export default Tribunal;
