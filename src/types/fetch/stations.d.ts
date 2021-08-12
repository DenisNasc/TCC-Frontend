import type ResponseDefault from '.';

export type TypeStation = {
    id: string;
    name: string;
    longitudinal: string;
    createdAt: string;
    updatedAt: string;
};

export interface ResponseGetStations extends ResponseDefault {
    stations: TypeStation[];
}
