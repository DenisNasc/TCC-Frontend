import type {Reducer} from 'redux';

export type TypeHidrostatic = {
    draft: number;
    volume: number;
    displacement: number;
    LCB: number;
    VCB: number;
    BM: number;
    MT1: number;
    LCF: number;
    CB: number;
    CP: number;
    wetedSurface: number;
};

export type TypeHidrostaticsState = {
    drafts: number[];
    hidrostatics: TypeHidrostatic[];
};

export type TypeHidrostaticsPayload = {
    drafts?: number[];
    hidrostatics?: TypeHidrostatic[];
};

export type TypeHidrostaticsAction = {type: string; payload: TypeHidrostaticsPayload};

export type TypeHidrostaticsReducer = Reducer<TypeHidrostaticsState, TypeHidrostaticsAction>;
