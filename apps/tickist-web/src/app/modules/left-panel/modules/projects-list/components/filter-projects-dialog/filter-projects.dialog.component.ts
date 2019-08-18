import { MatDialogRef } from '@angular/material/dialog';
import {Component, OnDestroy} from '@angular/core';
import {ProjectsFiltersService} from '../../projects-filters.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AppStore} from '../../../../../../store';
import {Store} from '@ngrx/store';
import {selectAllProjectsFilters, selectCurrentProjectFilter} from '../../projects-filters.selectors';
import {Filter} from '@tickist/data/filter';
import {SetCurrentProjectFilter} from '../../projects-filters.actions';


@Component({
    selector: 'app-filter-projects',
    templateUrl: './filter-projects.dialog.component.html',
})
export class FilterProjectDialogComponent implements OnDestroy {
    filtersValues: any = [];
    filterValueId: number;
    filters: Filter[];
    filters$: Observable<Filter[]>;
    projectsCurrentFilter$: Observable<Filter>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(public dialogRef: MatDialogRef<FilterProjectDialogComponent>, private store: Store<AppStore>) {

        this.filters$ = this.store.select(selectAllProjectsFilters);
        this.projectsCurrentFilter$ = this.store.select(selectCurrentProjectFilter);
        this.projectsCurrentFilter$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((filter: Filter) => {
            this.filterValueId = filter.id;
        });

        this.filters$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((filters: Filter[]) => {
            this.filters = filters;
        });
    }

    close(result) {
        this.dialogRef.close(result);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeFilter($event) {
        if (this.filters.length > 0) {
            const newCurrentFilter = this.filters.find(filter => filter.id === $event.value);
            this.store.dispatch(new SetCurrentProjectFilter({currentFilter: newCurrentFilter}));
            this.dialogRef.close();

        }

    }

}
