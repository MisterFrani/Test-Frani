import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Home from "./Home/Home";

const CustomRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => ( <Component {...props} {...rest} /> ) } />
  );
};

export default () => {

  return (
    <Switch>
      <CustomRoute exact path={Routes.Home.path} component={Home} />
    </Switch>
  );
} 