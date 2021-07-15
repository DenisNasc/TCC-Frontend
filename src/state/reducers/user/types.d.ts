import type {Reducer, Action} from 'redux';

export type TypeProject = {
    id: string;
    project: string;
    engineer: string;
    shipyard: string;
    updatedAt: string;
    createdAt: string;
};

export type TypeUserState = {
    id: string;
    email: string;
    name: string;
    token: string;
    projects: TypeProject[];
    errorMessage: string;
};

export type TypeUserPayload = any;

export type TypeUserAction = Action<string, TypeUserPayload>;

export type TypeUserReducer = Reducer<TypeUserState, TypeUserAction>;
