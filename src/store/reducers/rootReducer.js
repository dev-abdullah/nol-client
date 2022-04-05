import { combineReducers } from 'redux';
import stationReducer from './stationReducer';
import userReducer from './userReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
 stationReducer,
 userReducer,
 transactionReducer
});
