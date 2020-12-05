import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import speedReducer from './reducers/speedReducer';
import inputReducer from './reducers/inputReducer';

const store = createStore(
  combineReducers({
    sliderSpeed: speedReducer,
    inputSize: inputReducer,
  })
);

// store.subscribe(() => {
//   console.log("Store updated!", store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
