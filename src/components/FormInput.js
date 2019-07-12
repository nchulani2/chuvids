import React from 'react';
import '../styles/FormInput.css';

let ele;
let options = {
  block: 'start',
  behavior: 'smooth'
};

export default class FormInput extends React.Component {
  state = {
    userInput: 'rainforest saib'
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
      <form className="formInput" onSubmit={this.onFormSubmit}>
        <div className="ui action input massive" id="formEle">
          <input
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
    );
  }
}
