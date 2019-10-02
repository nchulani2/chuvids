import React from 'react';
import '../styles/VideosGrid.css';

const VideosGrid = props => {
  return <div className="videosGrid">{props.children}</div>;
};

export default VideosGrid;
