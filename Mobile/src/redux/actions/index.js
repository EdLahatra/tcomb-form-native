export const SYNC = 'SYNC';
export const SYNC_ON_LINE = 'SYNC_ON_LINE';
export const SYNC_END_LINE = 'SYNC_END_LINE';
export const SYNC_END_ERROR = 'SYNC_END_ERROR';
export const TEST = 'TEST';
export const SET_LOADIND = 'SET_LOADIND';
export const SET_TIME_OUT = 'SET_TIME_OUT';

export const setLoading = payload => ({
  type: SET_LOADIND,
  payload,
});

export const checkLineSync = payload => ({
  type: SYNC_ON_LINE,
  payload,
});

export const lineSyncEnd = payload => ({
  type: SYNC_END_LINE,
  payload,
});

export const lineSyncEndError = payload => ({
  type: SYNC_END_ERROR,
  payload,
});

export const setSync = payload => ({
  type: SYNC,
  payload,
});

export const setTimeOutSync = payload => ({
  type: SET_TIME_OUT,
  payload,
});
