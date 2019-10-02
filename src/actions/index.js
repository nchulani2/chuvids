import youtube from '../api/youtube';
import { format } from 'date-fns';
import _ from 'lodash';

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
      nextToken: response.data.nextPageToken
    }
  });
};
// END LIST VIDEOS
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// START SEARCH VIDEOS
const filterChannels = response => {
  const videosArr = [];
  response.data.items.forEach(item => {
    if (_.has(item.id, 'videoId')) {
      Object.assign(item, { id: item.id.videoId });
      videosArr.push(item);
    }
  });
  return videosArr;
};

export const searchVids = query => async (dispatch, getState) => {
  const data = getState().data;
  if (query === undefined || query === data.query) return;

  dispatch(scrolling());

  const response = await youtube.get('youtube/v3/search', {
    params: {
      part: 'snippet',
      q: query,
      maxResults: '20',
      regionCode: 'US',
      key: key.youKey
    }
  });

  // need to filter videos from the channels
  const videos = filterChannels(response);

  dispatch({
    type: 'SEARCH_VIDS',
    payload: {
      data: videos,
      userQ: query,
      nextToken: response.data.nextPageToken
    }
  });
};

export const searchMoreVids = () => async (dispatch, getState) => {
  var data = getState().data;
  const query = data.query;
  if (_.isEmpty(data.videoState)) return;
  dispatch(scrolling());
  const response = await youtube.get('youtube/v3/search', {
    params: {
      part: 'snippet',
      q: query,
      maxResults: '20',
      regionCode: 'US',
      pageToken: data.nextVideoToken,
      key: key.youKey
    }
  });
  // FILTER CHANNELS/PLAYLISTS FROM VIDEOS
  const videos = filterChannels(response);

  dispatch({
    type: 'SEARCH_MORE_VIDS',
    payload: {
      data: videos,
      nextToken: response.data.nextPageToken
    }
  });
};
// END SEARCH VIDEOS
/* -------------------------------------------------------------------------- */

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
export const reset = () => dispatch => {
  dispatch({ type: 'RESET' });
};
export const seeMore = () => dispatch => {
  dispatch({ type: 'SEE_MORE' });
};
