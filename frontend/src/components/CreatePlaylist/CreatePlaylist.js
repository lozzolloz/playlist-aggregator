import "./CreatePlaylist.css";

export default function CreatePlaylist({
  createPlaylist,
  userId,
  term,
  year,
  addTracksToPlaylist,
  createdPlaylistId,
  searchResults,
  createPlaylistConfirmView,
  setCreatePlaylistConfirmView,
}) {
  return (
    <div>
      {!createPlaylistConfirmView && (
        <div className="create-playlist-container">
          <p className="info">Create Playlist</p>
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
                setCreatePlaylistConfirmView(true)
              )
            }
          >
            Create Playlist
          </button>
        </div>
      )}

      {createPlaylistConfirmView && (
        <div className="create-playlist-container">
          <p className="info">Blank Playlist Created</p>
          <p className="info--big">
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>
          <div>
            <button
              className="create-button"
              onClick={() =>
                addTracksToPlaylist(createdPlaylistId, searchResults)
              }
            >
              Add {searchResults.length} Tracks
            </button>
            <button
              className="cancel-button"
              onClick={() => setCreatePlaylistConfirmView(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
