import "./UserInterface.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist.js";

export default function DataUpdater({
  userName,
  getPlaylists,
  setGetPlaysDisabled,
  getPlays,
  setPushPlaysDisabled,
  pushPlays,
  getPlaysDisabled,
  pushPlaysDisabled,
  hideWrapped,
  createPlaylist,
  userId,
  term,
  year,
  hideWrapped2,
  addTracksToPlaylist,
  createdPlaylistId,
  searchResults,
  editMode,
  setEditMode,
  getAllPlaylists,
}) {
  return (
    <div className="data-updater">
      <div className="data-updater__subcontainer">
        {editMode === "export" && (
          <CreatePlaylist
            hideWrapped={hideWrapped}
            createPlaylist={createPlaylist}
            userId={userId}
            term={term}
            year={year}
            hideWrapped2={hideWrapped2}
            addTracksToPlaylist={addTracksToPlaylist}
            createdPlaylistId={createdPlaylistId}
            searchResults={searchResults}
          />
        )}

        {editMode === "import" && (
          <div>
            <button
              className="data-updater__button"
              onClick={() => {
                getPlaylists(2023);
                setGetPlaysDisabled(false);
              }}
            >
              check new playlists
            </button>
            <button
              className="data-updater__button"
              onClick={() => {
                getPlays(2023);
                setPushPlaysDisabled(false);
              }}
              disabled={getPlaysDisabled}
            >
              update play counts
            </button>
            <button
              className="data-updater__button"
              onClick={() => pushPlays(2023)}
              disabled={pushPlaysDisabled}
            >
              push to database
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
