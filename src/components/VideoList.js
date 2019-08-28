import React from 'react';
import '../styles/VideoList.css';
import VideoComp from './VideoComp';

export default class VideoList extends React.Component {
  // NOTE IMPORTANT
  // NEVER PUT A BRACKET WHEN DOING A MAP FUNCTION CALL, IT WILL CRASH THE RETURNS
  //NOTE IMPORTANT
  handleVideos = videos =>
    videos.map(video => {
      if (videos) {
        return (
          // return vids
          <VideoComp
            key={video.etag}
            videoDet={video}
            onVidSelect={this.props.onSelectVid}
          />
        );
      }
      return <div>No results</div>;
    });

  render() {
    return (
      <div className="videoList">
        <div className="ui stackable two column grid gridEle">
          <div className="nine wide column centeredEle">
            {this.props.children}
          </div>

          <div className="seven wide column" id="scrollOnSubmit">
            <div className="ui unstackable items">
              {this.handleVideos(this.props.videoQuant)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
