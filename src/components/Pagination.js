import React from 'react';
import '../styles/Pagination.css';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = React.createRef();
    this.goForward = React.createRef();
  }

  handleGoBack = e => {
    e.preventDefault();
    e.persist();
    this.props.handleBack();
  };

  handleGoForward = e => {
    e.preventDefault();
    e.persist();
    this.props.handleForward();
  };

  //get the selected DOM elements for change
  getDOMSelects = () => {
    const bodyCol = window
      .getComputedStyle(document.body, null)
      .getPropertyValue('background-color');

    const pagiLeft = document.querySelectorAll('.pagination .buttonParOne');
    const pagiIconLeft = document.querySelectorAll(
      '.pagination .buttonParOne i'
    );
    const pagiRight = document.querySelectorAll('.pagination .buttonParTwo');
    const pagiIconRight = document.querySelectorAll(
      '.pagination .buttonParTwo i'
    );
    return { bodyCol, pagiLeft, pagiIconLeft, pagiRight, pagiIconRight };
  };

  // On mouseoverenter, initiate change
  handleHoverEnt = e => {
    e.preventDefault();
    const {
      bodyCol,
      pagiLeft,
      pagiIconLeft,
      pagiRight,
      pagiIconRight
    } = this.getDOMSelects();

    // if black on enter
    if (bodyCol === 'rgb(0, 0, 0)') {
      if (e.target.className === 'buttonParOne') {
        pagiLeft[0].style.backgroundColor = 'white';
        pagiIconLeft[0].style.color = '#262626';
      } else if (e.target.className === 'buttonParTwo') {
        pagiRight[0].style.backgroundColor = 'white';
        pagiIconRight[0].style.color = '#262626';
      }
      // if white on enter
    } else if (bodyCol === 'rgb(250, 235, 215)') {
      if (e.target.className === 'buttonParOne') {
        pagiLeft[0].style.backgroundColor = 'black';
        pagiIconLeft[0].style.color = 'antiquewhite';
      } else if (e.target.className === 'buttonParTwo') {
        pagiRight[0].style.backgroundColor = 'black';
        pagiIconRight[0].style.color = 'antiquewhite';
      }
    }
    return;
  };

  // On mouseoverleave, initiate change
  handleHoverLeave = e => {
    e.preventDefault();

    const {
      bodyCol,
      pagiLeft,
      pagiIconLeft,
      pagiRight,
      pagiIconRight
    } = this.getDOMSelects();

    // if black on leave
    if (bodyCol === 'rgb(0, 0, 0)') {
      if (e.target.className === 'buttonParOne') {
        pagiLeft[0].style.backgroundColor = '#363636';
        pagiIconLeft[0].style.color = 'white';
      } else if (e.target.className === 'buttonParTwo') {
        pagiRight[0].style.backgroundColor = '#363636';
        pagiIconRight[0].style.color = 'white';
      }
      // if white on leave
    } else if (bodyCol === 'rgb(250, 235, 215)') {
      if (e.target.className === 'buttonParOne') {
        pagiLeft[0].style.backgroundColor = 'grey';
        pagiIconLeft[0].style.color = 'antiquewhite';
      } else if (e.target.className === 'buttonParTwo') {
        pagiRight[0].style.backgroundColor = 'grey';
        pagiIconRight[0].style.color = 'antiquewhite';
      }
    }
    return;
  };

  render() {
    return (
      <div className="pagination">
        <button
          ref={this.goBack}
          onClick={this.handleGoBack}
          onMouseEnter={this.handleHoverEnt}
          onMouseLeave={this.handleHoverLeave}
          className="buttonParOne">
          <i className="ui chevron circle left icon" />
        </button>
        <button
          ref={this.goForward}
          onClick={this.handleGoForward}
          onMouseEnter={this.handleHoverEnt}
          onMouseLeave={this.handleHoverLeave}
          className="buttonParTwo">
          <i className="ui chevron circle right icon" />
        </button>
      </div>
    );
  }
}
