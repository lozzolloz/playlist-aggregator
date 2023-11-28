import React from "react";
import "./PlayCountsTable.css";

export default function PlayCountsTable({ searchResults }) {
  // Get unique headers excluding "uri"
  const headers = [
    ...new Set(
      searchResults.flatMap((item) =>
        Object.keys(item).filter((key) => key !== "uri")
      )
    ),
  ];

  // Create a map to store row numbers for each unique count value
  const countRowMap = {};

  // Define table rows with row numbers
  const rows = searchResults.map((item, index) => {
    // If count is not in the map, add it with the current row number
    if (!countRowMap[item.count]) {
      countRowMap[item.count] = index + 1;
    }

    // Format artists array with commas and spaces
    const formattedArtists = Array.isArray(item.artists)
      ? item.artists.join(", ")
      : item.artists;

    return (
      <tr key={index}>
        <td className="position">{countRowMap[item.count]}</td>{" "}
        {/* Position in the chart */}
        {headers.map((header, i) => (
          <td key={i} className={header}>
            {header === "artists" ? formattedArtists : item[header]}
          </td>
        ))}
      </tr>
    );
  });

  // Add "Row" to the beginning of headers
  headers.unshift(" ");

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
