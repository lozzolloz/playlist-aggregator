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
    <div className="data-updater__subcontainer">
      {!createPlaylistConfirmView && (
        <div>
          <p>create playlist</p>
          <p>
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>
          <button
            className="data-updater__button"
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
            create playlist
          </button>
        </div>
      )}

      {createPlaylistConfirmView && (
        <div>
          <p>blank playlist created</p>
          <p>
            GIRLS NIGHT OUT WRAPPED: {term} {year}
          </p>

          <button
            className="data-updater__button"
            onClick={() =>
              addTracksToPlaylist(createdPlaylistId, searchResults)
            }
          >
            add {searchResults.length} tracks to playlist
          </button>
          <button
            className="data-updater__button"
            onClick={
              () => setCreatePlaylistConfirmView(false)
        
            }
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}
