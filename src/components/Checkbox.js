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
  const text = document.querySelector('.textEle');
  const vidCont = document.querySelector('.videoContent');
  const vidItemsHead = document.querySelectorAll(
    '.videoComp .content #headerEle'
  );
  const vidItemsDesc = document.querySelectorAll(
    '.videoComp .content #descEle'
  );
  const pagiLeft = document.querySelectorAll('.pagination .buttonParOne');
  const pagiIconLeft = document.querySelectorAll('.pagination .buttonParOne i');
  const pagiRight = document.querySelectorAll('.pagination .buttonParTwo');
  const pagiIconRight = document.querySelectorAll(
    '.pagination .buttonParTwo i'
  );

  // if background is dark
  if (bodyCol === 'rgb(0, 0, 0)') {
    bodyEle.style.background = 'rgb(250, 235, 215)';
    text.style.color = 'black';
    vidCont.style.color = 'black';
    pagiLeft[0].style.backgroundColor = 'grey';
    pagiIconLeft[0].style.color = 'white';
    pagiRight[0].style.backgroundColor = 'grey';
    pagiIconRight[0].style.color = 'white';
    for (let index = 0; index < vidItemsHead.length; index++) {
      // since title and description will have similar array lengths
      vidItemsHead[index].style.color = 'black';
      vidItemsDesc[index].style.color = 'rgba(0, 0, 0, 0.6)';
    }
  } else if (bodyCol === 'rgb(250, 235, 215)') {
    bodyEle.style.background = 'rgb(0, 0, 0)';
    text.style.color = 'white';
    vidCont.style.color = 'white';
    pagiLeft[0].style.backgroundColor = '#363636';
    pagiIconLeft[0].style.color = 'white';
    pagiRight[0].style.backgroundColor = '#363636';
    pagiIconRight[0].style.color = 'white';

    for (let index = 0; index < vidItemsHead.length; index++) {
      vidItemsHead[index].style.color = 'white';
      vidItemsDesc[index].style.color = 'rgba(255, 255, 255, 0.6)';
    }
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
