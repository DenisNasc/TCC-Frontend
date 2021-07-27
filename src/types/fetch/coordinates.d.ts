import type ResponseDefault from 'types/fetch';

export type ResponseTypeCoordinate = {
    id: string;
    type: string;
    vertical: float;
    transversal: float;
    createdAt: string;
    updateddAt: string;
};

export interface ResponseCoordinates extends ResponseDefault {
    coordinates: ResponseTypeCoordinate[];
    userID: string;
    projectID: string;
    stationID: string;
}
