import { combineReducers } from 'redux';
import sync from './sync';
import nav from './navigation';
import user from './user';

const reducer = combineReducers({
  sync,
  nav,
  user,
});

export default reducer;
