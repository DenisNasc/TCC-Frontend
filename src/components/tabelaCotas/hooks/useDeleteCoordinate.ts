import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import {CURRENT_PROJECT_DEL_CORDINATE} from 'state/actions/currentProject';

interface Params {
    userID: string;
    projectID: string;
    stationID: string;
    coordinateID: string;
}

const useDeleteCoordinate = (
    {userID, projectID, stationID, coordinateID}: Params,
    states: TypeFetchStates,
    handleStates: TypeHandleState
): void => {
    const dispatch = useDispatch();
    const axiosDev = useCallback(axiosDevInstance(), []);

    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const createCoordinate = async () => {
            try {
                const url = `/users/${userID}/projects/${projectID}/stations/${stationID}/coordinates/${coordinateID}`;

                await axiosDev.delete(url);

                const payload = {coordinateID};
                dispatch({type: CURRENT_PROJECT_DEL_CORDINATE, payload});

                handleStates({
                    start: false,
                    success: true,
                    fail: false,
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

export default useDeleteCoordinate;
