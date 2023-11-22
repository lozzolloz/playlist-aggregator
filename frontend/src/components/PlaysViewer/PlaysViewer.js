import OptionButtons from "../PlaySearchOptions/PlaySearchOptions";
import PlaysTable from "../PlaysTable/PlaysTable";

export default function PlaysViewer(
    {
        year,
        setYear,
        term,
        setTerm,
        years,
        terms,
        hideOptions,
        searchResults,
      
    }
){
return (<div>
     <OptionButtons
        year={year}
        setYear={setYear}
        term={term}
        setTerm={setTerm}
        years={years}
        terms={terms}
        hideOptions={hideOptions}
      />
      <PlaysTable searchResults={searchResults} />
</div>)
}