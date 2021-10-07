import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import useReduxStore from 'hooks/useReduxStore';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Project from 'pages/Project';
import OffsetsTable from 'pages/OffsetsTable';
import Hidrostatics from 'pages/Hidrostatics';

const Routes: React.FC = () => {
    const {
        user: {id: userID},
    } = useReduxStore();

    return (
        <Router>
            {!userID && <Redirect to="/" />}
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/:projectID" exact>
                    <Project />
                </Route>
                <Route path="/:projectID/tabela-cotas" exact>
                    <OffsetsTable />
                </Route>
                <Route path="/:projectID/curvas-hidrostaticas" exact>
                    <Hidrostatics />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;
