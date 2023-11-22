import "./PlaySearchOptions.css";

export default function PlaySearchOptions({
  year,
  setYear,
  term,
  setTerm,
  years,
  terms,
  hideOptions,
  setCreatePlaylistConfirmView,
}) {
  return (
    <div id="options-container">
      <div>
        {years.map((selectedYear) => (
          <button
            key={selectedYear}
            onClick={() => {
              setYear(selectedYear);
              setCreatePlaylistConfirmView(false);
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
          key={"all time"}
          onClick={() => {
            setYear("all");
            setCreatePlaylistConfirmView(false);
          }}
          className={
            year === "all"
              ? "option-button-selected"
              : "option-button-unselected"
          }
        >
          all time
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
              selectedTerm === "new tracks" || selectedTerm === "new artists"
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
