import axios from 'axios';
import { LOADING_USER, GET_USER_SUCCESS, GET_USER_ERRORS, GET_USER_FAILURE } from '../action-types/user';

export const getUser = (token) => (dispatch) => {
  dispatch({ type:LOADING_USER })

  axios.post('http://localhost:3001/api/v1/auto_login', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(resp => {
    let data = resp.data
    if (data.user.id !== undefined) {
      return dispatch({ type: GET_USER_SUCCESS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: GET_USER_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable To Veryify User At This Time")
    return dispatch({ type: GET_USER_FAILURE, payload: err })
  })
}

export const signout = () => (dispatch) => {
  localStorage.removeItem("token")
  return dispatch({ type: GET_USER_SUCCESS, payload: {} })
}
