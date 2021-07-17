import {CURRENT_PROJECT_UPDATE, CURRENT_PROJECT_RESTART} from 'state/actions/projects';
import type {
    TypeCurrentProjectReducer,
    TypeCurrentProjectState,
    TypeCurrentProjectAction,
} from './types';

const initialState: TypeCurrentProjectState = {
    id: '',
    userID: '',
    name: '',

    shipyard: '',
    engineer: '',

    lengthOverall: 0,
    lengthPerpendiculars: 0,
    breadth: 0,
    draft: 0,

    stations: [],

    createdAt: '',
    updatedAt: '',
};

const currentProjectReducer: TypeCurrentProjectReducer = (
    state = initialState,
    action: TypeCurrentProjectAction
) => {
    const {type, payload} = action;

    switch (type) {
        case CURRENT_PROJECT_UPDATE: {
            return {...state, ...payload};
        }

        case CURRENT_PROJECT_RESTART: {
            return {...initialState};
        }

        default: {
            return {...state};
        }
    }
};

export default currentProjectReducer;
