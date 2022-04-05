import axios from 'axios';
import {
  LOADING_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_ERRORS,
  POST_TRANSACTION_FAILURE,
  POST_SWIPE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS
} from '../action-types/transaction';

export const depositTransaction = ({ deposit_amount, card_id }) => (dispatch) => {
  dispatch({ type: LOADING_TRANSACTION })

  const body = JSON.stringify({
    deposit_amount: deposit_amount,
    card_id: card_id
  })

  axios.post('/api/v1/transactions', body, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(resp => {
    let data = resp.data
    if (data.transaction.id !== undefined) {
      alert("Successfully Deposit amount")
      return dispatch({ type: POST_TRANSACTION_SUCCESS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: POST_TRANSACTION_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable to deposit At This Time")
    return dispatch({ type: POST_TRANSACTION_FAILURE, payload: err })
  })
}

export const withdrawTransaction = ({medium, station_from, station_to, card_id}) => (dispatch) => {
  dispatch({ type: LOADING_TRANSACTION })

  const body = JSON.stringify({
    medium: medium,
    station_from: station_from,
    station_to: station_to,
    card_id: card_id
  })

  axios.post('/api/v1/transactions', body, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(resp => {
    let data = resp.data
    if (data.transaction.id !== undefined) {
      alert("Successfully swipe amount")
      return dispatch({ type: POST_SWIPE_TRANSACTION_SUCCESS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: POST_TRANSACTION_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable to swipe At This Time")
    return dispatch({ type: POST_TRANSACTION_FAILURE, payload: err })
  })
}

export const getTransactions = (card_id) => (dispatch) => {
  const body = JSON.stringify({ card_id: card_id })

  axios.get(`/api/v1/transactions?card_id=${card_id}`)
  .then(resp => {
    let data = resp.data
    if (data.length > 0) {
      return dispatch({ type: GET_TRANSACTIONS, payload: data })
    } else {
      alert(data.errors.map(error => error))
      return dispatch({ type: POST_TRANSACTION_ERRORS, payload: data })
    }
  })
  .catch(err => {
    alert("Unable to get transactions At This Time")
    return dispatch({ type: POST_TRANSACTION_FAILURE, payload: err })
  })
}
