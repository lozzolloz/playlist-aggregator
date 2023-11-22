import React from 'react';
import './PlaylistsTable.css';

export default function PlaylistsTable({ allPlaylists, allPlaylistsInPlays }) {
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
          {allPlaylists.map((playlist, index) => (
            <tr
              key={playlist.id}
              className={
  allPlaylistsInPlays.some(
    (item) => item.sourceplaylist === playlist.uri
  )
    ? 'normal-row'
    : 'highlighted-row'
}


              
            >
              <td className="id-column">{allPlaylists.length - index}</td>
              <td>{playlist.year}</td>
              <td>{playlist.name}</td>
              <td className="uri-column">{playlist.uri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
