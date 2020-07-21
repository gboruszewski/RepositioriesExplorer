import React from "react";

export default function SearchResults({results,searchKey,isSearching,showLabel}) {
  return (
    <div>
      {
        isSearching ? "Searching..."
        :
        <>
          {showLabel && <h4>
            {searchKey && results.length ? `Showing users for ${searchKey}` : ( searchKey ? 'No results found' : 'No search key provided' )}
          </h4>}
          {results.map( (result,index) => <li key={index}>{result.name}</li>)}
        </>
    }
    </div>
  )
}
