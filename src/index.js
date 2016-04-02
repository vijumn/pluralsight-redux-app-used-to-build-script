import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //Webpack can import CSS files too!
import './styles/styles.css';

render(
    <h1>Welcome to React and Redux in ES6 on Pluralsight!</h1>,
  document.getElementById('app')
);
