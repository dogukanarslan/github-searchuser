import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import { Home, Details } from '../pages'

export const Main = () => {
    return (
        <Container>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/details/:login" component={Details} />
            </Switch>
        </Container>
    )
}
