import ImportInterface from "../../ImportPlaylist/ImportPlaylist";
import PlaylistsTable from "../../PlaylistsTable/PlaylistsTable";
import ImportConfirm from "./ImportConfirm/ImportConfirm";
import "./ImportView.css";

export default function ImportView({
  allPlaylists,
  inputTerm,
  setInputTerm,
  inputYear,
  setInputYear,
  getNewPlaylistInfo,
  importError,
  setImportError,
  confirmationPageView,
  setConfirmationPageView,
  newPlaylistInfo,
  setNewPlaylistInfo,
  pushPlaylist,
  getAllPlaylists,
}) {
  return (
    <div className="import-view">
      {confirmationPageView === false && (
        <ImportInterface
          inputTerm={inputTerm}
          setInputTerm={setInputTerm}
          inputYear={inputYear}
          setInputYear={setInputYear}
          getNewPlaylistInfo={getNewPlaylistInfo}
          importError={importError}
          setImportError={setImportError}
        />
      )}
      {confirmationPageView === true && (
        <ImportConfirm
          newPlaylistInfo={newPlaylistInfo}
          inputYear={inputYear}
          setNewPlaylistInfo={setNewPlaylistInfo}
          confirmationPageView={confirmationPageView}
          setConfirmationPageView={setConfirmationPageView}
          pushPlaylist={pushPlaylist}
          getAllPlaylists={getAllPlaylists}
        />
      )}
      <PlaylistsTable allPlaylists={allPlaylists} />
    </div>
  );
}
