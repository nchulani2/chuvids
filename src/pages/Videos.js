import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCatVideos, getMoreCatVids } from '../actions';
import Title from '../components/Title';
import Loader from '../components/Loader';
import VideoComp from '../components/VideoComp';
import VideoContent from '../components/VideoContent';
import VideosGrid from '../components/VideosGrid';
import _ from 'lodash';
import '../styles/pages/Videos.css';

class Videos extends Component {
  componentDidMount = () => {
    const { videoCatId } = this.props.match.params;
    this.props.getCatVideos(videoCatId);
    window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  renderVids = video => {
    return <VideoComp videoDet={video} key={video.id}></VideoComp>;
  };

  handleScroll = e => {
    const { videoCatId } = this.props.match.params;

    const { scrolling } = this.props.videos;

    if (scrolling) return;

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
      this.props.getMoreCatVids(videoCatId);
    }
  };

  render() {
    console.log(this.props.videos);
    const { videoCatTitle } = this.props.match.params;
    const { videoState, loading, selectedVidState } = this.props.videos;

    return (
      <div
        className="sectioning animated fadeIn fast ui container"
        style={{ height: '100%' }}>
        <Title titleText={videoCatTitle}></Title>
        <div className="topOfContent">
          {selectedVidState !== null && !_.isEmpty(selectedVidState) ? (
            <VideoContent></VideoContent>
          ) : null}
        </div>
        <div className="videos">
          {videoState.length !== 0 && Array.isArray(videoState) ? (
            <VideosGrid>
              {videoState.map(video => this.renderVids(video))}
            </VideosGrid>
          ) : null}
          {loading ? <Loader></Loader> : null}
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
