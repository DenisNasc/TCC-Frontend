import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type ResponseLogin from 'types/fetch/login';
import type {TypeFetchStates, TypeHandleState, TypeHandleMessage} from 'types/hooks';

import type {ResponseGetProjects} from 'types/fetch/projects';
import type {ResponseGetUsers} from 'types/fetch/users';

import {USER_LOGIN} from 'state/actions/user';

export interface HookParams {
    email: string;
    password: string;
}

const useFormLogin = (states: TypeFetchStates, handleState: TypeHandleState, handleMessage: TypeHandleMessage, params: HookParams): void => {
    const dispatch = useDispatch();
    const [userID, setUserID] = useState('');

    const {start, success} = states;

    const axiosDev = useCallback(axiosDevInstance, [])();

    useEffect(() => {
        if (!start) return;
        const {email, password} = params;
        const userLogin = async () => {
            try {
                const {data: userData} = await axiosDev.post<ResponseLogin>('/login', {
                    email,
                    password,
                });

                setUserID(userData.userID);
                handleMessage({
                    type: 'success',
                    message: userData.message,
                });

                handleState({start: false, success: true, fail: false});
            } catch (error) {
                const {message} = error.response.data || 'Erro inesperado no servidor';

                handleMessage({
                    type: 'error',
                    message,
                });
                handleState({start: false, success: false, fail: true});
            }
        };
        userLogin();
    }, [start]);

    useEffect(() => {
        if (!success) return;

        const populateUserState = async () => {
            try {
                const {
                    data: {users},
                } = await axiosDev.get<ResponseGetUsers>(`/users/${userID}`);
                const {
                    data: {projects},
                } = await axiosDev.get<ResponseGetProjects>(`/users/${userID}/projects`);

                const {name, email, id} = users[0];

                const payload = {name, email, id, projects};
                dispatch({type: USER_LOGIN, payload});
            } catch (error) {
                console.log(error.message);
            }
        };

        populateUserState();
    }, [success]);
};

export default useFormLogin;
