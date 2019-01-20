import {Action} from '@ngrx/store';


export enum ActiveProjectsIdActionTypes {
    NewActiveProjectsIds = '[ActiveProjectsIds] Add completely new ids',
    AddNewActiveProjectId = '[ActiveProjectsIds] Add new id',
    DeleteActiveProjectId = '[ActiveProjectsId]s Delete id'
}


export class NewActiveProjectsIds implements Action {
    readonly type = ActiveProjectsIdActionTypes.NewActiveProjectsIds;

    constructor(public payload: {projectsIds: Array<number>}) {}
}

export class AddNewActiveProjectId implements Action {
    readonly type = ActiveProjectsIdActionTypes.AddNewActiveProjectId;

    constructor(public payload: {projectId: number}) {}
}

export class DeleteActiveProjectId implements Action {
    readonly type = ActiveProjectsIdActionTypes.DeleteActiveProjectId;

    constructor(public payload: {projectId: number}) {}
}


export type ActiveProjectsIdsActions = NewActiveProjectsIds | AddNewActiveProjectId | DeleteActiveProjectId;
