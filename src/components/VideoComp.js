import React from 'react';
import { connect } from 'react-redux';
import { getSelectedVid } from '../actions';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import '../styles/VideoComp.css';

class VideoComp extends React.Component {
  checkTitleLength = title => {
    var lessThanForty;
    var moreThanForty;

    if (title.length < 30) {
      lessThanForty = title;
      return lessThanForty;
    } else {
      moreThanForty = title.substring(0, 30) + '...';
      return moreThanForty;
    }
  };

  render() {
    const { thumbnails, title, channelTitle } = this.props.videoDet.snippet;
    const { id } = this.props.videoDet;
    // console.log(this.props);
    // check if id matches, do nothing if it does
    var exactId = this.props.videos.selectedVidState.id;
    const top = document.querySelector('.topOfContent');

    return (
      <div
        className="videoComp"
        onClick={() => {
          if (id !== exactId) {
            this.props.getSelectedVid(id);
          }
          scrollIntoView(top, {
            scrollMode: 'always',
            block: 'start'
          });
        }}>
        <div className="ui image">
          <img src={thumbnails.medium.url} alt={title} />
        </div>
        <div className="content">
          <div id="headerEle">{this.checkTitleLength(title)}</div>

          <p id="descEle">{channelTitle}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { videos: state.data };
};

export default connect(
  mapStateToProps,
  { getSelectedVid }
)(VideoComp);
