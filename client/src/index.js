/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css';

import PrivateRoute from './auth.routes';
import reducers from './reducers';
import App from './components/app.component';
import Home from './components/home.component';
import Login from './components/auth/login.component';
import Logout from './components/auth/logout.component';
import Profile from './components/profile.component';

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token') } },
  applyMiddleware(reduxThunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
