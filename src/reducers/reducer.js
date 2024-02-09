const INITIAL_STATE = {
    news: {},
    upvote: {},
    hide: {}
}

export default function newsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
      case 'FETCH_NEWS_SUCCESS':
          return {
              ...state,
              news: action.data
          }
      case 'INCREMENT_UPVOTE':
          let upvoteObj = state.upvote;
          if (!upvoteObj) {
            upvoteObj = {}
          }
          if (upvoteObj[action.id]) {
            upvoteObj[action.id] += 1;
          } else {
            upvoteObj[action.id] = 1;
          }

          return {
              ...state,
              upvote: upvoteObj 
          }
      case 'HIDE_NEWS':
        let hideobj = state.hide;
        if (!hideobj) {
          hideobj = {}
        }
        hideobj[action.id] = true;

        return {
          ...state,
          hide: hideobj
        }
      default:
          return state;
  }
}