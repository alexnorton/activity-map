import { apiRequest } from '../helpers/api';

const fetchActivityIdsPage = (after, page = 1, activityIds = []) => (dispatch) => {
  dispatch({ type: 'FIND_ACTIVITIES_PAGE_REQUEST', page });
  return apiRequest(`activities/strava?page=${page}`)
    .then(response => response.json())
    .then((newActivityIds) => {
      if (newActivityIds.length > 0) {
        const allActivityIds = [...activityIds, ...newActivityIds];

        dispatch({ type: 'FIND_ACTIVITIES_PAGE_SUCCESS', page, count: allActivityIds.length });
        return dispatch(fetchActivityIdsPage(after, page + 1, allActivityIds));
      }

      return activityIds;
    });
};

const fetchActivityIds = after => (dispatch) => {
  dispatch({ type: 'FIND_ACTIVITIES_START' });
  return dispatch(fetchActivityIdsPage(after)).then((activityIds) => {
    dispatch({ type: 'FIND_ACTIVITIES_FINISH', count: activityIds.length });
    return activityIds;
  });
};

export const updateActivity = activityId =>
  apiRequest(`activities/${activityId}`).then(response => response.json());

const updateActivities = activityIds => (dispatch) => {
  dispatch({ type: 'UPDATE_ACTIVITIES_START', total: activityIds.length });
  return activityIds
    .reduce(
      (chain, activityId, index) =>
        chain.then(() => {
          dispatch({ type: 'UPDATE_ACTIVITY_REQUEST' });
          return updateActivity(activityId).then(({ json: { name } }) =>
            dispatch({ type: 'UPDATE_ACTIVITY_SUCCESS', index, name }));
        }),
      Promise.resolve(),
    )
    .then(() => {
      dispatch({ type: 'UPDATE_ACTIVITIES_FINISH' });
    });
};

export const findAndUpdateActivities = after => dispatch =>
  dispatch(fetchActivityIds(after)).then(ids => dispatch(updateActivities(ids)));
