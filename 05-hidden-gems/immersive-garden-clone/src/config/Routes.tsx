
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/* Pages */
import Home from '../components/home'
import About from '../components/about'
import Cases from '../components/cases/'
import NotFound from '../components/404'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/cases/:caseId" component={Cases} />
            <Route exact component={NotFound} />
        </Switch>
    </Router>
)


export default Routes