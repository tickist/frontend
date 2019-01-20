import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DateAdapter } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MyErrorHandler} from './services/error-handler.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartModule, SharedModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {UserService} from './user/user.service';
import {ProjectService} from './services/project.service';
import {HomeComponent} from './home';
import {TagService} from './services/tag.service';
import {NavComponent} from './nav-component/nav.component';
import {TaskComponent} from './task-component/task.component';
import {MenuModule, TieredMenuModule, SliderModule} from 'primeng/primeng';
import {ConfigurationService} from './services/configuration.service';
import {StatisticsService} from './services/statistics.service';
import {SortablejsModule} from 'angular-sortablejs';
import {AddTaskComponent} from './add-task/add-task.component';

import {TimeDialogComponent} from './single-task/time-dialog/time-dialog.component';
import {ErrorService} from './services/error.service';
import {TypeFinishDateString} from './shared/pipes/typeFinishDateString';
import {reducers} from './store';
import {DeleteTaskDialogComponent} from './single-task/delete-task-dialog/delete-task.dialog.component';
import {BlankComponent, RootComponent} from './testing/test.modules';
import {MyDateAdapter} from './shared/data-adapter';
import {environment} from '../environments/environment';
import {AutofocusDirective} from './shared/autofocus';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptorService} from './httpInterceptor';
import { ShowApiErrorComponent } from './show-api-error/show-api-error.component';
import { ShowOfflineModeComponent } from './show-offline-mode/show-offline-mode.component';
import { ShowNotificationAboutNewDayComponent } from './show-notification-about-new-day/show-notification-about-new-day.component';
import {TasksFiltersService} from './tasks/tasks-filters.service';
import {ProjectsFiltersService} from './services/projects-filters.service';
import {TagsFiltersService} from './services/tags-filters.service';
import {TickistMaterialModule} from './material.module';
import {ChangeFinishDateDialogComponent} from './single-task/change-finish-date-dialog/change-finish-date-dialog.component';
import {TickistRoutingModule} from './routing/routing.module';
import {TickistDashboardModule} from './dashboard/dashboard.module';
import {TickistSharedModule} from './shared/shared.module';
import {TickistSingleTaskModule} from './single-task/single-task.module';
import {TickistStatisticsModule} from './statistics/statistics.module';
import { SearchAutocompleteComponent } from './search-autocomplete/search-autocomplete.component';
import {TickistTagsModule} from './tags/tags.module';
import {TickistProjectsModule} from './projects/projects.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './testing/mocks/inMemryDb';
import {TickistUserModule} from './user/user.module';
import { EffectsModule } from '@ngrx/effects';
import {TickistAuthModule} from './auth/auth.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import * as fromProgressBar from './reducers/progress-bar.reducer';

export function tokenGetter() {
    return localStorage.getItem('JWT');
}


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        TaskComponent,
        AddTaskComponent,
        DeleteTaskDialogComponent,
        TimeDialogComponent,
        ShowApiErrorComponent,
        TypeFinishDateString,
        AutofocusDirective,
        ShowOfflineModeComponent,
        ShowNotificationAboutNewDayComponent,
        ShowApiErrorComponent,
        ChangeFinishDateDialogComponent,
        SearchAutocompleteComponent,
        BlankComponent,
        RootComponent
    ],
    imports: [
        TickistDashboardModule,
        TickistSharedModule,
        TickistSingleTaskModule,
        TickistStatisticsModule,
        TickistUserModule,
        TickistAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        environment.e2eTest ?
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }) : [],
        StoreModule.forRoot(reducers, {
            initialState: {}
        }),
        // StoreDevtoolsModule.instrument({
        //     maxAge: 25, // Retains last 25 states
        //     logOnly: environment.production, // Restrict extension to log-only mode
        // }),
        // environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [],
        SortablejsModule,
        TickistMaterialModule,
        MenuModule,
        TieredMenuModule,
        SliderModule,
        ChartModule,
        FlexLayoutModule,
        SharedModule,
        JwtModule.forRoot({
            config: {
                headerName: 'Authorization',
                authScheme: '',
                whitelistedDomains: ['localhost:4200', 'tickist.com', 'app.tickist.com', 'localhost:8000'],
                tokenGetter: tokenGetter
            }
        }),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        TickistRoutingModule,
        TickistTagsModule,
        TickistProjectsModule,
        EffectsModule.forRoot([]),
        // StoreModule.forFeature('progressBar', fromProgressBar.reducer),
    ],
    bootstrap: [AppComponent],
    entryComponents: [TimeDialogComponent, DeleteTaskDialogComponent, ChangeFinishDateDialogComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: DateAdapter, useClass: MyDateAdapter},
        UserService,
        TasksFiltersService,
        ProjectsFiltersService,
        ProjectService,
        TagService,
        TagsFiltersService,
        ConfigurationService,
        StatisticsService,
        MyErrorHandler,
        ErrorService,
        {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
        {
            provide: ErrorHandler,
            useClass: MyErrorHandler
        }
    ]
})
export class AppModule {


}
