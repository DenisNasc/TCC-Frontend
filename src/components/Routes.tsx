import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import {useDispatch} from 'react-redux';

import useLocalStorage from 'hooks/useLocalStorage';
import useReduxStore from 'hooks/useReduxStore';
import useVerifyToken from 'hooks/useVerifyToken';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Project from 'pages/Project';

import {USER_LOGIN, USER_SET_JWT} from 'state/actions/user';

const Routes: React.FC = () => {
    const dispatch = useDispatch();

    // VERIFICAR SE HÁ TOKEN NO LOCALSTORAGE, SE TIVER VERIFICAR SE ELE ESTÁ VÁLIDO PARA O LOGIN, SENÃO REDIRECIONAR PARA A PAGE DE LOGIN PADRÃO
    const [userJWT, _] = useLocalStorage('user_token', false);
    console.log(userJWT);

    // const answerFromServer = useVerifyToken(userJWT);
    // console.log(answerFromServer);

    useEffect(() => {
        const payload = {token: userJWT};
        dispatch({type: USER_SET_JWT, payload});
    }, [userJWT]);

    return (
        <Router>
            {!userJWT && <Redirect to="/" />}
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
