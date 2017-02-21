// All of the imported here will be included in the main,
// initially loading, bundle. Other parts will be moved
// out to a lazy-loading, dynamic bundle.
import React from 'react';
import { render } from 'react-dom';

//import * as x from './utils/react-lazy-imports'; // './utils/webpack-lazy-imports';
import { LazyCall } from 'react-lazy-imports'; // './utils/webpack-lazy-imports';

// Uncomment a line bellow to move a package into initial bundle.
//import 'react-router';
//import 'bootstrap/dist/css/bootstrap.css';

// The only custom layout which acts as a "splash-screen"
// till the whole application loaded. It's a good idea to make
// it as simple as posible.
//import FrontPage from './containers/App';

// Update favicon
// ==============
//[].slice.call(document.querySelectorAll('head>link[rel$="icon"]')).map((ln)=>{ln.href+='?v='+Date.now()});

//LazyCall(System.import('./app'));

render(
  <div />,
  document.getElementById('root')
);


