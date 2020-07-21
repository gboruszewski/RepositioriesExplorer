import React from "react";

export default function SearchResults({results}) {

  return (
    <div>
      {results.map( (result,index) => <li key={index}>{result.name}</li>)}
    </div>
  )
}
