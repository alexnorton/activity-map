import { combineReducers } from 'redux';

import user from './user';
import activities from './activities';

const rootReducer = combineReducers({
  user,
  activities,
});

export default rootReducer;
