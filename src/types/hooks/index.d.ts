import type {PropsDisplayMessage} from 'components/shared/DisplayMessage';

export type TypeFetchStates = {
    start: boolean;
    success: boolean;
    fail: boolean;
};
export type TypeHandleState = React.Dispatch<React.SetStateAction<TypeFetchStates>>;
export type TypeHandleMessage = React.Dispatch<React.SetStateAction<PropsDisplayMessage>>;
export type TypeHandleHookParams<T> = React.Dispatch<React.SetStateAction<T>>;
