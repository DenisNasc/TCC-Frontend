import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import {CURRENT_PROJECT_CREATE_STATION, CURRENT_PROJECT_UPDATE} from 'state/actions/currentProject';

interface Params {
    userID: string;
    projectID: string;
    params: {
        name: string;
        longitudinal: number;
    };
}

const useCreateStation = (
    {userID, projectID, params}: Params,
    states: TypeFetchStates,
    handleStates: TypeHandleState,
    handleParams: (
        value: React.SetStateAction<{
            name: string;
            longitudinal: number;
        }>
    ) => void
): void => {
    const dispatch = useDispatch();
    const axiosDev = useCallback(axiosDevInstance(), []);

    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const createStation = async () => {
            try {
                const url = `/users/${userID}/projects/${projectID}/stations`;
                const {
                    data: {stations},
                } = await axiosDev.post(url, params);

                const payload = {stations: {...stations[0], coordinates: []}};

                dispatch({type: CURRENT_PROJECT_CREATE_STATION, payload});

                handleStates({
                    start: false,
                    success: true,
                    fail: false,
                });
                handleParams({
                    name: '',
                    longitudinal: 0,
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

        createStation();
    }, [start]);
};

export default useCreateStation;
