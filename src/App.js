import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import './App.scss';

const REPO_URL = "https://api.github.com/search/users";
const TIMEOUT_IN_MILISEC = 1000;

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: "",
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  timeoutId = "";

  handleSearch() {
    const url = `${REPO_URL}?q=${this.state.search}`
    fetch(url)
    .then(data => data.json())
    .then(data => console.log(data));
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
    const { state: { search}, updateSearch } = this;
    return (
      <SearchBar value={search} onChange={updateSearch} />
    )
  }
}
