import axios from 'axios';
import { LOADING_USER, SIGN_IN_SUCCESS, SIGN_IN_ERRORS, SIGN_IN_FAILURES } from '../action-types/user';

export const signinUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOADING_USER })

  const body = JSON.stringify({ email, password })

  axios.post('/api/v1/login', body, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(resp => {
    let data = resp.data
    if (data.failure) {
      alert(data.failure)
    }

    if (data.user !== undefined) {
      localStorage.setItem("token", data.jwt)
      alert(data.success)
      return dispatch({ type: SIGN_IN_SUCCESS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: SIGN_IN_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable to SignIn At This Time")
    return dispatch({ type: SIGN_IN_FAILURES, payload: err })
  })
}
