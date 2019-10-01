import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCatVideos, getMoreCatVids } from '../actions';
import Title from '../components/Title';
import Loader from '../components/Loader';
import VideoComp from '../components/VideoComp';
import VideoContent from '../components/VideoContent';
import _ from 'lodash';
import '../styles/pages/Videos.css';

class Videos extends Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    const { videoCatId } = this.props.match.params;
    this.props.getCatVideos(videoCatId);
  };
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  renderVids = video => {
    return <VideoComp videoDet={video} key={video.id}></VideoComp>;
  };

  handleScroll = e => {
    // const { scrolling } = this.props.imageState;

    // if (scrolling) return;

    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    let scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight - 100;
    if (scrolledToBottom) {
      this.props.getMoreCatVids();
    }
  };

  render() {
    const { videoCatTitle } = this.props.match.params;
    const { videoState, loading, selectedVidState } = this.props.videos;

    return (
      <div
        className="sectioning animated fadeIn fast ui container"
        style={{ height: loading ? '100vh' : '100%' }}>
        <Title titleText={videoCatTitle}></Title>
        <div className="topOfContent">
          {selectedVidState !== null && !_.isEmpty(selectedVidState) ? (
            <VideoContent></VideoContent>
          ) : null}
        </div>
        <div className="videos">
          {videoState.length !== 0 && Array.isArray(videoState) && !loading ? (
            <div className="videosGrid">
              {videoState.map(video => this.renderVids(video))}
            </div>
          ) : (
            <Loader></Loader>
          )}
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
  { getCatVideos, getMoreCatVids }
)(Videos);
