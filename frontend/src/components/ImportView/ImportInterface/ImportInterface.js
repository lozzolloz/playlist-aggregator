import "./ImportInterface.css";

export default function ImportInterface({
  inputTerm,
  setInputTerm,
  inputYear,
  setInputYear,
  getNewPlaylistInfo,
    importError,
    setImportError,
 
}) {
  function handleInputTermChange(event) {
    setInputTerm(event.target.value);
  }

function handleInputYearChange(event) {
    setInputYear(parseInt(event.target.value, 10));
  }

function handleImportClick() {
 getNewPlaylistInfo(inputTerm)
  }


  return (
    <div className="import-interface">
      <p className='add-playlist-heading'>add playlist to database</p>
      <div className="import-interface__input">
        <input placeholder="URI" onChange={handleInputTermChange}></input>

        <select className="year"
        onChange={handleInputYearChange}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        <button onClick={handleImportClick}>import</button>
      </div>
      <p className={"import-interface__error-"+importError}>playlist not found</p>
    </div>
  );
}
