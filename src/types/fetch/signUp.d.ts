import ResponseDefault from '.';

export interface ResponseGetSignUp extends ResponseDefault {
    userID: string;
}

export interface ResponsePostSignUp extends ResponseDefault {
    userID: string;
}

export interface ParamsPostSignUp {
    email: string;
    name: string;
    password: string;
}

export interface ResponseDelSignUp extends ResponseDefault {
    userID: string;
}
export interface ResponsePutSignUp extends ResponseDefault {
    userID: string;
}
