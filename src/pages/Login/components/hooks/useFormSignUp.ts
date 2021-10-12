import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';
import {USER_LOGIN} from 'state/actions/user';

import type {
    TypeFetchStates,
    TypeHandleState,
    TypeHandleMessage,
    TypeHandleHookParams,
} from 'types/hooks';
import type {ResponsePostSignUp, ParamsPostSignUp} from 'types/fetch/signUp';
import type {ResponseGetUsers} from 'types/fetch/users';
import type {ResponseGetProjects} from 'types/fetch/projects';

export interface HookParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const useFormSignUp = (
    states: TypeFetchStates,
    handleState: TypeHandleState,
    handleMessage: TypeHandleMessage,
    params: HookParams,
    handleParams: TypeHandleHookParams<HookParams>
): void => {
    const dispatch = useDispatch();
    const [userID, setUserID] = useState('');

    const {start, success} = states;

    const axiosDev = useCallback(axiosDevInstance, [])();

    useEffect(() => {
        if (!start) return;

        const {password, confirmPassword, name, email} = params;

        if (password !== confirmPassword) {
            handleMessage({
                type: 'warning',
                message: 'A confirmação de senha falhou',
            });
            handleState({start: false, success: false, fail: false});
            return;
        }

        const createNewUser = async () => {
            try {
                const postParams: ParamsPostSignUp = {
                    name,
                    email,
                    password,
                };

                const {
                    data: {message, ...data},
                } = await axiosDev.post<ResponsePostSignUp>('/signup', postParams);

                setUserID(data.userID);

                handleMessage({
                    type: 'success',
                    message,
                });
                handleState({start: false, success: true, fail: false});
                handleParams({name: '', email: '', password: '', confirmPassword: ''});
            } catch (error) {
                handleState({start: false, success: false, fail: true});
                handleMessage({
                    type: 'error',
                    message: 'Erro inesperado no servidor',
                });
            }
        };

        createNewUser();
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

export default useFormSignUp;
