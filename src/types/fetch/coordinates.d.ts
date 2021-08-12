import type ResponseDefault from '.';

export type TypeCoordinate = {
    id: string;
    type: string;
    vertical: float;
    transversal: float;
    createdAt: string;
    updateddAt: string;
};

export interface ResponseGetCoordinates extends ResponseDefault {
    coordinates: ResponseTypeCoordinate[];
}
