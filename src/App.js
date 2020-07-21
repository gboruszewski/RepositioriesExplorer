import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import './App.scss';

const REPO_URL = "https://api.github.com/search/users";
const TIMEOUT_IN_MILISEC = 1000;

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: "",
      results: [],
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setResults = this.setResults.bind(this);
  }
  timeoutId = "";

  handleSearch() {
    const url = `${REPO_URL}?q=${this.state.search}`
    fetch(url)
    .then(data => data.json())
    .then(data => this.setResults(data.items));
  }

  setResults(data) {
    const results = this.parseResults(data);
    this.setState({
      results,
    })
  }

  parseResults(data) {
    return data.map( item => ({
      name: item.login,
      url: item.repos_url,
    }))
  }

  manageSearchTimeout() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(this.handleSearch, TIMEOUT_IN_MILISEC);
  }

  updateSearch(search) {
    this.setState({search: search}, () => {
      this.manageSearchTimeout();
    });
  }

  render() {
    const { state: { search, results }, updateSearch } = this;
    return (
      <>
        <SearchBar value={search} onChange={updateSearch} />
        <SearchResults results={results} />
      </>
    )
  }
}
