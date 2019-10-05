import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigational.css';

class Navigation extends Component {
  state = {
    isOpen: false
  };

  componentDidMount = () => {
    document.getElementById('overlayNav').classList.add('hiddenBody');
  };

  toggleOverlay = e => {
    e.preventDefault();
    const { isOpen } = this.state;
    var section = document.getElementsByClassName('sectioning')[0];
    var burgerTop = document.getElementById('burger-top');
    var burgerMid = document.getElementById('burger-mid');
    var burgerBot = document.getElementById('burger-bot');
    if (isOpen === false) {
      document.getElementById('overlayNav').classList.remove('hiddenBody');
      // handles page section transitioning
      section.classList.add('transIt');
      section.classList.remove('transItBack');
      // handles burger menu animations
      burgerTop.classList.add('isopen');
      burgerMid.classList.add('isopen');
      burgerBot.classList.add('isopen');
    } else {
      section.classList.add('transItBack');
      section.classList.remove('transIt');
      burgerTop.classList.remove('isopen');
      burgerMid.classList.remove('isopen');
      burgerBot.classList.remove('isopen');
    }
    this.setState({
      isOpen: !isOpen
    });
  };

  removeAnims = () => {
    var section = document.getElementsByClassName('sectioning')[0];
    var burgerTop = document.getElementById('burger-top');
    var burgerMid = document.getElementById('burger-mid');
    var burgerBot = document.getElementById('burger-bot');

    section.classList.add('transItBack');
    section.classList.remove('transIt');
    burgerTop.classList.remove('isopen');
    burgerMid.classList.remove('isopen');
    burgerBot.classList.remove('isopen');
  };

  render() {
    return (
      <div className="navigation">
        <button onClick={this.toggleOverlay} className="buttonNav ">
          <div id="burger-top"></div>
          <div id="burger-mid"></div>
          <div id="burger-bot"></div>
        </button>
        <div
          id="overlayNav"
          className={`overlayNav delay-0s  ${
            this.state.isOpen ? 'animated slideInUp' : 'animated slideOutDown'
          }`}>
          <div className="flexLinks">
            <Link
              className={`linkEle ${
                this.state.isOpen ? 'animated fadeInUp faster' : 'hiddenBody'
              }`}
              to="/"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
                this.removeAnims();
              }}>
              <i className="home icon iconEle"></i>
              Home
            </Link>
            <Link
              className={`linkEle ${
                this.state.isOpen ? 'animated fadeInUp faster' : 'hiddenBody'
              }`}
              to="/videos"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
                this.removeAnims();
              }}>
              <i className="video icon iconEle"></i>
              Videos
            </Link>
            <Link
              className={`linkEle ${
                this.state.isOpen ? 'animated fadeInUp faster' : 'hiddenBody'
              }`}
              to="/search"
              onClick={() => {
                this.setState({ isOpen: !this.state.isOpen });
                this.removeAnims();
              }}>
              <i className="search icon iconEle"></i>
              Search
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
