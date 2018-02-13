import { combineReducers } from 'redux';
import {
  USER_REQUEST,
  USER_FAILURE,
  USER_SUCCESS_LOGGED_IN,
  USER_SUCCESS_LOGGED_OUT,
  LOGOUT_SUCCESS,
} from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {};
    case USER_FAILURE:
      return { error: action.error };
    case USER_SUCCESS_LOGGED_IN:
      return { fetched: true, loggedIn: true, user: action.user };
    case USER_SUCCESS_LOGGED_OUT:
      return { fetched: true, loggedIn: false };
    case LOGOUT_SUCCESS:
      return { fetched: true, loggedIn: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
