import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Details, Search, Repositories } from '../pages';

export const Main = () => {
  return (
    <div className="mt-2">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/details/:login" component={Details} />
        <Route path="/search" component={Search} />
        <Route path="/repositories" component={Repositories} />
      </Switch>
    </div>
  );
};
