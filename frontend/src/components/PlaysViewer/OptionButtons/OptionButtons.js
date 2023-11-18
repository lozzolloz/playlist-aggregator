import "./OptionButtons.css";

export default function OptionButtons({
  year,
  setYear,
  term,
  setTerm,
  years,
  terms,
  hideOptions,
}) {
  return (
    <div id="options-container">
      <div>
        {years.map((selectedYear) => (
          <button
            key={selectedYear}
            onClick={() => setYear(selectedYear)}
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
          onClick={() => setYear("all")}
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
