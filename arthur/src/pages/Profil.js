import NavBar from "../components/NavBar";
import ProfilDiv from "../components/ProfilDiv";
import { getTop5TracksWithHighestPopularity} from "../services/spotify";

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
