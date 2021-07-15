import {CREATE_NEW_EMPTY_PROJECT} from 'state/actions/projects';
import type {TypeProjectsReducer, TypeProjectsState} from './types';

const initialState: TypeProjectsState = {
    userProjects: [],
};

const ProjectsReducer: TypeProjectsReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case CREATE_NEW_EMPTY_PROJECT: {
            const emptyProject = {
                name: '',
                shipyard: '',
                quotesTable: [],
                engineer: '',
            };
            return {...state, userProjects: state.userProjects.concat(emptyProject)};
        }

        default: {
            return state;
        }
    }
};

export default ProjectsReducer;
