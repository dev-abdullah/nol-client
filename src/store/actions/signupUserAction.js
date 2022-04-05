import axios from 'axios';
import { LOADING_USER, POST_USER_SUCCESS, POST_USER_ERRORS, POST_USER_FAILURE } from '../action-types/user';

export const signupUser = ({ first_name, last_name, email, password }) => (dispatch) => {
  dispatch({ type: LOADING_USER })

  const body = JSON.stringify({
    user: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
  })

  axios.post('http://localhost:3001/api/v1/users', body, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(resp => {
    let data = resp.data
    if (data.user !== undefined) {
      localStorage.setItem("token", data.jwt)
      alert("Successfully Signed Up")
      return dispatch({ type: POST_USER_SUCCESS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: POST_USER_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable to SignUp At This Time")
    return dispatch({ type: POST_USER_FAILURE, payload: err })
  })
}
