import "./PlaySearchOptions.css";

export default function PlaySearchOptions({
  year,
  setYear,
  term,
  setTerm,
  years,
  terms,
  hideOptions,
  setCreatePlaylistPage,
}) {
  return (
    <div id="options-container">
      <div>
        {years.map((selectedYear) => (
          <button
            key={selectedYear}
            onClick={() => {
              setYear(selectedYear);
              setCreatePlaylistPage('home');
            }}
            className={
              year === selectedYear
                ? "option-button-selected"
                : "option-button-unselected"
            }
          >
            {selectedYear}
          </button>
        ))}
        <button
          key={"All Time"}
          onClick={() => {
            setYear("all");
            setCreatePlaylistPage('home');
          }}
          className={
            year === "all"
              ? "option-button-selected"
              : "option-button-unselected"
          }
        >
          All Time
        </button>
      </div>

      <div>
        {terms.map((selectedTerm) => (
          <button
            key={selectedTerm}
            onClick={() => setTerm(selectedTerm)}
            className={
              term === selectedTerm
                ? "option-button-selected"
                : "option-button-unselected"
            }
            id={
              selectedTerm === "New Tracks" || selectedTerm === "New Artists"
                ? hideOptions
                  ? "option-button-hidden"
                  : ""
                : ""
            }
          >
            {selectedTerm}
          </button>
        ))}
      </div>
    </div>
  );
}
