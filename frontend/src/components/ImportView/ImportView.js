import ImportInterface from "./ImportInterface/ImportInterface";
import PlaylistsTable from "./PlaylistsTable/PlaylistsTable";
import './ImportView.css'

export default function ImportView({ allPlaylists }) {
  return (
    <div className='import-view'>
      <ImportInterface />
      <PlaylistsTable allPlaylists={allPlaylists} />
    </div>
  );
}
