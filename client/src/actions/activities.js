import { apiRequest } from '../helpers/api';

export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';
export const updateActivities = activities => ({
  type: UPDATE_ACTIVITIES,
  activities,
});

export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const updateActivity = activity => ({
  type: UPDATE_ACTIVITY,
  activity,
});

export const fetchActivitiesFromCache = () => dispatch =>
  apiRequest('activities')
    .then(response => response.json())
    .then(activitiesArray =>
      Object.assign(
        {},
        ...activitiesArray.map(activity => ({
          [activity.id]: activity,
        })),
      ))
    .then(activities => dispatch(updateActivities(activities)));

export const fetchActivity = id => dispatch =>
  apiRequest(`activities/${id}`)
    .then(response => response.json())
    .then(({ json }) => dispatch(updateActivity(json)));
