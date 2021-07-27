import type {Reducer, Action} from 'redux';

export type TypeProject = {
    id: string;
    userID: string;
    name: string;
    engineer: string;
    shipyard: string;

    lengthOverall: number;
    lengthPerpendiculars: number;
    breadth: number;
    draft: number;

    updatedAt: string;
    createdAt: string;
};

export type TypeUserState = {
    id: string;
    email: string;
    name: string;

    projects: TypeProject[];
};

export type TypeUserPayload = any;

export type TypeUserAction = Action<string, TypeUserPayload>;

export type TypeUserReducer = Reducer<TypeUserState, TypeUserAction>;
