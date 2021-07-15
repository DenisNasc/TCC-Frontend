import {combineReducers} from 'redux';

import app from './app';
import projects from './projects';
import user from './user';

const reducers = {app, user};

const rootReducer = combineReducers(reducers);

export default rootReducer;
