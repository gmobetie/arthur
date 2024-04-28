// Parameters
const clientId = "f580b800c2a24659b4cdbfddaa4b6726"; // your clientId
const redirectUrl = "http://localhost:3000"; // your redirect URL - must be localhost URL and/or HTTPS
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email user-top-read";

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Spotify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token,
    }),
  });

  return await response.json();
}

// Login and logout

export async function loginSpotify() {
  await redirectToSpotifyAuthorize();
}

export async function logoutSpotify() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

export async function refreshSpotify() {
  const token = await refreshToken();
  currentToken.save(token);
}

// Verification
export function isLogged() {
  return currentToken.access_token != null;
}

// Fetch functions

async function fetchWebApi(endpoint, method, body) {
  const response = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function getUserData() {
  return await fetchWebApi("v1/me", "GET");
}

export async function getTopTracks() {
  return await fetchWebApi("v1/me/top/tracks?limit=5", "GET").then(
    (liste) => liste.items
  );
}

//50 favorite tracks
export async function getTop50Tracks() {
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=50", "GET")
  ).items;
}

// 5 most popular tracks among the 50 favorites

export async function getTop5TracksWithHighestPopularity() {
  const items = await getTop50Tracks();

  if (!items || items.length === 0) {
    return [];
  }

  // We map the datas to be able to use them
  const tracksData = items.map((track) => {
    return {
      name: track.name,
      popularity: track.popularity,
    };
  });

  // we sort the datas
  tracksData.sort((a, b) => b.popularity - a.popularity);

  // we only take the 5 first
  const top5Tracks = tracksData.slice(0, 5);

  return top5Tracks;
}

// 5 least popular tracks among the 50 favorites

export async function getTop5TracksWithLowestPopularity() {
  const items = await getTop50Tracks();

  if (!items || items.length === 0) {
    throw new Error("No tracks found");
  }

  // We map the datas to be able to use them
  const tracksData = items.map((track) => {
    return {
      name: track.name,
      popularity: track.popularity,
    };
  });

  // we sort the datas
  tracksData.sort((a, b) => a.popularity - b.popularity);

  // we only take the 5 first
  const top5Tracks = tracksData.slice(0, 5);

  return top5Tracks;
}

//Popularity mean in topTracks (Score d'originalité)

export async function getAveragePopularity() {
  const items = await getTop50Tracks();

  if (!items || items.length === 0) {
    throw new Error("No tracks found");
  }

  // We map the datas
  const tracksData = items.map((track) => {
    return {
      name: track.name,
      popularity: track.popularity,
    };
  });

  // we sum the datas
  const totalPopularity = tracksData.reduce(
    (acc, track) => acc + track.popularity,
    0
  );

  // We get the mean
  const averagePopularity = totalPopularity / tracksData.length;

  return averagePopularity;
}

// Get user's playlist

export async function getUserPlaylists(userId) {
  const playlistsResponse = await fetchWebApi("v1/me/playlists", "GET");
  const playlists = playlistsResponse.items;

  // we map the data
  const mappedPlaylists = playlists.map((playlist) => {
    return {
      id: playlist.id,
      name: playlist.name,
      owner: playlist.owner.id,
      tracksTotal: playlist.tracks.total,
    };
  });

  // we only take the one own by the user
  const userPlaylists = mappedPlaylists.filter((playlist) => {
    return playlist.owner === userId;
  });

  return userPlaylists;
}

//Get the 4 latest song of a playlist

export async function Get4FirstSongOfThePlaylist(userId, playlistId = 0) {
  if (playlistId === 0) {
    const userPlaylists = await getUserPlaylists(userId);
    const firstPlaylist = userPlaylists[0];
    playlistId = firstPlaylist.id;
  }

  // We take the information we want on the 4 first
  const fields = "items(track(name,href,album(name,href)))";
  const limit = 4;
  const playlistTracksResponse = await fetchWebApi(
    `v1/playlists/${playlistId}/tracks?fields=${fields}&limit=${limit}`,
    "GET"
  );
  const playlistTracks = playlistTracksResponse.items;

  // we map the datas
  const tracksInfo = playlistTracks.map((track) => {
    const trackName = track.track.name;
    const trackHref = track.track.href;
    const albumName = track.track.album.name;
    const albumHref = track.track.album.href;
    return { trackName, trackHref, albumName, albumHref };
  });

  return tracksInfo;
}

// Get the songs of a playlist
export async function getPlaylistTracks(playlistId) {
  return (
    await fetchWebApi(
      `v1/playlists/${playlistId}/tracks?market=FR&fields=items(track(name,popularity,id))&limit=50`,
      "GET"
    )
  ).items;
}

export async function getAveragePopularityOfAPlaylist(playlistId) {
  const tracksResponse = await getPlaylistTracks(playlistId);

  if (!tracksResponse || tracksResponse.length === 0) {
    throw new Error("No tracks found");
  }

  // We map the data
  const tracksData = tracksResponse.map((item) => ({
    name: item.track.name,
    popularity: item.track.popularity,
    id: item.track.id,
  }));

  // We sum the data
  const totalPopularity = tracksData.reduce(
    (acc, track) => acc + track.popularity,
    0
  );

  // We get the mean
  const averagePopularity = totalPopularity / tracksData.length;

  return averagePopularity;
}

export async function getRecommendationsFromPlaylist(playlistId) {
  const playlistTracks = await getPlaylistTracks(playlistId);

  // Mapping the data
  const tracksData = playlistTracks.map((item) => ({
    name: item.track.name,
    popularity: item.track.popularity,
    id: item.track.id,
  }));

  // Sorting by popularity
  tracksData.sort((a, b) => a.popularity - b.popularity);

  // Getting the 2 most popular and 3 least popular tracks
  const leastPopularTracks = tracksData.slice(0, 3).map((item) => item.id);
  const mostPopularTracks = tracksData.slice(-2).map((item) => item.id);

  // Concatenating the arrays of track ids
  const trackIds = [...leastPopularTracks, ...mostPopularTracks];

  // Using the selected tracks to get recommendations
  const recommendations = await fetchWebApi(
    `v1/recommendations?seed_tracks=${trackIds.join(",")}&limit=1`,
    "GET"
  ).tracks;

  return recommendations;
}

// Test fonction to be sure that the request work (it does)
async function getRecommendations(trackIds) {
  return await fetchWebApi(
    `v1/recommendations?seed_tracks=${trackIds.join(",")}&limit=1`,
    "GET"
  ).tracks;
}
