import {GET_DATA, SET_DATA, UPDATE_DATA, DELETE_DATA} from './constant';

export const getData = () => async (dispatch) => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await data.json();

  dispatch({
    type: GET_DATA,
    payload: response,
  });
};

export const setData = (data) => async (dispatch) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const JSONResponse = await response.json();

  if (response.status === 201) {
    dispatch({
      type: SET_DATA,
      payload: {...data, ...JSONResponse},
    });
  }
};

export const deleteData = (id) => async (dispatch) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  if (data.status === 200) {
    dispatch({
      type: DELETE_DATA,
      payload: id,
    });
  }
};

export const updateData = (data) => async (dispatch) => {
  const {id} = data;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  const JSONResponse = await response.json();
  dispatch({
    type: UPDATE_DATA,
    payload: JSONResponse,
  });
};
