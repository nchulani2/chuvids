import React from 'react';
import '../styles/VideoList.css';
import VideoComp from './VideoComp';
import Pagination from './Pagination';

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
        <p className="textEle">
          Number of videos found: <strong>{this.props.totalVids}</strong> videos
        </p>
        <div className="ui stackable two column grid gridEle">
          <div className="nine wide column centeredEle">
            {this.props.children}
          </div>

          <div className="seven wide column" id="scrollOnSubmit">
            <div className="ui unstackable items">
              {this.handleVideos(this.props.videoQuant)}
            </div>
            <Pagination
              handleBack={this.props.handleGoBack}
              handleForward={this.props.handleGoForward}
            />
          </div>
        </div>
      </div>
    );
  }
}
