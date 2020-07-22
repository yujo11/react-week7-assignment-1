import React from 'react';

import { useDispatch } from 'react-redux';

import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  setAccessToken,
} from './store/actions';

import { loadItem } from './services/storage';

import HomePage from './Home/HomePage';
import AboutPage from './About/AboutPage';
import LoginPage from './Login/LoginPage';
import LogoutPage from './Logout/LogoutPage';

import RestaurantsPage from './Restaurants/RestaurantsPage';
import RestaurantPage from './Restaurant/RestaurantPage';
import NotFoundPage from './NotFound/NotFoundPage';

export default function App() {
  const dispatch = useDispatch();
  const accessToken = loadItem('accessToken');

  if (accessToken) {
    dispatch(setAccessToken(accessToken));
  }

  return (
    <div>
      <header>
        <h1>
          <Link to="/">헤더</Link>
        </h1>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route exact path="/restaurants" component={RestaurantsPage} />
        <Route path="/restaurants/:id" component={RestaurantPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}