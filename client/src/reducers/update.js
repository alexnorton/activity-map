import {
  FIND_ACTIVITIES_PAGE_REQUEST,
  FIND_ACTIVITIES_PAGE_SUCCESS,
  FIND_ACTIVITIES_START,
  FIND_ACTIVITIES_FINISH,
  UPDATE_ACTIVITIES_START,
  UPDATE_ACTIVITY_REQUEST,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITIES_FINISH,
} from '../actions/update';

const STAGE_FINDING = 'STAGE_FINDING';
const STAGE_UPDATING = 'STAGE_UPDATING';

export default (state = { updating: false }, action) => {
  switch (action.type) {
    case FIND_ACTIVITIES_START:
      return { updating: true, stage: STAGE_FINDING };
    case FIND_ACTIVITIES_PAGE_REQUEST:
      return { ...state, finding: { ...state.finding, page: action.page, loading: true } };
    case FIND_ACTIVITIES_PAGE_SUCCESS:
      return {
        ...state,
        finding: {
          ...state.finding,
          page: action.page,
          count: action.count,
          loading: false,
        },
      };
    case FIND_ACTIVITIES_FINISH:
      return state;
    case UPDATE_ACTIVITIES_START:
      return { updating: true, stage: STAGE_UPDATING };
    case UPDATE_ACTIVITY_REQUEST:
      return { ...state, updating: { ...state.updating, index: action.index, loading: true } };
    case UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        updating: {
          ...state.updating,
          index: action.index,
          loading: false,
          lastName: action.name,
        },
      };
    case UPDATE_ACTIVITIES_FINISH:
      return { updating: false };
    default:
      return state;
  }
};
