import "./CreatePlaylist.css";

export default function CreatePlaylist({
  createPlaylist,
  userId,
  term,
  year,
  addTracksToPlaylist,
  createdPlaylistId,
  searchResults,
  createPlaylistPage,
  setCreatePlaylistPage,
}) {
  async function handleAddTracksClick(createdPlaylistId, searchResults) {
    try {
      setCreatePlaylistPage("loading");
      await addTracksToPlaylist(createdPlaylistId, searchResults);
      setCreatePlaylistPage("done");
    } catch (error) {
      console.error("Error adding tracks to playlist:", error);
    }
  }

  return (
    <div>
      {createPlaylistPage === "home" && (
        <div className="create-playlist-container">
          <p className="info">&nbsp;</p>
          <p className="info--big">
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>
          <button
            className="create-button"
            onClick={() =>
              createPlaylist(
                userId,
                {
                  name: `GIRLS NIGHT OUT WRAPPED: ${term} ${year}`,
                  public: false,
                },
                setCreatePlaylistPage("confirm")
              )
            }
          >
            Create Playlist
          </button>
        </div>
      )}

      {createPlaylistPage === "confirm" && (
        <div className="create-playlist-container">
          <p className="info">Blank Playlist Created</p>
          <p className="info--big">
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>
          <div>
            <button
              className="create-button"
              onClick={() =>
                handleAddTracksClick(createdPlaylistId, searchResults)
              }
            >
              Add {searchResults.length} Tracks
            </button>
            <button
              className="cancel-button"
              onClick={() => setCreatePlaylistPage("done")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {createPlaylistPage === "done" && (
        <div className="create-playlist-container">
          <p className="info">
            {searchResults.length} tracks added to playlist!
          </p>
          <p className="info--big">
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>
          <button
            className="create-button"
            onClick={() => setCreatePlaylistPage("home")}
          >
            Home
          </button>
        </div>
      )}

      {createPlaylistPage === "loading" && (
        <div className="create-playlist-container">
          <p className="info">
            Adding {searchResults.length} tracks to playlist...
          </p>
          <p className="loader"></p>
          <p className="warning">
            Do not navigate away from this page.
          </p>
        </div>
      )}

    </div>
  );
}
