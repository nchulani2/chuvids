import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <Router>
      <App></App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
