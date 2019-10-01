const initialState = {
  videoState: [],
  selectedVidState: '',
  videoToken: null,
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
        videoToken: action.payload.token,
        seeMore: false,
        loading: false
      };
    case 'GET_MORE_CAT_VIDEOS':
      return;
    case 'GET_SELECT_VID':
      return {
        ...state,
        selectedVidState: action.payload,
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
        scrolling: true
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
