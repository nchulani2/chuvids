import React from 'react';
import FormInput from './FormInput';
import Header from './Header';
import '../styles/Navigational.css';

export default class Navigational extends React.Component {
  state = {
    prevScrollPos: window.pageYOffset,
    scrollClass: 'navigationalEle--hidden',
    visible: true
  };
  handleCallUp = userInput => {
    this.props.handleCall(userInput);
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = e => {
    const { prevScrollPos } = this.state;

    const currScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currScrollPos;

    this.setState({
      prevScrollPos: currScrollPos,
      visible: visible
    });
    if (currScrollPos < 15) {
      this.setState({ visible: true });
    }
    // else if (currScrollPos > document.body.clientHeight) {
    //   this.setState({ visible: false });
    // }
  };
  render() {
    return (
      <div
        className={`navigationalEle ${
          this.state.visible ? '' : this.state.scrollClass
        }`}>
        <Header />

        <FormInput handleCall={this.handleCallUp} />
      </div>
    );
  }
}
