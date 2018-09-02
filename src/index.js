import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

// Dispatch actions to load initial state.
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
