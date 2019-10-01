const initialState = {
  videoState: [],
  selectedVidState: '',
  nextVideoToken: null,
  prevVideoToken: null,
  loading: false,
  seeMore: false,
  scrolling: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CAT_VIDEOS':
      return {
        ...state,
        selectedVidState: '',
        videoState: action.payload.data,
        nextVideoToken: action.payload.nextToken,
        seeMore: false,
        loading: false,
        scrolling: false
      };
    case 'GET_MORE_CAT_VIDEOS':
      return {
        ...state,
        videoState: [...state.videoState, ...action.payload.data],
        nextVideoToken: action.payload.nextToken,
        loading: false,
        scrolling: false
      };
    case 'SEARCH_VIDS':
      return;
    case 'GET_SELECT_VID':
      return {
        ...state,
        selectedVidState: action.payload,
        scrolling: false,
        loading: false,
        seeMore: false
      };
    case 'SEE_MORE':
      return {
        ...state,
        seeMore: !state.seeMore
      };
    case 'SCROLLING':
      return {
        ...state,
        loading: true,
        scrolling: true
      };

    default:
      return state;
  }
};
