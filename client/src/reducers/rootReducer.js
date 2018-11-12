import { combineReducers } from 'redux';

import user from './user';
import activities from './activities';
import update from './update';

const rootReducer = combineReducers({
  user,
  activities,
  update,
});

export default rootReducer;
