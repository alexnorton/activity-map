import { combineReducers } from 'redux';

const test = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  test,
});

export default rootReducer;
