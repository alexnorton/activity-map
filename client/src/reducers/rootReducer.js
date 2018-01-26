import { combineReducers } from 'redux';
import {
  INCREMENT,
  USER_REQUEST,
  USER_FAILURE,
  USER_SUCCESS_LOGGED_IN,
  USER_SUCCESS_LOGGED_OUT,
} from '../actions';

const test = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { isFetching: true };
    case USER_FAILURE:
      return { isFetching: false, error: action.error };
    case USER_SUCCESS_LOGGED_IN:
      return { isFetching: false, loggedIn: true, user: action.user };
    case USER_SUCCESS_LOGGED_OUT:
      return { isFetching: false, loggedIn: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  test,
  user,
});

export default rootReducer;
