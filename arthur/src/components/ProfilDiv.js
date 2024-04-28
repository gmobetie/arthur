import React, { useEffect, useState } from "react";
import "../assets/ProfilDiv.css";
import Profil from "../assets/svg/Profil.svg";
import {
  getUserData,
  getAveragePopularity,
  getTop5TracksWithHighestPopularity,
  getTop5TracksWithLowestPopularity,
} from "../services/spotify";

function ProfilDiv() {
  const [userId, setUserId] = useState("");
  const [mail, setMail] = useState("");
  const [popularity, setPopularity] = useState();
  const [leastPopularTracks, setLeastPopularTracks] = useState([]);
  const [mostPopularTracks, setMostPopularTracks] = useState([]);

  useEffect(() => {
    // Charger les données de l'utilisateur
    getUserData().then((user) => {
      const id = user.id;
      const mail = user.email;
      setUserId(id);
      setMail(mail);
    });

    // Charger le score d'originalité de l'utilisateur
    getAveragePopularity().then(setPopularity);

    // Charger les 5 chansons les moins populaires
    getTop5TracksWithLowestPopularity().then((tracks) => {
      setLeastPopularTracks(tracks);
    });

    // Charger les 5 chansons les plus populaires
    getTop5TracksWithHighestPopularity().then((tracks) => {
      setMostPopularTracks(tracks);
    });
  }, []);

  let popularityText;
  if (100 - popularity > 66) {
    popularityText =
      "Your playlists tend towards the mainstream! Exploring less-charted tracks could add some spice.";
  } else if (100 - popularity > 50) {
    popularityText =
      "Your playlists are wonderfully unique! Keep seeking out new sounds to maintain your avant-garde edge.";
  } else {
    popularityText =
      "Your playlists strike a balance between popular and niche tunes. Keep exploring for a diverse mix.";
  }

  return (
    <>
      <img
        src={Profil}
        alt="Profil"
        className="IconDiv"
        style={{ width: "60px", height: "60px", filter: "invert(100%)" }}
      />
      <div className="UserDiv">{mail}</div>
      <div className="ProfilDiv">Profil</div>
      <div className="ScoreDiv">
        <div className="ScoreText">Your originality score :</div>
        <div className="Score">{100 - popularity}/100</div>
        <div className="ScoreTrial">
          {" "}
          <br /> {popularityText}
        </div>
      </div>

      <div className="OriginalsContainer">
        <ul className="OriginalDiv">
          <div className="LeastPopular">
          <li className="OriginalLabel">Your most original songs :</li>
            {leastPopularTracks.map((track, index) => (
              <li key={index} className="OriginalItem">
                <br />
                <span>Title : {track.name}</span>
                <br /> 
                <br />
                <span>Originality score: {track.popularity}</span>{" "}
              </li>
            ))}
          </div>

          <div className="MostPopular">
          <li className="OriginalLabel">Your least original songs :</li>
            {mostPopularTracks.map((track, index) => (
              <li key={index} className="OriginalItem">
                <br />
                <span>Title : {track.name}</span>
                <br /> 
                <br />
                <span>Originality score: {track.popularity}</span>{" "}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}

export default ProfilDiv;
