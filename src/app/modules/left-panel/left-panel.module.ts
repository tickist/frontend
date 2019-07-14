import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TickistSingleTaskModule} from '../../single-task/single-task.module';
import {TickistSharedModule} from '../../shared/shared.module';
import {TickistMaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LeftPanelComponent } from './pages/left-panel/left-panel.component';
import {WeekDaysComponent} from './components/weekdays/weekdays.component';
import {ChooseDayComponent} from './components/choose-day/choose-day.component';
import {FutureListComponent} from './components/future-list/future-list.component';
import {TickistProjectListModule} from './modules/projects-list/projects-list.module';
import {TickistTagsListModule} from './modules/tags-list/tags-list.module';
import {TickistLeftPanelRoutingModule} from './left-panel-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
    imports: [
        TickistLeftPanelRoutingModule,
        CommonModule,
        TickistMaterialModule,
        TickistSingleTaskModule,
        TickistSharedModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TickistProjectListModule,
        TickistTagsListModule,
        FontAwesomeModule
    ],
    declarations: [
        LeftPanelComponent,
        WeekDaysComponent,
        ChooseDayComponent,
        FutureListComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
    exports: [
        LeftPanelComponent
    ]
})
export class TickistLeftPanelModule { }
