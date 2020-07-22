import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import { Button } from "react-bootstrap";
import { REPO_URL, TIMEOUT_IN_MILISEC, SHOW_SEARCH_BUTTON } from "./const/constants";
import { setUsers } from "./reducers/main";
import { connect } from "react-redux";
import style from './App.module.scss';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: "",
      searchSaved: "",
      isSearching: false,
      searchFinished: false,
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.finishSerch = this.finishSearch.bind(this);
    this.setResults = this.setResults.bind(this);
    this.renderSearchButton = this.renderSearchButton.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  timeoutId = "";

  startSearch() {
    // everything that should happen immediately after changing the search word
    this.setState({
      isSearching: true,
    });
  }

  finishSearch() {
    this.setState({
      isSearching: false,
      searchFinished: true,
    });
  }

  handleSearch() {
    const { search, searchSaved } = this.state;
    const searchword = SHOW_SEARCH_BUTTON ? searchSaved : search;
    if(searchword) {
      const url = `${REPO_URL}?q=${searchword}`;
      fetch(url)
      .then(data => data.json())
      .then(data => this.setResults(data.items))
      .catch( error => console.warn(error))
      .finally( () => this.finishSearch());
    } else {
      this.setResults([]);
      this.finishSearch();
    }
  }

  setResults(data) {
    const results = this.parseResults(data);
    this.props.setUsers(results);
  }

  parseResults(data) {
    return data ? data.map( item => ({
      name: item.login,
      url: item.repos_url,
    })) : [];
  }

  manageSearchTimeout() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(this.handleSearch, TIMEOUT_IN_MILISEC);
  }

  updateSearch(search) {
    this.setState({search: search}, () => {
      !SHOW_SEARCH_BUTTON && this.manageSearchTimeout();
    });
  }

  onSearchChange(search) {
    !SHOW_SEARCH_BUTTON && this.startSearch();
    this.updateSearch(search);
  }

  onSearchButtonClick() {
    this.setState(state => ({
      searchSaved: state.search,
    }), () => {
      this.startSearch();
      this.handleSearch();
    })
  }

  renderSearchButton() {
    return <Button onClick={this.onSearchButtonClick} block>Search</Button>
  }

  render() {
    const { state: { search, searchSaved, isSearching, searchFinished }, onSearchChange, renderSearchButton } = this;
    const shouldShowLabel = !SHOW_SEARCH_BUTTON || searchFinished;
    const searchWord = SHOW_SEARCH_BUTTON ? searchSaved : search;
    return (
      <div className={style.wrapper}>
        <SearchBar value={search} onChange={onSearchChange} />
        {SHOW_SEARCH_BUTTON && renderSearchButton()}
        <SearchResults searchKey={searchWord} isSearching={isSearching} showLabel={shouldShowLabel} />
      </div>
    )
  }
}

export default connect(()=>({}),{setUsers})(App);
