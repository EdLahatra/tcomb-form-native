import {
  SET_LOADIND, SYNC, SYNC_ON_LINE, SYNC_END_LINE, SYNC_END_ERROR, SET_TIME_OUT
} from '../actions';

const defaultState = {
  sync: [],
  loading: false,
  timeOut: [],
};

const sync = (state = defaultState, action) => {
  console.log("REdux ==========> ", action.type);
  switch (action.type) {
    case SET_LOADIND:
      return {
        ...state,
        loading: action.payload
      };
    case SET_TIME_OUT:
      return {
        ...state,
        timeOut: [...state.timeOut, action.payload]
      };
    case SYNC_ON_LINE:
      return {
        ...state,
        sync: [...state.sync, action.payload]
      };
    case SYNC_END_LINE:
      return {
        ...state,
        sync: state.sync && state.sync.length > 0 ? state.sync.filter(key => key.id !== action.payload) : []
      };
    case SYNC_END_ERROR:
      return {
        ...state,
        sync: state.sync && state.sync.length > 0 ? state.sync.filter(key => key.id !== action.payload) : []
      };
    case SYNC:
      return {
        ...state,
        sync: state.sync && state.sync.length > 0 && state.sync.filter(key => key === action.payload).length > 0
          ? state.sync.filter(key => key !== action.payload)
          : [...state.sync, action.payload],
        timeOut: state.timeOut.filter(key => key !== action.payload),
      };
    default:
      return state;
  }
};

export default sync;
