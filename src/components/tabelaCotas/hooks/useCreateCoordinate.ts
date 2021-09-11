import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import {CURRENT_PROJECT_ADD_CORDINATE} from 'state/actions/currentProject';

interface Params {
    userID: string;
    projectID: string;
    stationID: string;
    params: {
        type: string;
        transversal: number;
        vertical: number;
    };
}

const useCreateCoordinate = (
    {userID, projectID, stationID, params}: Params,
    states: TypeFetchStates,
    handleStates: TypeHandleState,
    handleParams: (
        value: React.SetStateAction<{type: string; transversal: number; vertical: number}>
    ) => void
): void => {
    const dispatch = useDispatch();
    const axiosDev = useCallback(axiosDevInstance(), []);

    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const createCoordinate = async () => {
            try {
                const url = `/users/${userID}/projects/${projectID}/stations/${stationID}/coordinates`;
                const {
                    data: {coordinates},
                } = await axiosDev.post(url, params);

                console.log(coordinates);

                const payload = {coordinates: [...coordinates]};
                dispatch({type: CURRENT_PROJECT_ADD_CORDINATE, payload});

                handleStates({
                    start: false,
                    success: true,
                    fail: false,
                });

                handleParams({
                    type: '',
                    transversal: 0,
                    vertical: 0,
                });
            } catch (error) {
                handleStates({
                    start: false,
                    success: false,
                    fail: true,
                });
                console.log(error.message);
            }
        };

        createCoordinate();
    }, [start]);
};

export default useCreateCoordinate;
