// import { persistStore, autoRehydrate } from 'redux-persist';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducers';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  // autoRehydrate(),
));

// persistStore(store, { storage: AsyncStorage });

export default store;
