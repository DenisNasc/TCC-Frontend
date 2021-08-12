import type {Reducer} from 'redux';

export type TypeStationCoordinate = {
    id: string;
    order?: number;
    transversal: number;
    vertical: number;
    type?: string;
    createdAt: string;
    updatedAt: string | null;
};

export type TypeStation = {
    id: string;
    name: string;
    longitudinal: number;
    coordinates: TypeStationCoordinate[];
    createdAt: string;
    updatedAt: string | null;
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
