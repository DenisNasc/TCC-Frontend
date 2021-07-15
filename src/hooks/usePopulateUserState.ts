import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import jwt from 'jsonwebtoken';

import {axiosDevInstance} from 'axiosInstances';
import {USER_LOGIN} from 'state/actions/user';

const SECRET_KEY = 'SUPER-SECRETO';

const usePopulateUserState = (userJWT: string): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        jwt.verify(userJWT, SECRET_KEY, async (error: any, decoded: any) => {
            if (error) {
                console.log(error);
                return;
            }
            const {identity} = decoded;

            const {data} = await axiosDevInstance({
                Authorization: `jwt ${userJWT}`,
            }).get(`/users/${identity}`);

            console.log(identity);

            const {data: projects} = await axiosDevInstance({
                Authorization: `jwt ${userJWT}`,
            }).get(`/users/${identity}/projects`);

            const {name, email, id, token} = data;

            const payload = {name, email, id, token, projects};
            dispatch({type: USER_LOGIN, payload});
        });
    }, [userJWT]);
};

export default usePopulateUserState;
