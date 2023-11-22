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
  }

  function handleCancelClick() {
    setImportPlaylistConfirmView(false);
    setNewPlaylistInfo(null);
  }


  return (<div className="import-interface">
    {!importPlaylistConfirmView && (
      <div>
        <p className="add-playlist-heading">add playlist to database</p>
        <div className="import-interface__input">
          <input placeholder="URI" onChange={handleInputTermChange}></input>

          <select className="year" onChange={handleInputYearChange}>
            {/* <option value="2024">2024</option> */}
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
          playlist not found
        </p>
      </div>
    )}

    {importPlaylistConfirmView && (
      <div>
      <p>{newPlaylistInfo.name}</p>
      <div className="import-confirm__buttons">
        <button onClick={handleConfirmClick}>
          add to {inputYear} database
        </button>
        <button onClick={handleCancelClick}>cancel</button>
      </div>
      </div>
    )}

    </div>);
}
