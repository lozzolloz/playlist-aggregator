import './PlaylistsTable.css'

export default function PlaylistsTable({ allPlaylists }) {
  return (
    <div className="playlists-table">
      <table>
        <thead>
          <tr>
          <th></th>
            <th>year</th>
            <th>name</th>
            <th>URI</th>
          </tr>
        </thead>
        <tbody>
          {allPlaylists.map((playlist) => (
            <tr key={playlist.id}>
            <td className='id-column'>{playlist.id}</td>
              <td>{playlist.year}</td>
              <td>{playlist.name}</td>
              <td className='uri-column'>{playlist.uri}</td>

         
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
