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
    <div className="data-updater__container">
      <p>logged in as {userName}</p>

      <div>
        <button
          className="data-updater__button"
          onClick={() => {
            getPlaylists(2023);
            setGetPlaysDisabled(false);
          }}
        >
          check 2023 playlists
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
      <a
        href="https://api.elephantsql.com/console/2bcf94cf-f4be-4b37-88a5-710bc55c7738/browser"
        target="_blank"
        rel="noreferrer"
      >
        visit database
      </a>
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
    </div>
  );
}
