import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {axiosDevInstance} from 'fetch/axiosInstances';

import {USER_UPDATE_PROJECTS} from 'state/actions/user';
import {projectParamsInitialState} from 'components/home/CreateProject';

import type {TypeFetchStates, TypeHandleState, TypeHandleHookParams} from 'types/hooks';
import type {
    ResponsePostProjects,
    ParamsPostProjects,
    ResponseGetProjects,
} from 'types/fetch/projects';

interface HookParams extends ParamsPostProjects {
    userID: string;
}

const useCreateProject = (
    params: HookParams,
    states: TypeFetchStates,
    handleStates: TypeHandleState,
    handleParams: TypeHandleHookParams<ParamsPostProjects>
): void => {
    const dispatch = useDispatch();

    const {userID, ...postParams} = params;
    const {start} = states;

    const axiosDev = useCallback(axiosDevInstance, [])();

    useEffect(() => {
        if (!start) return;

        const createProject = async () => {
            try {
                await axiosDev.post<ResponsePostProjects>(`/users/${userID}/projects`, postParams);

                const {
                    data: {projects},
                } = await axiosDev.get<ResponseGetProjects>(`/users/${userID}/projects`);

                const payload = {projects};

                dispatch({type: USER_UPDATE_PROJECTS, payload});
                handleParams(projectParamsInitialState);
                handleStates({start: false, success: true, fail: false});
            } catch (error) {
                handleStates({start: false, success: false, fail: true});
            }
        };

        createProject();
    }, [start]);
};

export default useCreateProject;
