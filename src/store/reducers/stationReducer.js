const initialState = {
  stations: [],
  message:''
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATIONS':
      return { ...state, stations: action.payload }

    case 'MESSAGE':
      return { ...state, message: action.payload }

    default:
      return state;
  }
};

export default appReducer;
