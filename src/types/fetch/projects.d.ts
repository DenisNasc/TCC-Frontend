import ResponseDefault from '.';

export type TypeProject = {
    id: string;
    userID: string;
    name: string;
    engineer: string;
    shipyard: string;
    lengthOverall: float;
    lengthPerpendiculars: float;
    breadth: float;
    draft: float;
    createdAt: string;
    updateddAt: string;
};

export interface ResponseGetProjects extends ResponseDefault {
    projects: TypeProject[];
}

export interface ResponsePostProjects extends ResponseDefault {
    projects: TypeProject[];
}

export interface ParamsPostProjects {
    name: string;
    lengthOverall: number | null;
    lengthPerpendiculars: number | null;
    breadth: number | null;
    draft: number | null;
    depth: number | null;
    engineer?: string;
    shipyard?: string;
}

export interface ResponseDelProjects extends ResponseDefault {
    projects: TypeProject[];
}
export interface ResponsePutProjects extends ResponseDefault {
    projects: TypeProject[];
}
