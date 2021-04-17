import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../assets/styles/style.css';
import Header from '../components/Header';
import Profiles from './Profiles';
import EditProfile from './EditProfile';
import CreateProfile from './CreateProfile';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={Profiles} />
      <Route exact path='/edit/:id' component={EditProfile} />
      <Route excat path='/create' component={CreateProfile} />
    </Switch>
  </BrowserRouter>
);

export default App;
