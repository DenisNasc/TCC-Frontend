import {type} from 'os';
import {useSelector} from 'react-redux';
import type {TypeStore} from 'state/store/types';

const useReduxStore = (): TypeStore => {
    const store = useSelector<TypeStore, TypeStore>(state => state);

    return store;
};

export default useReduxStore;
