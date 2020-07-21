import React from "react";
import SingleSearchResult from "../SingleSearchResult/SingleSearchResult";
import { Spinner } from "react-bootstrap";
import style from "./SearchResults.module.scss";

export default function SearchResults({results,searchKey,isSearching,showLabel}) {
  return (
    <div className={style.searchWrapper}>
      {
        isSearching ? <div className={style.spinner}><Spinner animation="border" /></div>
        :
        <>
          {showLabel && <h4 className={style.searchLabel}>
            {searchKey && results.length ? `Showing users for "${searchKey}"` : ( searchKey ? 'No results found' : 'No search key provided' )}
          </h4>}
          {results.map( (result,index) => <SingleSearchResult key={index} result={result} />)}
        </>
    }
    </div>
  )
}
