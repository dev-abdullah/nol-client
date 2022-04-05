import {
  LOADING_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_ERRORS,
  POST_TRANSACTION_FAILURE,
  POST_SWIPE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS
} from '../action-types/transaction';

const initialState = {
  transactions: [],
  isLoading: false,
  creditTransaction: {},
  debitTransaction: {},
  errors: [],
  error: ''
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TRANSACTION:
      return {...state, isLoading: true}

    case POST_TRANSACTION_SUCCESS:
      const transaction = action.payload.transaction
      return {...state, isLoading: false, creditTransaction: transaction}

    case POST_TRANSACTION_ERRORS:
      return {...state, isLoading: false, errors: action.payload.errors}

    case POST_TRANSACTION_FAILURE:
      return {...state, isLoading: false, error: action.payload}

    case POST_SWIPE_TRANSACTION_SUCCESS:
      return {...state, isLoading: false, debitTransaction: action.payload}

    case GET_TRANSACTIONS:
      return {...state, isLoading: false, transactions: action.payload}

    default:
      return state;
  }
};

export default appReducer;
