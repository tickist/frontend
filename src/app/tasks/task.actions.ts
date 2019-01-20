import {Action} from '@ngrx/store';
import {Task} from '../models/tasks';
import {Update} from '@ngrx/entity';
import {CLOSE_MENU_IN_TASKS} from '../reducers/actions/tasks';

export enum TaskActionTypes {
    REQUEST_ALL_TASKS = '[] REQUEST_ALL_TASKS',
    REQUEST_CREATE_TASK = '[] REQUEST_CREATE_TASK',
    REQUEST_UPDATE_TASK = '[] REQUEST_UPDATE TASK',
    REQUEST_DELETE_TASK = '[] REQUEST_DELETE_TASK',
    ADD_TASKS = '[] ADD_TASKS',
    CREATE_TASK = '[] CREATE_TASK',
    UPDATE_TASK = '[] UPDATE_TASK',
    DELETE_TASK = '[] DELETE_TASK',
    CLOSE_MENU_IN_ALL_TASKS = '[] CLOSE MENU IN ALL TASKS'
}


export class RequestsAllTasks implements Action {
    readonly type = TaskActionTypes.REQUEST_ALL_TASKS;
}

export class RequestCreateTask implements Action {
    readonly type = TaskActionTypes.REQUEST_CREATE_TASK;

    constructor(public payload: { task: Task }) {
    }
}

export class AddTasks implements Action {
    readonly type = TaskActionTypes.ADD_TASKS;

    constructor(public payload: { tasks: Task[] }) {
    }
}

export class CreateTask implements Action {
    readonly type = TaskActionTypes.CREATE_TASK;

    constructor(public payload: { task: Task, progressBar?: true, snackBar?: true}) {
    }
}

export class UpdateTask implements Action {
    readonly type = TaskActionTypes.UPDATE_TASK;

    constructor(public payload: { task: Update<Task>, progressBar?: true, snackBar?: true }) {
    }
}

export class DeleteTask implements Action {
    readonly type = TaskActionTypes.DELETE_TASK;

    constructor(public payload: { taskId: number }) {
    }
}

export class CloseMenuInAllTasks implements Action {
    readonly type = TaskActionTypes.CLOSE_MENU_IN_ALL_TASKS;

    constructor(public payload: {tasks: Update<Task>[]}) {
    }
}



export type TaskActions = AddTasks
    | DeleteTask
    | UpdateTask
    | CreateTask
    | RequestsAllTasks
    | RequestCreateTask
    | CloseMenuInAllTasks;
