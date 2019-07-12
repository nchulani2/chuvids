import React from 'react';
import Youtube from 'react-youtube';
import '../styles/VideoContent.css';

export default class VideoContent extends React.Component {
  onVidEnd = e => {
    setTimeout(() => {
      this.props.onEndedVid(e);
    }, 3000);
  };

  onVidReady = e => {
    e.target.playVideo();
  };

  render() {
    const opts = {
      playerVars: {
        autoplay: 1,
        origin: 'https://localhost:3000'
      }
    };

    return (
      <div className="videoContent" style={{ position: 'sticky', top: '2rem' }}>
        <div className="iframeWrapper">
          <Youtube
            videoId={this.props.theVidId}
            opts={opts}
            onReady={this.onVidReady}
            onEnd={this.onVidEnd}
            className="iframer"
          />
        </div>

        <div style={{ textAlign: 'left', paddingTop: '20px' }}>
          <h3>{this.props.theVidTitle}</h3>
          <hr style={{ opacity: '0.1' }} />
          <div className="descEle">{this.props.theVidDesc}</div>
        </div>
        <hr style={{ marginTop: '30px', opacity: '0.1' }} />
      </div>
    );
  }
}
