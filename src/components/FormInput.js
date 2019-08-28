import React from 'react';
import '../styles/FormInput.css';

let ele;
let options = {
  block: 'start',
  behavior: 'smooth'
};

export default class FormInput extends React.Component {
  state = {
    userInput: 'saib whale call'
  };

  // NOTE I did the other way, check in the JSX
  // handleUserInput = e => {
  //   this.setState({ userInput: e.target.value });
  // };

  onFormSubmit = e => {
    e.preventDefault();
    ele.scrollIntoView(options);
    this.props.handleCall(this.state.userInput);
  };

  componentDidMount = () => {
    ele = document.getElementById('scrollOnSubmit');
  };
  render() {
    return (
      <div className="formInput">
        <form onSubmit={this.onFormSubmit}>
          <div className="ui action input" id="formEle">
            <input
              style={{ border: 'none' }}
              value={this.state.userInput}
              type="text"
              placeholder="Search for video..."
              onChange={e => this.setState({ userInput: e.target.value })}
            />
            <button className="ui icon button" id="buttonEle">
              <i className="search icon" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
