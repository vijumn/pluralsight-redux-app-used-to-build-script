import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
    <div>
        <h1>Welcome to React and Redux in ES6!</h1>
        <p>If you can see this, you're ready to <a href="https://www.pluralsight.com/authors/cory-house">follow along with the course on Pluralsight</a>.</p>
    </div>,
  document.getElementById('app')
);
