import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages'
import { Details } from '../pages'

export const Main = () => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/details/:login" component={Details} />
            </Switch>
        </div>
    )
}
