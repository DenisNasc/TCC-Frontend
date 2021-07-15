import type {Reducer, Action} from 'redux';

export type TypeUserProject = {
    name: string;
    shipyard: string;
    quotesTable: string[];
    engineer: string;
};

export type TypeProjectsState = {
    userProjects: TypeUserProject[];
};

export type TypeProjectsPayload = any;

export type TypeProjectsAction = Action<string, TypeProjectsPayload>;

export type TypeProjectsReducer = Reducer<TypeProjectsState, TypeProjectsAction>;
