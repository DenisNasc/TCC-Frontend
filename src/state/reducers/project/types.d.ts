import type {Reducer} from 'redux';

export type TypeStation = {
    name: string;
    longitudinal: number;
    order: number;
    coordinates: {order: number; transversal: number; vertical: number; type?: string}[];
};

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

    stations: TypeStation[];

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

    stations?: TypeStation[];

    createdAt?: string;
    updatedAt?: string;
};

export type TypeCurrentProjectAction = {type: string; payload: TypeCurrentProjectPayload};

export type TypeCurrentProjectReducer = Reducer<TypeCurrentProjectState, TypeCurrentProjectAction>;
