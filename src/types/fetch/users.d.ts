import ResponseDefault from '.';

export type TypeUser = {
    id: string;
    name: string;
    password: string;
    email: string;
    createdAt: string;
    updateddAt: string;
};

export interface ResponseGetUsers extends ResponseDefault {
    users: TypeUser[];
}

export interface ResponsePostUsers extends ResponseDefault {
    users: TypeUser[];
}

export interface ParamsPostUsers {
    name: string;
    email: string;
    password: string;
}

export interface ResponseDelUsers extends ResponseDefault {
    users: TypeUser[];
}
export interface ResponsePutUsers extends ResponseDefault {
    users: TypeUser[];
}
