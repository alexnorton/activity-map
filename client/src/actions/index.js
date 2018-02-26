import { apiRequest } from '../helpers/api';

// User

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({
  type: USER_REQUEST,
});

export const USER_FAILURE = 'USER_FAILURE';
export const userFailure = error => ({
  type: USER_FAILURE,
  error,
});

export const USER_SUCCESS_LOGGED_IN = 'USER_SUCCESS_LOGGED_IN';
export const userSuccessLoggedIn = user => ({
  type: USER_SUCCESS_LOGGED_IN,
  user,
});

export const USER_SUCCESS_LOGGED_OUT = 'USER_SUCCESS_LOGGED_OUT';
export const userSuccessLoggedOut = () => ({
  type: USER_SUCCESS_LOGGED_OUT,
});

export const fetchUser = () => (dispatch) => {
  dispatch(userRequest());
  return apiRequest('user').then(
    (response) => {
      if (response.status === 401) {
        return dispatch(userSuccessLoggedOut());
      }
      if (!response.ok) {
        return dispatch(userFailure(response.status));
      }
      return response
        .json()
        .then(
          user => dispatch(userSuccessLoggedIn(user)),
          error => dispatch(userFailure(error.toString())),
        );
    },
    error => dispatch(userFailure(error.toString())),
  );
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

export const logout = () => (dispatch) => {
  dispatch(logoutRequest());
  return apiRequest('user/logout').then(
    (response) => {
      if (!response.ok) {
        return dispatch(logoutFailure(response.status));
      }
      return dispatch(logoutSuccess());
    },
    error => dispatch(logoutFailure(error.toString())),
  );
};

// Activities

export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';
export const updateActivities = activities => ({
  type: UPDATE_ACTIVITIES,
  activities,
});

export const fetchActivities = () => dispatch =>
  apiRequest('activities')
    .then(response => response.json())
    .then(activitiesArray =>
      Object.assign({}, ...activitiesArray.map(({ id, json }) => ({ [id]: json }))))
    .then(activities => dispatch(updateActivities(activities)));
