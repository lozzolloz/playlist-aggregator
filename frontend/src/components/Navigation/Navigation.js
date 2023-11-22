import "./Navigation.css";

export default function Navigation({
  loggedIn,
  userName,
  editMode,
  setEditMode,
  getAllPlaylists,
  getAllPlaylistsInPlays
}) {
  return (
    <div>
      {!loggedIn && (
        <div>
          <a href={`http://localhost:8888/login`} className="login-button">
            <p>log in to Spotify to update data</p>
          </a>
        </div>
      )}

      {loggedIn && (
        <div>
          <p>Welcome {userName}</p>

          <div className="nav-buttons-div">
            <button
              className={
                "nav-button" + (editMode === "export" ? "--selected" : "")
              }
              onClick={() => setEditMode("export")}
            >
              create Wrapped
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
              import new plays
            </button>

            <a href="https://api.elephantsql.com/console/2bcf94cf-f4be-4b37-88a5-710bc55c7738/browser"
              target="_blank"
              rel="noreferrer">
              <button className="nav-button">visit database</button>
            </a>

            <a
              href="http://localhost:3000/"
            
            >
              <button className="nav-button"> logout</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
