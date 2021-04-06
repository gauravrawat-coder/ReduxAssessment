import {
  GET_DATA,
  SORT_DATA,
  MORE_DATA,
  GET_GENRE,
  GET_LANGUAGE,
} from './constant';
const API_KEY = '08e2dff9a1f38e8f8e4ca4e25b4f6514';
export const getData = () => async (dispatch) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
  );
  const response = await data.json();
  dispatch({
    type: GET_DATA,
    payload: response,
  });
};

export const sortData = (sortBy) => async (dispatch) => {
  let sortValue = 'popularity.desc';
  switch (sortBy) {
    case 'Releases': {
      sortValue = 'release_date.asc';
      break;
    }
    case 'Old':
      sortValue = 'release_date.desc';
      break;
    case 'Most popular':
      sortValue = 'popularity.desc';
      break;
    case 'Less popular':
      sortValue = 'popularity.asc';
      break;
    case 'Higher revenue':
      sortValue = 'revenue.desc';
      break;
    case 'Lowest revenue':
      sortValue = 'revenue.asc';
  }

  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortValue}`,
  );
  const response = await data.json();
  dispatch({
    type: SORT_DATA,
    payload: response,
  });
};

export const updateData = (pageNo, sortBy) => async (dispatch) => {
  let sortValue = 'popularity.desc';
  switch (sortBy) {
    case 'Releases': {
      sortValue = 'release_date.asc';
      break;
    }
    case 'Old':
      sortValue = 'release_date.desc';
      break;
    case 'Most popular':
      sortValue = 'popularity.desc';
      break;
    case 'Less popular':
      sortValue = 'popularity.asc';
      break;
    case 'Higher revenue':
      sortValue = 'revenue.desc';
      break;
    case 'Lowest revenue':
      sortValue = 'revenue.asc';
  }

  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortValue}&page=${pageNo}`,
  );
  const response = await data.json();
  dispatch({
    type: MORE_DATA,
    payload: response,
  });
};

export const getGenre = () => async (dispatch) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
    `,
  );
  const response = await data.json();
  dispatch({
    type: GET_GENRE,
    payload: response,
  });
};

export const getLanguage = () => async (dispatch) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`,
  );
  const response = await data.json();
  dispatch({
    type: GET_LANGUAGE,
    payload: response,
  });
};
