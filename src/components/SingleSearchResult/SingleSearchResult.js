import React, { Component } from "react";
import { Card } from "react-bootstrap";
import RepositoryDetails from "../RepositoryDetails/RepositoryDetails";
import style from "./SingleSearchResult.module.scss";

export default class SingleSearchResult extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      content: [],
      contentRequested: false,
    }
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.requestContent = this.requestContent.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  requestContent() {
    this.setState({
      contentRequested: true,
    })
    fetch(this.props.result.url)
    .then(data => data.json())
    .then(data => this.updateContent(data))
    .catch(error => console.warn(`Error for ${this.props.result.name}:`, error));
  }

  updateContent(data) {
    const content = data.map( item => ({
      title: item.name,
      watchers: item.watchers_count,
      description: item.description,
    }))
    this.setState({
      content,
    })
  }

  onOpen() {
    if(!this.state.contentRequested) this.requestContent();
  }

  toggleIsOpen() {
    this.setState( state => ({
      isOpen: !state.isOpen,
    }), () => {
      if(this.state.isOpen) {
        this.onOpen();
      }
    })
  }

  render() {
    const { result: { name} } = this.props;
    const { isOpen, content } = this.state;
    return (
      <Card>
        <Card.Header className={style.cardHeader} onClick={this.toggleIsOpen}>
          {name}
        </Card.Header>
        {isOpen && <Card.Body>
          {content?.map( (detail,index) => <RepositoryDetails key={index} details={detail} /> )}
        </Card.Body> }
      </Card>
    )
  }
}
