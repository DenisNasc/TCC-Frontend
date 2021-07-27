import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import useReduxStore from 'hooks/useReduxStore';

import type {TypeFetchStates} from 'types/hooks';

import {USER_LOGIN} from 'state/actions/user';

const usePopulateUserState = (states: TypeFetchStates): void => {
    const dispatch = useDispatch();
    const axiosDev = axiosDevInstance();

    const {success} = states;

    const {
        user: {id: userID},
    } = useReduxStore();
};

export default usePopulateUserState;
