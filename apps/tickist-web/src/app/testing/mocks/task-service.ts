import {SpyObject} from '../test.helpers';
import {TaskService} from '../../core/services/task.service';
import {of} from 'rxjs';


export class MockTaskService extends SpyObject {
    fakeResponse;
    responseSuccess: boolean;
    currentTasksFilters$: any;
    tasks$: any;

    constructor() {
        super(TaskService);
        this.fakeResponse = null;
        this.responseSuccess = true;
        this.currentTasksFilters$ =  this.spy('activeDay$').and.returnValue(of([]));
        this.tasks$ = of([]);
    }

    subscribe(success, error) {
        if (this.responseSuccess) {
            success(this.fakeResponse);
        } else {
            error(this.fakeResponse);
        }
    }

    setErrorResponse() {
        this.responseSuccess = false;
    }

    setResponse(json: any): void {
        this.fakeResponse = json;
    }

    getProviders(): Array<any> {
        return [{provide: TaskService, useValue: this}];
    }
}
