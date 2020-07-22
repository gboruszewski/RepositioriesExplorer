import React from "react";
import SingleSearchResult from "../SingleSearchResult/SingleSearchResult";
import AppSpinner from "../AppSpinner/AppSpinner";
import { connect } from "react-redux";
import style from "./SearchResults.module.scss";

function SearchResults({searchKey,isSearching,showLabel,results}) {
  return (
    <div className={style.searchWrapper}>
      {
        isSearching ? <AppSpinner />
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

const mapStateToProps = (state) => {
  return {
    results: state.users,
  }
}

export default connect(mapStateToProps,{})(SearchResults);
