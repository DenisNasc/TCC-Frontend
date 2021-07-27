import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type ResponseLogin from 'types/fetch/login';
import type {TypeFetchStates, TypeHandleState, TypeHandleMessage, TypeHandleHookParams} from 'types/hooks';

import {USER_LOGIN} from 'state/actions/user';

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
                const {data} = await axiosDev.post('/signup', {
                    name,
                    email,
                    password,
                });

                setUserID(data.userID);

                handleMessage({
                    type: 'success',
                    message: 'Usuário criado com sucesso',
                });
                handleState({start: false, success: true, fail: false});
                handleParams({name: '', email: '', password: '', confirmPassword: ''});
            } catch (error) {
                handleState({start: false, success: false, fail: true});
                handleMessage({
                    type: 'error',
                    message: 'Não foi possível cadastrar o usuário',
                });
            }
        };

        createNewUser();
    }, [start]);

    useEffect(() => {
        if (!success) return;

        const populateUserState = async () => {
            try {
                const {data: user} = await axiosDev.get(`/users/${userID}`);
                const {data: projects} = await axiosDev.get(`/users/${userID}/projects`);

                const {name, email, id} = user;

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
