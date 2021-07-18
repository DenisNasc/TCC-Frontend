import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import useLocalStorage from 'hooks/useLocalStorage';
import useReduxStore from 'hooks/useReduxStore';
import usePopulateUserState from 'hooks/usePopulateUserState';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Project from 'pages/Project';
import TabelaCotas from 'pages/TabelaCotas';

const Routes: React.FC = () => {
    const [userJWT, _] = useLocalStorage('user_token', false);
    usePopulateUserState(userJWT);

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
                <Route path="/projects/:id" exact>
                    <Project />
                </Route>
                <Route path="/projects/:id/tabela-cotas" exact>
                    <TabelaCotas />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;
