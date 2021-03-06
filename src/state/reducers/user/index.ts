import {USER_CREATE_PROJECT, USER_UPDATE_PROJECTS, USER_DELETE_PROJECT, USER_LOGIN, USER_LOGOUT, USER_SET_JWT} from 'state/actions/user';

import type {TypeProject, TypeUserState, TypeUserReducer} from './types';

const initialState: TypeUserState = {
    id: '',
    email: '',
    name: '',
    projects: [],
};

const UserContextReducer: TypeUserReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_UPDATE_PROJECTS: {
            return {...state, projects: payload.projects};
        }

        case USER_DELETE_PROJECT: {
            const idFromDeletedProject: string = payload.id;
            const filtredProjects = state.projects.filter(e => e.id !== idFromDeletedProject);

            return {...state, projects: filtredProjects};
        }

        case USER_LOGOUT: {
            return {...initialState};
        }

        case USER_LOGIN: {
            return {...state, ...payload};
        }

        case USER_SET_JWT: {
            return {...state, token: payload.token};
        }
        default: {
            return state;
        }
    }
};

export default UserContextReducer;
