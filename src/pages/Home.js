import React from 'react';
import Title from '../components/Title';
import Particles from 'react-particles-js';
import '../styles/pages/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="sectioning animated fadeIn fast">
      <Title titleText="chuvids"></Title>
      <div className="aboutCont">
        <div style={{ paddingBottom: '20px' }}>
          Chuvids is a React and Redux built video search engine. All videos
          available come directly from the Youtube API.
        </div>
        <Link to="/videos">
          <button type="submit" className="homeButton">
            View categories
          </button>
        </Link>
      </div>
      <div className="canvasEle">
        <Particles
          className="particleCanv"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: false
                }
              },
              color: {
                value: ['#119e97']
              },
              shape: {
                stroke: {
                  width: 0,
                  color: '#000'
                },
                polygon: {
                  nb_sides: 6
                },
                type: 'polygon'
              },

              size: {
                value: 20,
                random: true,
                anim: {
                  enable: false
                }
              },
              opacity: {
                value: 0.1,
                random: true,
                anim: {
                  enable: false
                }
              },

              line_linked: {
                enable: false
              },
              move: {
                random: true,
                speed: 2,
                direction: 'top',
                out_mode: 'out'
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'bubble'
                }
              },
              modes: {
                bubble: {
                  distance: 150,
                  duration: 2,
                  size: 10,
                  opacity: 1
                }
              }
            },
            retina_detect: true
          }}
        />
      </div>
    </div>
  );
};

export default Home;
