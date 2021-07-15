import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import useLocalStorage from 'hooks/useLocalStorage';
import useReduxStore from 'hooks/useReduxStore';
import usePopulateUserState from 'hooks/usePopulateUserState';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Project from 'pages/Project';

const Routes: React.FC = () => {
    // VERIFICAR SE HÁ TOKEN NO LOCALSTORAGE, SE TIVER VERIFICAR SE ELE ESTÁ VÁLIDO PARA O LOGIN, SENÃO REDIRECIONAR PARA A PAGE DE LOGIN PADRÃO
    const [userJWT, _] = useLocalStorage('user_token', false);
    const {
        user: {id: userID},
    } = useReduxStore();

    usePopulateUserState(userJWT);

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
            </Switch>
        </Router>
    );
};

export default Routes;
