import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import {CURRENT_PROJECT_UPDATE} from 'state/actions/currentProject';

interface Params {
    userID: string;
    projectID: string;
    stationID: string;
}

const useDeleteStation = (
    {userID, projectID, stationID}: Params,
    states: TypeFetchStates,
    handleStates: TypeHandleState
): void => {
    const dispatch = useDispatch();
    const axiosDev = useCallback(axiosDevInstance(), []);

    const {start} = states;

    useEffect(() => {
        if (!start) return;

        const deleteStation = async () => {
            try {
                await axiosDev.delete(
                    `/users/${userID}/projects/${projectID}/stations/${stationID}`
                );

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

        deleteStation();
    });
};

export default useDeleteStation;
