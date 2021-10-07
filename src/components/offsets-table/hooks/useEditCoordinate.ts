import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import {CURRENT_PROJECT_ADD_CORDINATE} from 'state/actions/currentProject';

interface Params {
    userID: string;
    projectID: string;
    stationID: string;
    coordinateID: string;
}

const useEditCoordinate = (
    {userID, projectID, stationID, coordinateID}: Params,
    states: TypeFetchStates,
    handleStates: TypeHandleState,
    params: any
): void => {
    const dispatch = useDispatch();
    const axiosDev = useCallback(axiosDevInstance(), []);

    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const editCoordinate = async () => {
            try {
                const {
                    data: {coordinates},
                } = await axiosDev.put(
                    `/users/${userID}/projects/${projectID}/stations/${stationID}/coordinates/${coordinateID}`,
                    {...params}
                );
                console.log(coordinates);
                const payload = {coordinates: [...coordinates]};
                dispatch({type: CURRENT_PROJECT_ADD_CORDINATE, payload});

                handleStates({
                    start: false,
                    success: true,
                    fail: false,
                });
            } catch (error) {
                console.log(error.message);
                handleStates({
                    start: false,
                    success: false,
                    fail: true,
                });
            }
        };

        editCoordinate();
    });
};

export default useEditCoordinate;
