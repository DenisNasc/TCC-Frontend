import {
    HIDROSTATICS_UPDATE_DRAFTS,
    HIDROSTATICS_UPDATE_HIDROSTATICS,
} from 'state/actions/hidrostatics';

import type {TypeHidrostaticsReducer, TypeHidrostaticsState, TypeHidrostaticsAction} from './types';

const initialState: TypeHidrostaticsState = {
    drafts: [0],
    hidrostatics: [
        {
            draft: 0,
            volume: 0,
            displacement: 0,
            LCB: 0,
            VCB: 0,
            BM: 0,
            MT1: 0,
            LCF: 0,
            CB: 0,
            CP: 0,
            wetedSurface: 0,
        },
    ],
};

const HidrostaticsReducer: TypeHidrostaticsReducer = (
    state = initialState,
    action: TypeHidrostaticsAction
) => {
    const {type, payload} = action;

    switch (type) {
        case HIDROSTATICS_UPDATE_DRAFTS: {
            return {...state, drafts: payload.drafts || state.drafts};
        }
        case HIDROSTATICS_UPDATE_HIDROSTATICS: {
            console.log(payload.hidrostatics);
            return {...state, hidrostatics: payload.hidrostatics || state.hidrostatics};
        }
        default: {
            return {...state};
        }
    }
};

export default HidrostaticsReducer;
