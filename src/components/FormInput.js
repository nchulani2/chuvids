import React from 'react';
import { searchVids } from '../actions';
import { connect } from 'react-redux';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import '../styles/FormInput.css';

class FormInput extends React.Component {
  state = {
    userInput: ''
  };

  onFormSubmit = e => {
    e.preventDefault();
    var videoTop = document.querySelector('.videos');
    scrollIntoView(videoTop, {
      scrollMode: 'always',
      block: 'start'
    });
    var query =
      this.state.userInput[0].toUpperCase() + this.state.userInput.slice(1);
    this.props.searchVids(query);
  };

  render() {
    return (
      <div className="formInput">
        <form onSubmit={this.onFormSubmit}>
          <div className="ui right labeled input" id="formEle">
            <input
              type="text"
              placeholder="Enter video name. . ."
              onChange={e =>
                this.setState({ userInput: e.target.value })
              }></input>
            <button className="ui tag label formButton" type="submit">
              <i className="search icon"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { videos: state.data };
};

export default connect(
  mapStateToProps,
  { searchVids }
)(FormInput);
