import { apiRequest } from '../helpers/api';

import { fetchActivity } from './activities';

export const FETCH_ACTIVITY_IDS_FROM_STRAVA_SUCCESS = 'FETCH_ACTIVITY_IDS_FROM_STRAVA_SUCCESS';
export const refreshActivitiesSuccess = (activities, page) => ({
  type: FETCH_ACTIVITY_IDS_FROM_STRAVA_SUCCESS,
  activities: Object.assign(...activities.map(activity => ({
    [activity.id]: {},
  }))),
  page,
});

export const FETCH_ACTIVITY_IDS_FROM_STRAVA_FINISHED = 'FETCH_ACTIVITY_IDS_FROM_STRAVA_FINISHED';
export const refreshActivitiesFinished = () => ({
  type: FETCH_ACTIVITY_IDS_FROM_STRAVA_FINISHED,
});

export const fetchActivityIdsFromStrava = (page = 1, activities = []) => dispatch =>
  apiRequest(`activities/strava?page=${page}`)
    .then(response => response.json())
    .then((newActivities) => {
      if (newActivities.length > 0) {
        dispatch(refreshActivitiesSuccess(newActivities, page));
        return dispatch(fetchActivityIdsFromStrava(page + 1, [...activities, ...newActivities]));
      }
      dispatch(refreshActivitiesFinished());
      return activities;
    });

export const fetchActivitiesFromStrava = () => dispatch =>
  dispatch(fetchActivityIdsFromStrava()).then(activityIds =>
    activityIds.reduce(
      (chain, activityId) => chain.then(() => dispatch(fetchActivity(activityId))),
      Promise.resolve(),
    ));
