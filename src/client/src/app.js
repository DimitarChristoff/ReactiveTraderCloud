import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';

import { shell } from './ui';

const { CoreLayout, ShellView, TileView, GrowlView } = shell.components;

const history = createHashHistory({
  queryKey: false
});

const target = document.getElementById('root');

if (window.fin) {
  target.classList.add('openfin');
}

const routes = (
  <Router history={history}>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={ShellView}/>
    </Route>
    <Route path='/user' component={CoreLayout}>
      <IndexRoute component={ShellView}/>
    </Route>
    <Route path='/tile'>
      <IndexRoute component={TileView}/>
    </Route>
    <Route path='/growl'>
      <IndexRoute component={GrowlView}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, target);
