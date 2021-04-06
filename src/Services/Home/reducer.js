import {
  GET_DATA,
  SORT_DATA,
  MORE_DATA,
  GET_GENRE,
  GET_LANGUAGE,
} from './constant';

const initialState = {
  data: [],
  genre: {},
  language: [],
  currentPage: null,
  totalPage: null,
};

export default function Content(state = initialState, action) {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...state,
        data: action.payload.results,
        currentPage: action.payload.page,
        totalPage: action.payload.totalpages,
      };
    }

    case SORT_DATA: {
      return {
        ...state,
        data: action.payload.results,
        currentPage: action.payload.page,
        totalPage: action.payload.totalpages,
      };
    }

    case MORE_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.payload.results],
        currentPage: action.payload.page,
        totalPage: action.payload.totalpages,
      };
    }
    case GET_GENRE: {
      const genreList = action.payload.genres.reduce((acc, content) => {
        const {id, name} = content;
        acc = {...acc, [id]: name};
        return acc;
      }, {});
      return {...state, genre: genreList};
    }
    case GET_LANGUAGE:
      return {...state, language: action.payload};

    default:
      return state;
  }
}
