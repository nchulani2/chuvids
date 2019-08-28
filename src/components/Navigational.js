import React from 'react';
import FormInput from './FormInput';
import Checkbox from './Checkbox';
import '../styles/Navigational.css';

export default class Navigational extends React.Component {
  state = {
    prevScrollPos: window.pageYOffset
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
    const visible = currScrollPos > prevScrollPos;
    this.setState({
      prevScrollPos: currScrollPos
    });

    if (visible) {
      document
        .querySelector('.navigationalEle')
        .classList.remove('navigationalEle--hidden');
    } else if (currScrollPos < 15) {
      document
        .querySelector('.navigationalEle')
        .classList.add('navigationalEle--hidden');
    } else {
      document
        .querySelector('.navigationalEle')
        .classList.add('navigationalEle--hidden');
    }
  };

  render() {
    return (
      <div className="navigationalEle navigationalEle--hidden">
        <div className="naviFlex">
          <div className="headerFlex">
            chuvids <Checkbox />
          </div>

          <FormInput handleCall={this.handleCallUp} />
        </div>
      </div>
    );
  }
}
