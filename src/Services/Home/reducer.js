import {GET_DATA, SET_DATA, UPDATE_DATA, DELETE_DATA} from './constant';

const initialState = {
  data: [],
};

export default function Content(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {data: action.payload};
    case DELETE_DATA: {
      return {data: state.data.filter((data) => data.id !== action.payload)};
    }
    case SET_DATA: {
      return {...state, data: [...state.data, action.payload]};
    }
    case UPDATE_DATA: {
      return {
        ...state,
        data: state.data.map((content) =>
          content.id === action.payload.id ? action.payload : content,
        ),
      };
    }
    default:
      return state;
  }
}
