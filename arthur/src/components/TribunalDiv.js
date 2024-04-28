import React, { useEffect, useState } from "react";
import "../assets/TribunalDiv.css";
import {
  getAveragePopularityOfAPlaylist,
  getUserData,
  getUserPlaylists,
  Get4FirstSongOfThePlaylist,
} from "../services/spotify";

function TribunalDiv() {

  const handleButtonClick = (playlistId) => {
    setPlaylistId(playlistId);
  };
  const [userId, setUserId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(0);
  const [songs, setSongs] = useState([]);
  const [originalityScore, setOriginalityScore] = useState(null);

  useEffect(() => {
    // Charger l'ID de l'utilisateur
    getUserData().then((user) => {
      setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    // Charger les playlists lorsque l'ID de l'utilisateur est disponible
    if (userId) {
      getUserPlaylists(userId).then((playlists) => {
        setPlaylists(playlists);
      });
    }
  }, [userId]);

  useEffect(() => {
    // Charger les chansons de la playlist lorsque son ID est disponible
    if (userId && playlistId) {
      Get4FirstSongOfThePlaylist(userId, playlistId)
        .then((songs) => {
          setSongs(songs);
        })
        .catch((error) => {
          console.error("Error loading songs:", error);
        });

      // Charger le score d'originalité de la playlist
      getAveragePopularityOfAPlaylist(playlistId)
        .then((score) => {
          setOriginalityScore(score);
        })
        .catch((error) => {
          console.error("Error loading originality score:", error);
        });
    }
  }, [userId, playlistId]);

  return (
    <>
      <div className="TrialDiv">The trial</div>
      <div className="SubmitText">
        {playlistId === 0
          ? "What playlist do you want Arthur to judge?"
          : `This playlist has an originality score of ${100-((
              Math.round(originalityScore * 10) / 10
            ).toFixed(1))} /100`}
      </div>

      <div className="PreviewPlaylist">
      <div className="CoverContainer">
  {songs.slice(0, 4).map((song, index) => (
    <div key={index} className="BlackCoverDiv">
      <p className="WhiteText">{song.trackName.length > 46 ? `${song.trackName.substring(0, 46)}...` : song.trackName}</p>
    </div>
  ))}
</div>
        <div className="ArthurShoe"></div>
      </div>
      <div className="PlaylistContainer">
        <ul className="PlaylistDiv">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className={`PlaylistItem ${
                playlistId === playlist.id ? "active" : ""
              }`}
              onClick={() => handleButtonClick(playlist.id)}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TribunalDiv;
