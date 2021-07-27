import type ResponseDefault from 'types/fetch';

export type ResponseTypeStation = {
    id: string;
    name: string;
    longitudinal: string;
    createdAt: string;
    updatedAt: string;
};

export interface ResponseStations extends ResponseDefault {
    stations: ResponseTypeStation[];
    projectID: string;
    userID: string;
}
