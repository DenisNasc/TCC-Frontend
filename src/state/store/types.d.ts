import type {TypeAppState} from 'state/reducers/app/types';
import type {TypeUserState} from 'state/reducers/user/types';
import type {TypeCurrentProjectState} from 'state/reducers/currentProject/types';

export type TypeStore = {
    app: TypeAppState;
    user: TypeUserState;
    currentProject: TypeCurrentProjectState;
};
