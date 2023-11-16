import "./DataUpdater.css";

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
}) {
  return (
    <div className="data-updater">
      <div className="loggedin-logout">
        <p>logged in as {userName}</p>
        <p>|</p>
        <a href="http://localhost:3000/">
          <p>logout</p>
        </a>
      </div>
      <div className="data-updater__subcontainer">
        <h3>update 2023 playlist data</h3>

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

        <h3>create new Wrapped playlist</h3>

        <div>
          <button
            className="wrapped-button"
            disabled={hideWrapped}
            onClick={() =>
              createPlaylist(userId, {
                name: `GIRLS NIGHT OUT WRAPPED: ${term} ${year}`,
                public: false,
              })
            }
          >
            create blank playlist
          </button>
          <button
            className="wrapped-button"
            disabled={hideWrapped2}
            onClick={() =>
              addTracksToPlaylist(createdPlaylistId, searchResults)
            }
          >
            add tracks to playlist
          </button>
        </div>
        <a
          href="https://api.elephantsql.com/console/2bcf94cf-f4be-4b37-88a5-710bc55c7738/browser"
          target="_blank"
          rel="noreferrer"
        >
          <p>visit database</p>
        </a>
      </div>
    </div>
  );
}
