export default function ImportPlays({
  getPlaylists,
  getPlays,
  pushPlays,
  getPlaysDisabled,
  setGetPlaysDisabled,
  pushPlaysDisabled,
  setPushPlaysDisabled,
}) {
  return (
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
  );
}
