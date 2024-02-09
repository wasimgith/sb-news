import axios from 'axios';

export const fetchNewslist = (bool) => {
  return {
      type: 'FETCH_NEWS_LIST',
      isLoading: bool
  };
};

export const fetchNewsSuccess = (list) => {
  return {
      type: 'FETCH_NEWS_SUCCESS',
      data: list
  };
};

export const fetchNewsFailure = () => {
  return {
      type: 'FETCH_NEWS_FAILURE'
  };
};
const ROOT_URL = `https://hn.algolia.com/api/v1/search?page=`;

export function fetchNews(page) {
  const url = `${ROOT_URL}${page}`;
  return (dispatch) => {
      dispatch(fetchNewslist(true));
      axios.get(url)
          .then((res) => {
            console.log(res);
            dispatch(fetchNewsSuccess(res.data))
          })
          .catch(() => dispatch(fetchNewsFailure()));
  };
}

export const updateUpvote = (e, id) => {
  return {
    type: 'INCREMENT_UPVOTE',
    id: id
  }
}

export const onHideTap = (id) => {
  return {
    type: 'HIDE_NEWS',
    id: id
  }
}