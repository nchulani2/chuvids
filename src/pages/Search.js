import React, { Component } from 'react';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import VideosGrid from '../components/VideosGrid';
import VideoComp from '../components/VideoComp';
import Loader from '../components/Loader';
import _ from 'lodash';
import VideoContent from '../components/VideoContent';
import { connect } from 'react-redux';
import { reset, searchVids, searchMoreVids } from '../actions';

class Search extends Component {
  componentDidMount = () => {
    this.props.reset();
    window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };
  handleScroll = e => {
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
      this.props.searchMoreVids();
    }
  };
  renderVids = video => {
    return <VideoComp videoDet={video} key={video.id}></VideoComp>;
  };
  render() {
    const { videoState, loading, selectedVidState } = this.props.videos;
    // console.log(videoState);
    return (
      <div
        className="sectioning animated fadeIn fast ui container"
        style={{ height: '100%' }}>
        <Title titleText="search"></Title>
        <FormInput></FormInput>
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
  { searchVids, reset, searchMoreVids }
)(Search);
