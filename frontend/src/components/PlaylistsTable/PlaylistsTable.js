import React from "react";
import "./PlaylistsTable.css";

export default function PlaylistsTable({ allPlaylists, allPlaylistsInPlays }) {
  return (
    <div className="playlists-table">
      <table>
        <thead>
          <tr className="header-row">
            <th className='header-numeric'>#</th>
            <th className='header-numeric'>Year</th>
            <th className='header-text'>Name</th>
            <th className='header-text'>ID</th>
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
                  ? "normal-row"
                  : "highlighted-row"
              }
            >
              <td className="id-column">{allPlaylists.length - index}</td>
              <td className="playlist-year">{playlist.year}</td>
              <td className="playlist-name">{playlist.name}</td>
              <td className="uri-column">{playlist.uri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
