import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import jwt from 'jsonwebtoken';

import {axiosDevInstance} from 'axiosInstances';
import {USER_LOGIN} from 'state/actions/user';

const SECRET_KEY = 'SUPER-SECRETO';

const usePopulateUserState = (userJWT: string): void => {
    const dispatch = useDispatch();
    const axiosDev = axiosDevInstance(userJWT);

    useEffect(() => {
        jwt.verify(userJWT, SECRET_KEY, async (error: any, decoded: any) => {
            if (error) {
                console.log(error);
                return;
            }
            const {identity} = decoded;

            const {data} = await axiosDev.get(`/users/${identity}`);

            const {data: projects} = await axiosDev.get(`/users/${identity}/projects`);

            const {name, email, id} = data;

            const payload = {name, email, id, token: userJWT, projects};
            dispatch({type: USER_LOGIN, payload});
        });
    }, [userJWT]);
};

export default usePopulateUserState;
