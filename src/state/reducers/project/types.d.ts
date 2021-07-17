import type {Reducer} from 'redux';

export type TypeCurrentProjectState = {
    id: string;
    userID: string;
    name: string;

    shipyard: string;
    engineer: string;

    lengthOverall: number;
    lengthPerpendiculars: number;
    breadth: number;
    draft: number;

    stations: string[];

    createdAt: string;
    updatedAt: string;
};

export type TypeCurrentProjectPayload = {
    id?: string;
    userID?: string;
    name?: string;

    shipyard?: string;
    engineer?: string;

    lengthOverall?: number;
    lengthPerpendiculars?: number;
    breadth?: number;
    draft?: number;

    stations?: string[];

    createdAt?: string;
    updatedAt?: string;
};

export type TypeCurrentProjectAction = {type: string; payload: TypeCurrentProjectPayload};

export type TypeCurrentProjectReducer = Reducer<TypeCurrentProjectState, TypeCurrentProjectAction>;
