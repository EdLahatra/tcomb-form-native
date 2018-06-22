import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainContainer from './src/screens';

const App = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

export default App;
