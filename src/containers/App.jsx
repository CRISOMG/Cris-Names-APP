/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-await */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '@styles/global.css';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

const App = () => (
  <Router>
    <Header />
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' component={lazy(() => import(/* webpackChunkName: "Profile" */ './Profiles'))} />
        <Route excat path='/edit/:id' component={lazy(() => import(/* webpackChunkName: "EditProfile" */ './EditProfile'))} />
        <Route exact path='/create' component={lazy(() => import(/* webpackChunkName: "CrateProfile" */ './CreateProfile'))} />
      </Switch>
    </Suspense>
  </Router>
);
export default App;
