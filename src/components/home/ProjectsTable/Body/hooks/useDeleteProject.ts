import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import {USER_UPDATE_PROJECTS} from 'state/actions/user';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';
import type {ResponseDelProjects} from 'types/fetch/projects';

interface HookParams {
    userID: string;
    projectID: string;
}

const useDeleteProject = (
    params: HookParams,
    states: TypeFetchStates,
    handleStates: TypeHandleState
): void => {
    const dispatch = useDispatch();

    const {userID, projectID} = params;
    const {start} = states;

    const axiosDev = useCallback(axiosDevInstance, [])();

    useEffect(() => {
        if (!start) return;
        const deleteProject = async () => {
            try {
                const {
                    data: {projects},
                } = await axiosDev.delete<ResponseDelProjects>(
                    `/users/${userID}/projects/${projectID}`
                );

                const payload = {projects};

                dispatch({type: USER_UPDATE_PROJECTS, payload});

                handleStates({start: false, success: true, fail: false});
            } catch (error) {
                handleStates({start: false, success: false, fail: true});
            }
        };

        deleteProject();
    }, [start]);
};

export default useDeleteProject;
