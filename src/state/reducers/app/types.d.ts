import type {Reducer, Action} from 'redux';

export type TypeAppState = {
    darkMode: boolean;
    language: 'pt-br' | 'en';
    filter: string;
};

export type TypeAppPayload = any;

export type TypeAppAction = Action<string, TypeAppPayload>;

export type TypeAppReducer = Reducer<TypeAppState, TypeAppAction>;
