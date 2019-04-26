import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TickistMaterialModule} from '../material.module';
import {TickistSingleTaskModule} from '../single-task/single-task.module';
import {TickistSharedModule} from '../shared/shared.module';
import {SortTasksComponent} from './sort-tasks/sort-tasks.component';
import {SortByDialogComponent} from './sort-tasks-dialog/sort-tasks.dialog.component';
import {EstimateTimeDialogComponent} from './estimate-time-dialog/estimate-time-dialog.component';
import {AssignedToDialogComponent} from './assigned-to-dialog/assigned-to.dialog.component';
import {FilterTasksComponent} from './filter-tasks/filter-tasks.component';
import {TagsFilterDialogComponent} from './tags-filter-dialog/tags-filter-dialog.component';
import {TasksFilterDialogComponent} from './tasks-filter-dialog/tasks-filter-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SliderModule} from 'primeng/primeng';
import { NoTasksComponent } from '../single-task/no-tasks/no-tasks.component';
import { StoreModule } from '@ngrx/store';
import * as fromTask from '../core/reducers/tasks/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from '../core/effects/task.effects';
import {TaskService} from '../core/services/task.service';
import * as fromFilterTasks from '../core/reducers/tasks/main-filters-tasks.reducer';
import * as fromAssignedToFiltersTasks from '../core/reducers/tasks/assigned-to-filters-tasks.reducer';
import * as fromEstimateTimeFiltersTasks from '../core/reducers/tasks/estimate-time-filters-tasks.reducer';
import * as fromTagsFiltersTasks from '../core/reducers/tasks/tags-filters-tasks.reducer';
import { AssignedToFiltersTasksEffects } from '../core/effects/assigned-to-filters-tasks.effects';
import * as fromSearchTasks from '../core/reducers/tasks/search-tasks.reducer';
import { TasksFiltersEffects } from '../core/effects/tasks-filters.effects';


@NgModule({
    imports: [
        CommonModule,
        TickistMaterialModule,
        TickistSingleTaskModule,
        TickistSharedModule,
        FormsModule,
        ReactiveFormsModule,
        SliderModule,




    ],
    declarations: [SortTasksComponent, SortByDialogComponent, EstimateTimeDialogComponent, AssignedToDialogComponent, FilterTasksComponent,
        TagsFilterDialogComponent, TasksFilterDialogComponent],
    providers: [
        TaskService
    ],
    entryComponents: [SortByDialogComponent, AssignedToDialogComponent, EstimateTimeDialogComponent, AssignedToDialogComponent,
        TagsFilterDialogComponent, TasksFilterDialogComponent
    ],
    exports: [
        SortTasksComponent, FilterTasksComponent, NoTasksComponent
    ]
})
export class TickistTasksModule { }
