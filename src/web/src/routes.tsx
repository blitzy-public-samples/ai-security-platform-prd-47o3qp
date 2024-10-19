// Importing React to use JSX syntax and component functionalities.
// Version: 17.0.2
import React from 'react';

// Importing BrowserRouter, Switch, and Route from react-router-dom for routing and navigation.
// Version: 5.2.0
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importing the page components for different routes.
// Internal dependencies providing interfaces for various sections of the application.
import Dashboard from './pages/Dashboard';
import IncidentsPage from './pages/Incidents';
import PlaybooksPage from './pages/Playbooks';
import RecommendationsPage from './pages/Recommendations';
import UsersPage from './pages/Users';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// configureRoutes function sets up the routing for the application, mapping URL paths to corresponding page components.
// This addresses the 'User Interface Design' requirement (Technical Specification/4.1 Dashboard), ensuring consistent navigation and layout across the application.

function configureRoutes(): JSX.Element {
    // Wrapping the routing configuration within the Router component to enable navigation.
    // React Router's Router component enables use of routing features throughout the React app.
    return (
        <Router>
            {/* The Switch component renders the first child Route that matches the location. */}
            <Switch>
                {/* Mapping URL paths to corresponding page components for navigation. */}
                <Route exact path="/" component={Dashboard} />
                <Route path="/incidents" component={IncidentsPage} />
                <Route path="/playbooks" component={PlaybooksPage} />
                <Route path="/recommendations" component={RecommendationsPage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
}

export default configureRoutes;