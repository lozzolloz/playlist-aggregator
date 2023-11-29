import "./Navigation.css";

export default function Navigation({
  loggedIn,
  userName,
  editMode,
  setEditMode,
  getAllPlaylists,
  getAllPlaylistsInPlays,
}) {
  return (
    <div className="navbar">
      {!loggedIn && (
        <div className="nav-buttons-div">
          <a href={`http://localhost:8888/login`}>
            <button className="nav-button">Log In</button>
          </a>
        </div>
      )}

      {loggedIn && (
        <div>
          <div className="nav-buttons-div">
            <a href="http://localhost:3000/">
              <button className="nav-button">
                <p className="username">{userName}</p>
                <p
                  className="nav-button__subheading"
                  href="http://localhost:3000/"
                >
                  Log Out
                </p>
              </button>
            </a>
          </div>
          <div className="nav-buttons-div">
            <button
              className={
                "nav-button" + (editMode === "export" ? "--selected" : "")
              }
              onClick={() => setEditMode("export")}
            >
              Create Wrapped
            </button>
            <button
              className={
                "nav-button" + (editMode === "import" ? "--selected" : "")
              }
              onClick={() => {
                getAllPlaylistsInPlays();
                getAllPlaylists();
                setEditMode("import");
              }}
            >
              Import Plays
            </button>
          </div>
          <div className="nav-buttons-div">
            <a
              href="https://api.elephantsql.com/console/2bcf94cf-f4be-4b37-88a5-710bc55c7738/browser"
              target="_blank"
              rel="noreferrer"
            >
              <button className="nav-button">Visit Database</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
