import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type ResponseLogout from 'types/fetch/logout';
import type {TypeFetchStates, TypeHandleState, TypeHandleMessage, TypeHandleHookParams} from 'types/hooks';

import {USER_LOGOUT} from 'state/actions/user';

const axiosDev = axiosDevInstance();

const useLogout = (states: TypeFetchStates, handleStates: TypeHandleState): void => {
    const dispatch = useDispatch();
    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const userLogout = async () => {
            try {
                await axiosDev.post<ResponseLogout>('/logout', {});

                handleStates({start: false, success: true, fail: false});
                dispatch({type: USER_LOGOUT});
            } catch (error) {
                console.log(error.message);
                handleStates({start: false, success: false, fail: true});
            }
        };
        userLogout();
    }, [start]);
};

export default useLogout;
