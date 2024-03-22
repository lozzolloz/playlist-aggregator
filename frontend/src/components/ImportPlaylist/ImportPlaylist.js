import "./ImportPlaylist.css";

export default function ImportPlaylist({
  inputTerm,
  setInputTerm,
  setInputYear,
  getNewPlaylistInfo,
  importError,
  importPlaylistConfirmView,
  setImportPlaylistConfirmView,

  pushPlaylist,
  newPlaylistInfo,
  inputYear,
  setNewPlaylistInfo,
  getAllPlaylists,

}) {
  function handleInputTermChange(event) {
    setInputTerm(event.target.value);
  }

  function handleInputYearChange(event) {
    setInputYear(parseInt(event.target.value, 10));
  }

  function handleImportClick() {
    getNewPlaylistInfo(inputTerm);
  }

  async function handleConfirmClick() {
    await pushPlaylist(newPlaylistInfo, inputYear);
    setImportPlaylistConfirmView(false);
    setNewPlaylistInfo(null);
    getAllPlaylists();
    setInputTerm("");
  }

  function handleCancelClick() {
    setImportPlaylistConfirmView(false);
    setNewPlaylistInfo(null);
    setInputTerm("");
  }


  return (<div>
    {!importPlaylistConfirmView && (
      <div>
        <p className="add-playlist-heading">Add Playlist To Database</p>
        <div className="add-playlist__input">
          <input placeholder="URI" onChange={handleInputTermChange}></input>

          <select className="year" onChange={handleInputYearChange}>
            <option value="2024">2024</option>
            {/* remember to update inputYear initial state in App.js if updating */}
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>

          <button onClick={handleImportClick}>import</button>
        </div>
        <p className={"import-interface__error-" + importError}>
          Playlist Not Found
        </p>
      </div>
    )}

    {importPlaylistConfirmView && (
      <div>
      <p className="new-playlist-info">{newPlaylistInfo.name}</p>
      <div className="import-confirm__buttons">
        <button className="add-playlist-button" onClick={handleConfirmClick}>
          add to {inputYear}
        </button>
        <button className="cancel-add-playlist-button" onClick={handleCancelClick}>cancel</button>
      </div>
      </div>
    )}

    </div>);
}
