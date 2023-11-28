import "./ImportPlayCounts.css";

export default function ImportPlayCounts({
  getPlaylists,
  getPlays,
  pushPlays,
  playCountImportPage,
  setPlayCountImportPage,
  getAllPlaylists,
  highlightedPlaylistsExist,
  playlistsNotInPlays,
  setPlaylistsNotInPlays,
  plays,
  getAllPlaylistsInPlays,
}) {
  const handleGetClick = async () => {
    setPlayCountImportPage("loading");
    await getPlays(2023);
    setPlayCountImportPage("confirm");
  };

  const handlePushClick = async () => {
    setPlayCountImportPage("loading");
    await pushPlays(2023);
    await getAllPlaylists();
    await getAllPlaylistsInPlays();
    setPlayCountImportPage("home");
  };

  return (
    <div className="import-interface">
  
      {!highlightedPlaylistsExist && playCountImportPage === "home" && (
        <div>
          <p>All play counts are up to date!</p>
        </div>
      )}
      {highlightedPlaylistsExist && playCountImportPage === "home" && (
        <div>
          <p className="highlighted-text">
            Play counts awaiting import from {playlistsNotInPlays.length}{" "}
            playlist
            {playlistsNotInPlays.length > 1 ? "s" : ""}
          </p>
          <button onClick={handleGetClick}>import</button>
        </div>
      )}
      {playCountImportPage === "loading" && (
        <div>
          <p>Importing...</p>
          <p>Do not navigate away from this page</p>
        </div>
      )}

      {playCountImportPage === "confirm" && (
        <div>
          <p>Import {plays.length} plays?</p>
          <button onClick={handlePushClick}>import</button>
          <button onClick={() => setPlayCountImportPage("home")}>cancel</button>
        </div>
      )}
    </div>
  );
}
