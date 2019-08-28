import React from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import '../styles/VideoComp.css';

export default class VideoComp extends React.Component {
  handleVideoClick = e => {
    const { id, snippet } = this.props.videoDet;
    const idValue = id.videoId;
    const titleValue = snippet.title;
    const topOfPage = document.querySelector('.videoList');
    console.log(topOfPage);
    scrollIntoView(topOfPage, {
      scrollMode: 'always',
      block: 'start',
      inline: 'nearest',
      duration: window.innerWidth > 499 ? 800 : 2500,
      ease: t =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    });
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
