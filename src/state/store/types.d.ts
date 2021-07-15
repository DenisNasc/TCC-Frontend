import type {TypeAppState} from 'state/reducers/app/types';
import type {TypeUserState} from 'state/reducers/user/types';
import type {TypeProjectsState} from 'state/reducers/projects/types';

export type TypeStore = {
    app: TypeAppState;
    user: TypeUserState;
};
