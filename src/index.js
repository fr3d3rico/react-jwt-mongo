import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

axios.defaults.baseURL = 'http://10.8.13.117:3030';

axios.interceptors.request.use(req => {
    console.log('axios.interceptors(REQ) ' + req);
    return req;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(res => {
    console.log('axios.interceptors(RES) ' + res);
    return res;
}, error => {
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
