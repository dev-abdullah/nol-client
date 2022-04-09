import {
  LOADING_USER,
  POST_USER_SUCCESS,
  POST_USER_ERRORS,
  POST_USER_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERRORS,
  SIGN_IN_FAILURES,
  GET_USER_SUCCESS,
  GET_USER_ERRORS,
  GET_USER_FAILURE,
  SET_USER_CARD
} from '../action-types/user';

const initialState = {
  isLoading: false,
  error: "",
  errors: [],
  user: {},
  card: {},
  loggedIn: false
};

const userReducer = ( state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {...state, isLoading: true}

    case POST_USER_SUCCESS:
      const user = action.payload.user
      return {...state, isLoading: false, user: user, loggedIn: true}

    case POST_USER_ERRORS:
      return {...state, isLoading: false, errors: action.payload.errors}

    case POST_USER_FAILURE:
      return {...state, isLoading: false, error: action.payload}

    case SIGN_IN_SUCCESS:
      const signinUser = action.payload.user
      const userCard = action.payload.card
      return {...state, isLoading: false, user: signinUser, card: userCard, loggedIn: true}

    case SIGN_IN_ERRORS:
      return {...state, isLoading: false, errors: action.payload.errors}

    case SIGN_IN_FAILURES:
      return {...state, isLoading: false, error: action.payload}

    case GET_USER_SUCCESS:
      const autoUser = action.payload.user
      const withCard = action.payload.card
      return {...state, isLoading: false, user: autoUser, card: withCard, loggedIn: true}

    case GET_USER_ERRORS:
      return {...state, isLoading: false, errors: action.payload.errors}

    case GET_USER_FAILURE:
      return {...state, isLoading: false, error: action.payload}

    case SET_USER_CARD:
      return {...state, card: action.payload}

    default:
      return state
  }
}

export default userReducer;
