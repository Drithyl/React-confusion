import React from 'react';
import ReactDOM from 'react-dom';

//import Bootstrap's CSS components. Must be imported before the index.css
//so that we can override some of Bootstrap's CSS with our own in index.css
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Render the App component imported from ./App.js into the root element (in index.html)
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
