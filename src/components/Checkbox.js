import React from 'react';
import '../styles/Checkbox.css';

const handleMode = e => {
  e.persist();
  // get body color
  const bodyCol = window
    .getComputedStyle(document.body, null)
    .getPropertyValue('background-color');
  // get body Element
  const bodyEle = document.body;
  // we need to change the color of every text on page background change also
  const logoTopText = document.querySelector('.logoTop .logoTopText');
  const mouseCont = document.querySelector('.mouseContainer .mouse');
  const mouseScroll = document.querySelector(
    '.mouseContainer .mouse .scroll-down'
  );
  const vidCont = document.querySelector('.videoContent');
  const vidItemsHead = document.querySelectorAll(
    '.videoComp .content #headerEle'
  );
  const vidItemsDesc = document.querySelectorAll(
    '.videoComp .content #descEle'
  );

  // if background is dark
  if (bodyCol === 'rgb(0, 0, 0)') {
    bodyEle.style.background = 'rgba(0, 0, 0, 0.1)';
    logoTopText.style.color = 'black';
    mouseCont.style.borderColor = '#000';
    mouseScroll.style.background = '#000';
    vidCont.style.color = 'black';
    vidItemsDesc.forEach(description => {
      description.style.color = 'rgba(0, 0, 0, 0.6)';
    });
    vidItemsHead.forEach(head => {
      head.style.color = 'black';
    });
  } else if (bodyCol === 'rgba(0, 0, 0, 0.1)') {
    bodyEle.style.background = 'rgb(0, 0, 0)';
    logoTopText.style.color = 'white';
    mouseCont.style.borderColor = '#fff';
    mouseScroll.style.background = '#fff';
    vidCont.style.color = 'white';
    vidItemsDesc.forEach(description => {
      description.style.color = 'rgba(255, 255, 255, 0.6)';
    });
    vidItemsHead.forEach(head => {
      head.style.color = 'white';
    });
  }
  return;
};

const Checkbox = () => {
  return (
    <div className="checky">
      <label onClick={handleMode}>
        <input type="checkbox" />
        <span onClick={handleMode} className="check" />
      </label>
    </div>
  );
};

export default Checkbox;
