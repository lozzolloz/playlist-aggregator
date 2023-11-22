import "./ImportConfirm.css";

export default function ImportConfirm({
  newPlaylistInfo,
  inputYear,
  setNewPlaylistInfo,
  setConfirmationPageView,
  pushPlaylist,
  getAllPlaylists,
}) {
  async function handleConfirmClick() {
    await pushPlaylist(newPlaylistInfo, inputYear);
    setConfirmationPageView(false);
    setNewPlaylistInfo(null);
    getAllPlaylists();
  }

  function handleCancelClick() {
    setConfirmationPageView(false);
    setNewPlaylistInfo(null);
  }

  return (
    <div className="import-confirm">
      <p>{newPlaylistInfo.name}</p>
      <div className="import-confirm__buttons">
        <button onClick={handleConfirmClick}>
          add to {inputYear} database
        </button>
        <button onClick={handleCancelClick}>cancel</button>
      </div>
    </div>
  );
}
