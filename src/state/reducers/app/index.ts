import {APP_CHANGE_THEME, APP_CHANGE_LANGUAGE, APP_SET_FILTER_QUERY} from 'state/actions/app';
import type {TypeAppReducer, TypeAppState} from './types';

const initialState: TypeAppState = {
    darkMode: false,
    language: 'pt-br',
    filter: '',
};

const AppContextReducer: TypeAppReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case APP_CHANGE_THEME: {
            return {...state, darkMode: !state.darkMode};
        }
        case APP_CHANGE_LANGUAGE: {
            return {...state, language: payload.language};
        }
        case APP_SET_FILTER_QUERY: {
            return {...state, filter: payload.filter};
        }
        default: {
            return state;
        }
    }
};

export default AppContextReducer;
