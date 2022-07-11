import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Details, Search } from '../pages'

export const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:login" component={Details} />
            <Route path="/search" component={Search} />
        </Switch>
    )
}
