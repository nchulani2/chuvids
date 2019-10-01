import React, { Component } from 'react';
import Title from '../components/Title';

class Search extends Component {
  render() {
    return (
      <div
        className="sectioning animated fadeIn fast ui container"
        style={{ height: '100%' }}>
        <Title titleText="search"></Title>
      </div>
    );
  }
}

export default Search;
