import {combineReducers} from 'redux';

import app from './app';
import user from './user';
import currentProject from './currentProject';
import hidrostatics from './hidrostatics';

const reducers = {app, user, currentProject, hidrostatics};

const rootReducer = combineReducers(reducers);

export default rootReducer;
