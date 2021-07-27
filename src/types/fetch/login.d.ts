import ResponseDefault from 'types/fetch';

export default interface ResponseLogin extends ResponseDefault {
    userID: string;
}
