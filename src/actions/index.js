import youtube from '../api/youtube';
import { format } from 'date-fns';

const key = {
  youKey: process.env.REACT_APP_YOUTUBE_KEY
};

/* -------------------------------------------------------------------------- */
// LIST VIDEOS START
export const getCatVideos = id => async dispatch => {
  dispatch(scrolling());
  const response = await youtube.get('youtube/v3/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      videoCategoryId: isNaN(id) ? null : id,
      maxResults: '20',
      regionCode: 'US',
      key: key.youKey
    }
  });

  dispatch({
    type: 'GET_CAT_VIDEOS',
    payload: {
      data: response.data.items,
      nextToken: response.data.nextPageToken
    }
  });
};

export const getMoreCatVids = id => async (dispatch, getState) => {
  var { nextVideoToken } = getState().data;
  dispatch(scrolling());
  const response = await youtube.get('youtube/v3/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      videoCategoryId: isNaN(id) ? null : id,
      maxResults: '20',
      regionCode: 'US',
      pageToken: nextVideoToken,
      key: key.youKey
    }
  });

  dispatch({
    type: 'GET_MORE_CAT_VIDEOS',
    payload: {
      data: response.data.items,
      nextToken: response.data.nextPageToken,
      prevToken: response.data.prevPageToken
    }
  });
};
// END LIST VIDEOS
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// START SEARCH VIDEOS
export const searchVids = query => async dispatch => {
  console.log('hit');
};
export const getSelectedVid = id => async (dispatch, getState) => {
  var data = getState().data;

  var selectedVid = data.videoState.filter(video => video.id === id);
  // maniupulate date using date-fns
  var video = selectedVid[0];
  var date = video.snippet.publishedAt.slice(0, 10);

  // checks if user clicked on video before with that specific date
  if (!isNaN(date[0])) {
    var newDate = format(new Date(date), "MMMM do',' yyyy");
    Object.assign(video.snippet, { publishedAt: newDate });
  }

  dispatch({ type: 'GET_SELECT_VID', payload: video });
};

const scrolling = () => dispatch => {
  dispatch({ type: 'SCROLLING' });
};
export const seeMore = () => dispatch => {
  dispatch({ type: 'SEE_MORE' });
};
