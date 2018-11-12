import { apiRequest } from '../helpers/api';

export const FIND_ACTIVITIES_PAGE_REQUEST = 'FIND_ACTIVITIES_PAGE_REQUEST';
export const FIND_ACTIVITIES_PAGE_SUCCESS = 'FIND_ACTIVITIES_PAGE_SUCCESS';
const fetchActivityIdsPage = (after, page = 1, activityIds = []) => (dispatch) => {
  dispatch({ type: FIND_ACTIVITIES_PAGE_REQUEST, page });
  return apiRequest(`activities/strava?page=${page}`)
    .then(response => response.json())
    .then((newActivityIds) => {
      if (newActivityIds.length > 0) {
        const allActivityIds = [...activityIds, ...newActivityIds];

        dispatch({ type: FIND_ACTIVITIES_PAGE_SUCCESS, page, count: allActivityIds.length });
        return dispatch(fetchActivityIdsPage(after, page + 1, allActivityIds));
      }

      return activityIds;
    });
};

export const FIND_ACTIVITIES_START = 'FIND_ACTIVITIES_START';
export const FIND_ACTIVITIES_FINISH = 'FIND_ACTIVITIES_FINISH';
const fetchActivityIds = after => (dispatch) => {
  dispatch({ type: FIND_ACTIVITIES_START });
  return dispatch(fetchActivityIdsPage(after)).then((activityIds) => {
    dispatch({ type: FIND_ACTIVITIES_FINISH, count: activityIds.length });
    return activityIds;
  });
};

export const updateActivity = activityId => apiRequest(`activities/${activityId}`).then(response => response.json());

export const UPDATE_ACTIVITIES_START = 'UPDATE_ACTIVITIES_START';
export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITIES_FINISH = 'UPDATE_ACTIVITIES_FINISH';
const updateActivities = activityIds => (dispatch) => {
  dispatch({ type: UPDATE_ACTIVITIES_START, total: activityIds.length });
  return activityIds
    .reduce(
      (chain, activityId, index) => chain.then(() => {
        dispatch({ type: UPDATE_ACTIVITY_REQUEST, index });
        return updateActivity(activityId).then(({ json: { name } }) => dispatch({ type: UPDATE_ACTIVITY_SUCCESS, index, name }));
      }),
      Promise.resolve(),
    )
    .then(() => {
      dispatch({ type: UPDATE_ACTIVITIES_FINISH });
    });
};

export const findAndUpdateActivities = after => dispatch => dispatch(fetchActivityIds(after)).then(ids => dispatch(updateActivities(ids)));
