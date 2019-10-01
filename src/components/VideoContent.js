import React, { Component } from 'react';
import Youtube from 'react-youtube';
import Linkify from 'linkifyjs/react';
import { connect } from 'react-redux';
import { seeMore } from '../actions';
import '../styles/VideoContent.css';

class VideoContent extends Component {
  // onVidEnd = e => {
  //   setTimeout(() => {
  //     this.props.onEndedVid(e);
  //   }, 3000);
  // };

  onVidReady = e => {
    e.target.playVideo();
  };

  render() {
    const opts = {
      playerVars: {
        autoplay: 1,
        origin: 'http://localhost:3000/'
      }
    };
    const { id, snippet } = this.props.videos.selectedVidState;
    const { seeMore } = this.props.videos;

    return (
      <div className="videoContent">
        <div className="iframeWrapper">
          <Youtube
            videoId={id}
            opts={opts}
            onReady={this.onVidReady}
            // onEnd={this.onVidEnd}
            className="iframer"
          />
        </div>

        <div className="snipCont">
          <div className="snipTitle">{snippet.title}</div>
          <div className="snipDate">
            Date posted: <span>{snippet.publishedAt}</span>
          </div>
          <hr style={{ opacity: '0.1', marginTop: '20px' }} />

          <button className="descButt" onClick={() => this.props.seeMore()}>
            {seeMore ? 'Close ✗' : 'See details'}
          </button>

          <Linkify options={{ target: '_blank' }}>
            <div
              className="descEle"
              style={{
                display: seeMore ? '' : 'none'
                // height:
                //   seeMore
                //     ? document.querySelector('.descEle').scrollHeight
                //     : '0px'
              }}>
              {snippet.description}
            </div>
          </Linkify>
          <hr
            style={{
              marginTop: '30px',
              opacity: '0.5',
              border: '2px solid white'
            }}
          />
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
  { seeMore }
)(VideoContent);
