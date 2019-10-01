import React, { Component } from 'react';
import Title from '../components/Title';
import { videoCategories } from '../export/index';
import { Link } from 'react-router-dom';
import '../styles/pages/Categories.css';

class Categories extends Component {
  // handles box shadow hovers
  handleHovers = (e, videoCategory) => {
    e.preventDefault();

    var cat = document.querySelector(`.cat${videoCategory.id}`);

    if (e.type === 'mouseenter') {
      cat.classList.add('hovered');
      cat.style.boxShadow = `inset 0px -150px 0px ${videoCategory.bg}`;
    } else {
      cat.classList.remove('hovered');
      cat.style.boxShadow = 'none';
    }
  };
  renderCategory = videoCategory => {
    return (
      <Link
        key={videoCategory.id}
        to={`/videos/${videoCategory.title}/${videoCategory.id}`}>
        <div
          className={`category cat${videoCategory.id}`}
          onMouseEnter={e => this.handleHovers(e, videoCategory)}
          onMouseLeave={e => this.handleHovers(e, videoCategory)}>
          <div className="catContent">
            <div style={{ textTransform: 'uppercase' }}>
              {videoCategory.title}
            </div>
            <i
              className={`${videoCategory.icon} icon`}
              style={{ marginTop: '20px' }}></i>
          </div>
        </div>
      </Link>
    );
  };
  render() {
    window.scrollTo(0, 0);
    return (
      <div
        className="sectioning animated fadeIn fast ui container"
        style={{ height: '100%' }}>
        <Title titleText="categories"></Title>
        <div className="catIntro">Select a category</div>
        <Link to="/videos/trending/popular">
          <div className="catExcept">
            No thanks! Show me the latest in trending
          </div>
        </Link>
        <div className="categoriesGrid">
          {videoCategories.items.length !== 0
            ? videoCategories.items.map(videoCategory =>
                this.renderCategory(videoCategory)
              )
            : null}
        </div>
      </div>
    );
  }
}

export default Categories;
