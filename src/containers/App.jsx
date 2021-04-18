/* eslint-disable no-return-await */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../assets/styles/style.css';
import Header from '../components/Header';
import Profiles from './Profiles';
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';

// import(/* webpackChunkName: "Profile" */ './Profiles')
// import(/* webpackChunkName: "EditProfile" */ './EditProfile')
// import(/* webpackChunkName: "CrateProfile" */ './CreateProfile')

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={Profiles} />
      <Route excat path='/create' component={CreateProfile} />
      <Route exact path='/edit/:id' component={EditProfile} />
    </Switch>
  </BrowserRouter>
);

export default App;
