import React from 'react';
import youtube from './api/youtube';
import Navigational from './components/Navigational';
import VideoList from './components/VideoList';
import VideoContent from './components/VideoContent';

const apiKey = {
  youKey: process.env.REACT_APP_YOUTUBE_KEY
};

export default class App extends React.Component {
  state = {
    userInp: '',
    videos: [],
    nextPage: '',
    prevPage: '',
    totalVideos: 0,
    // channels isn't actually rendered, it's just there
    channels: [],
    // default video
    specVidId: '',
    specVidTitle: '',
    specVidDesc: ''
  };
  // HANDLES CLICKING A VIDEO
  handleSpecificVid = async (id, title) => {
    try {
      const vidResponse = await youtube.get(`youtube/v3/videos`, {
        params: {
          part: 'snippet',
          id: id,
          key: apiKey.youKey
        }
      });
      this.setState({
        specVidId: id,
        specVidTitle: title,
        specVidDesc: vidResponse.data.items[0].snippet.description
      });
    } catch (err) {
      alert(err);
    }
  };

  // HANDLES NEXT VIDEO AFTER PLAYING
  handleNextVid = async e => {
    var vidData = e.target.getVideoData();

    // get the next vid ID
    var vidId;
    var vidTitle;
    for (let index = 0; index < this.state.videos.length - 1; index++) {
      if (this.state.videos[index].id.videoId === vidData.video_id) {
        vidId = this.state.videos[index + 1].id.videoId;
        vidTitle = this.state.videos[index + 1].snippet.title;
      }
    }
    // Make a req to get that next vid's description
    this.handleSpecificVid(vidId, vidTitle);
  };

  // INITIAL LOAD & HANDLES SEARCH INPUT
  handleApiCall = async userInput => {
    if (userInput === this.state.userInp) return;

    try {
      const response = await youtube.get(`youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: userInput,
          key: apiKey.youKey
        }
      });

      // filter channels from vids
      const vidArray = [];
      const channels = [];
      response.data.items.forEach(element => {
        if (element.id.videoId) {
          vidArray.push(element);
        } else {
          channels.push(element);
        }
      });

      this.setState({
        videos: vidArray,
        channels: channels,
        totalVideos: response.data.pageInfo.totalResults,
        nextPage: response.data.nextPageToken,
        userInp: userInput
      });
    } catch (err) {
      alert(err);
    }
  };

  // initial call to api for default vids to be rendered
  componentDidMount = () => {
    this.handleApiCall('whale call saib');
    this.handleSpecificVid('IR6BaxRbzU4', 'saib - Whale Call');
  };

  render() {
    return (
      <div className="app animated fadeIn slow delay-0s ">
        <Navigational
          handleCall={this.handleApiCall}
          totalCount={this.state.totalVideos}
        />
        <div className="ui container">
          <VideoList
            handleGoBack={this.goBack}
            handleGoForward={this.goForward}
            videoQuant={this.state.videos}
            totalVids={this.state.totalVideos}
            onSelectVid={this.handleSpecificVid}>
            <VideoContent
              theVidId={this.state.specVidId}
              theVidTitle={this.state.specVidTitle}
              theVidDesc={this.state.specVidDesc}
              onEndedVid={this.handleNextVid}
            />
          </VideoList>
        </div>
      </div>
    );
  }
}
