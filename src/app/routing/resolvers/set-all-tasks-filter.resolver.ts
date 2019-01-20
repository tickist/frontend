import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Project} from '../../models/projects';
import {TasksFiltersService} from '../../tasks/tasks-filters.service';
import {Observable} from 'rxjs';

@Injectable()
export class SetAllTasksFilterResolver implements Resolve<Project> {
    constructor(private tasksFiltersService: TasksFiltersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.tasksFiltersService.setAllTasksFilter();
    }
}
