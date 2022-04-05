import axios from 'axios';

export function getStations() {
  return (dispatch) => {

    axios.get('http://localhost:3001/api/v1/stations')
    .then(response => {
      if (response.data) {
        dispatch({
          type   : 'SET_STATIONS',
          payload: response.data
        })
      }
   })
   .catch(error => console.log(error))
  }
}

export function home() {
  return (dispatch) => {

    axios.get('http://localhost:3001/home')
    .then(response => {
      dispatch({
        type   : 'MESSAGE',
        payload: response.data.message
      })
   })
   .catch(error => console.log(error))
  }
}
