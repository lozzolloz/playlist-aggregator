import "./App.css";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import TableComponent from "./components/ResultsTable/ResultsTable";
import OptionButtons from "./components/OptionButtons/OptionButtons";
import LoginButton from "./components/LoginButton/LoginButton";
import DataUpdater from "./components/DataUpdater/DataUpdater";

let deployment = false;
var urlServer = deployment === true ? "" : "http://localhost:5001";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [plays, setPlays] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const years = [2019, 2020, 2021, 2022, 2023];
  const terms = ["top tracks", "top artists", "new tracks", "new artists"];
  const [getPlaysDisabled, setGetPlaysDisabled] = useState(true);
  const [pushPlaysDisabled, setPushPlaysDisabled] = useState(true);
  const [year, setYear] = useState(2019);
  const [term, setTerm] = useState("top tracks");
  const [searchResults, setSearchResults] = useState([]);
  const [hideOptions, setHideOptions] = useState(true);
  const [hideWrapped, setHideWrapped] = useState(false);
  const [createdPlaylistId, setCreatedPlaylistId] = useState("");
  const [hideWrapped2, setHideWrapped2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tokenInfo = getTokenFromUrl();
      const spotifyToken = tokenInfo.access_token;

      if (spotifyToken) {
        setSpotifyToken(spotifyToken);
        spotifyApi.setAccessToken(spotifyToken);
        const user = await spotifyApi.getMe();
        console.log(user);
        setUserName(user.display_name);
        setUserId(user.id);
        setLoggedIn(true);
      }
    };

    fetchData();
  }, []);

  const getPlaylists = async (selectedYear) => {
    try {
      const response = await fetch(`${urlServer}/playlists/${selectedYear}`);
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error(`Error fetching playlists for ${selectedYear}:`, error);
    }
  };

  const getPlaylistTracks = async (playlist) => {
    try {
      const data = await spotifyApi.getPlaylist(playlist.uri);
      let tracks = [];

      for (let i = 0; i < data.tracks.items.length; i++) {
        tracks.push({
          title: data.tracks.items[i].track.name,
          artists: data.tracks.items[i].track.artists.map(
            (artist) => artist.name
          ),
          uri: data.tracks.items[i].track.uri,
          playYear: playlist.year,
        });
      }

      setPlays((prevPlays) => [...prevPlays, ...tracks]);
    } catch (error) {
      console.error(`Error fetching tracks for ${playlist.year}:`, error);
    }
  };

  const pushPlays = async (selectedYear) => {
    try {
      await fetch(`${urlServer}/removeallplays/${selectedYear}`, {
        method: "POST",
      });

      for (let i = 0; i < plays.length; i++) {
        const response = await fetch(`${urlServer}/addplay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plays[i]),
        });

        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(`Error pushing plays for ${selectedYear}:`, error);
    }
  };

  const getPlays = async (selectedYear) => {
    try {
      setPlays([]); // Clear the plays array before fetching new plays
      for (let i = 0; i < playlists.length; i++) {
        await getPlaylistTracks(playlists[i]);
      }
    } catch (error) {
      console.error(`Error fetching plays for ${selectedYear}:`, error);
    }
  };

  const createPlaylist = async (userId, options) => {
    try {
      const data = await spotifyApi.createPlaylist(userId, options);
      console.log(`Playlist created ${data.id} ${options.name}`);
      setCreatedPlaylistId(data.id);
    } catch (error) {
      console.error(`Error creating playlist`, error);
    }
  };

  const addTracksToPlaylist = async (playlistId, searchResults) => {
    const chunkSize = 100;
  
    for (let i = 0; i < searchResults.length; i += chunkSize) {
      const urisChunk = searchResults.slice(i, i + chunkSize).map(result => result.uri);
  
      try {
        await spotifyApi.addTracksToPlaylist(playlistId, urisChunk);
        console.log(`${urisChunk.length} tracks added to playlist ${playlistId}`);
      } catch (error) {
        console.error(`Error adding tracks to playlist`, error);
      }
    }
  };

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  useEffect(() => {
    console.log(plays);
  }, [plays]);

  useEffect(() => {
    if (createdPlaylistId === "") {
      setHideWrapped2(true);
    } else {
      setHideWrapped2(false);
    }
  }, [createdPlaylistId]);

  async function getSearchResults(year, term) {
    let fetchUrl = "";
    if (year === "all") {
      switch (term) {
        case "top tracks":
        case "new tracks":
          fetchUrl = `http://localhost:5001/toptracksall`;
          break;
        case "top artists":
        case "new artists":
          fetchUrl = `http://localhost:5001/topartistsall`;
          break;
        default:
          fetchUrl = `http://localhost:5001/toptracksall`;
      }
    } else if (year === 2019) {
      switch (term) {
        case "top tracks":
        case "new tracks":
          fetchUrl = `http://localhost:5001/toptracks/${year}`;
          break;
        case "top artists":
        case "new artists":
          fetchUrl = `http://localhost:5001/topartists/${year}`;
          break;
        default:
          fetchUrl = `http://localhost:5001/toptracks/${year}`;
      }
    } else {
      switch (term) {
        case "top tracks":
          fetchUrl = `http://localhost:5001/toptracks/${year}`;
          break;
        case "top artists":
          fetchUrl = `http://localhost:5001/topartists/${year}`;
          break;
        case "new tracks":
          fetchUrl = `http://localhost:5001/newtracks/${year}`;
          break;
        case "new artists":
          fetchUrl = `http://localhost:5001/newartists/${year}`;
          break;
        default:
          fetchUrl = `http://localhost:5001/toptracks/${year}`;
          break;
      }
    }

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  }

  useEffect(() => {
    if (year === "all" || year === 2019) {
      setHideOptions(true);
    } else {
      setHideOptions(false);
    }
  }, [year]);

  useEffect(() => {
    getSearchResults(year, term);
  }, [year, term]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (term === "new tracks" || term === "top tracks") {
      setHideWrapped(false);
    }
    if (term === "new artists" || term === "top artists") {
      setHideWrapped(true);
    }
  }, [term]);

  //correct hidden options if change to year where they are hidden
  useEffect(() => {
    if (hideOptions === true && term === "new tracks") {
      setTerm("top tracks");
    }
    if (hideOptions === true && term === "new artists") {
      setTerm("top artists");
    }
  }, [hideOptions, year, term]);

  useEffect(() => {
    setCreatedPlaylistId("");
  }, [year, term]);

  return (
    <div id="app">
      {!loggedIn && <LoginButton />}

      {loggedIn && (
        <DataUpdater
          userName={userName}
          getPlaylists={getPlaylists}
          setGetPlaysDisabled={setGetPlaysDisabled}
          getPlays={getPlays}
          setPushPlaysDisabled={setPushPlaysDisabled}
          pushPlays={pushPlays}
          getPlaysDisabled={getPlaysDisabled}
          pushPlaysDisabled={pushPlaysDisabled}
          hideWrapped={hideWrapped}
          hideWrapped2={hideWrapped2}
          createPlaylist={createPlaylist}
          userId={userId}
          term={term}
          year={year}
          addTracksToPlaylist={addTracksToPlaylist}
          createdPlaylistId={createdPlaylistId}
          searchResults={searchResults}
        />
      )}
      <OptionButtons
        year={year}
        setYear={setYear}
        term={term}
        setTerm={setTerm}
        years={years}
        terms={terms}
        hideOptions={hideOptions}
      />
      <TableComponent data={searchResults} />
    </div>
  );
}

export default App;
