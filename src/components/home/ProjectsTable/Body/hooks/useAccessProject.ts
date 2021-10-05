import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {axiosDevInstance} from 'fetch/axiosInstances';

import type {TypeFetchStates, TypeHandleState} from 'types/hooks';

import {CURRENT_PROJECT_UPDATE} from 'state/actions/currentProject';

import type {ResponseGetProjects} from 'types/fetch/projects';

interface HookParams {
    userID: string;
    projectID: string;
    projectName: string;
}

const useAccessProject = (
    params: HookParams,
    states: TypeFetchStates,
    handleStates: TypeHandleState
): void => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {userID, projectName, projectID} = params;
    const {start} = states;

    const axiosDev = useCallback(axiosDevInstance, [])();

    useEffect(() => {
        if (!start) return;
        const editProject = async () => {
            try {
                const {
                    data: {projects},
                } = await axiosDev.get<ResponseGetProjects>(
                    `/users/${userID}/projects/${projectID}`
                );

                const payload = {...projects[0]};
                dispatch({type: CURRENT_PROJECT_UPDATE, payload});
                handleStates({
                    start: false,
                    success: true,
                    fail: false,
                });

                history.push(`/${projectName.toLowerCase().replace(/ /g, '-').trim()}`);
            } catch (error) {
                console.log(error.message);
                handleStates({
                    start: false,
                    success: false,
                    fail: true,
                });
            }
        };

        editProject();
    }, [start]);
};

export default useAccessProject;
