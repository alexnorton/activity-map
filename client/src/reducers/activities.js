import { UPDATE_ACTIVITIES, UPDATE_ACTIVITY } from '../actions/activities';

export default (state = { fetched: false, data: {} }, action) => {
  switch (action.type) {
    case UPDATE_ACTIVITIES:
      return { ...state, fetched: true, data: action.activities };
    case UPDATE_ACTIVITY:
      return { ...state, data: { ...state.data, [action.activity.id]: action.activity } };
    default:
      return state;
  }
};
