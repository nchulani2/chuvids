import React from 'react';
import '../styles/VideoComp.css';

const options = {
  top: 0,
  left: 0,
  behavior: 'smooth'
};

export default class VideoComp extends React.Component {
  handleVideoClick = e => {
    e.preventDefault();

    const { id, snippet } = this.props.videoDet;
    const idValue = id.videoId;
    const titleValue = snippet.title;

    window.scrollTo(options);
    this.props.onVidSelect(idValue, titleValue);
  };

  checkSnippetLength = snippet => {
    var lessThanForty;
    var moreThanForty;

    if (snippet.title.length < 40) {
      lessThanForty = snippet.title;
      return lessThanForty;
    } else {
      moreThanForty = snippet.title.substring(0, 40) + '...';
      return moreThanForty;
    }
  };

  render() {
    const { snippet } = this.props.videoDet;

    return (
      <div className="item videoComp" onClick={this.handleVideoClick}>
        <div className="image">
          <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
        </div>
        <div className="content">
          <div
            className="header"
            id="headerEle"
            style={
              window
                .getComputedStyle(document.body, null)
                .getPropertyValue('background-color') === 'rgb(0, 0, 0)'
                ? { color: 'white' }
                : { color: 'black' }
            }>
            {this.checkSnippetLength(snippet)}
          </div>
          <div className="description">
            <p
              id="descEle"
              style={
                window
                  .getComputedStyle(document.body, null)
                  .getPropertyValue('background-color') === 'rgb(0, 0, 0)'
                  ? { color: 'rgba(255, 255, 255, 0.6)' }
                  : { color: 'rgba(0, 0, 0, 0.6)' }
              }>
              {snippet.channelTitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
