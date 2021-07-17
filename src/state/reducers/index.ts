import {combineReducers} from 'redux';

import app from './app';
import currentProject from './project';
import user from './user';

const reducers = {app, user, currentProject};

const rootReducer = combineReducers(reducers);

export default rootReducer;
