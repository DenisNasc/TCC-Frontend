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
    lengthOverall?: number;
    lengthPerpendiculars?: number;
    breadth?: number;
    draft?: number;
    engineer?: string;
    shipyard?: string;
}

export interface ResponseDelProjects extends ResponseDefault {
    projects: TypeProject[];
}
export interface ResponsePutProjects extends ResponseDefault {
    projects: TypeProject[];
}
