import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MyErrorHandler} from './services/error-handler.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartModule, MenuModule, SharedModule, SliderModule, TieredMenuModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {UserService} from './core/services/user.service';
import {ProjectService} from './services/project.service';
import {TagService} from './services/tag.service';
import {ConfigurationService} from './services/configuration.service';
import {StatisticsService} from './services/statistics.service';
import {TimeDialogComponent} from './single-task/time-dialog/time-dialog.component';
import {ErrorService} from './services/error.service';
import {TypeFinishDateString} from './shared/pipes/typeFinishDateString';
import {metaReducers, reducers} from './store';
import {DeleteTaskDialogComponent} from './single-task/delete-task-dialog/delete-task.dialog.component';
import {BlankComponent, RootComponent} from './testing/test.modules';
import {MyDateAdapter} from './shared/data-adapter';
import {environment} from '../environments/environment';
import {JwtModule} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptorService} from './httpInterceptor';
import {TasksFiltersService} from './core/services/tasks-filters.service';
import {ProjectsFiltersService} from './modules/left-panel/modules/projects-list/projects-filters.service';
import {TagsFiltersService} from './services/tags-filters.service';
import {TickistMaterialModule} from './material.module';
import {ChangeFinishDateDialogComponent} from './single-task/change-finish-date-dialog/change-finish-date-dialog.component';
import {TickistRoutingModule} from './routing.module';
import {TickistSharedModule} from './shared/shared.module';
import {TickistSingleTaskModule} from './single-task/single-task.module';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './testing/mocks/inMemryDb';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TickistCoreModule} from './core/core.module';
import {SortablejsModule} from 'ngx-sortablejs';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faArrowDown,
    faArrowsAlt,
    faArrowsAltV,
    faArrowUp,
    faBars,
    faBell,
    faCalendar,
    faChartLine,
    faCog,
    faComment,
    faCompress,
    faCompressArrowsAlt,
    faDesktop,
    faEdit,
    faEllipsisV,
    faExpand,
    faFastForward,
    faFilter,
    faFolder,
    faList, faPause,
    faPenSquare,
    faPlus,
    faQuestion,
    faRedo,
    faReply,
    faReplyAll,
    faSearch,
    faShare,
    faSitemap,
    faSort,
    faSun,
    faTag,
    faTags,
    faThumbtack,
    faTimes,
    faTrashAlt,
    faWrench
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';


export function tokenGetter() {
    return localStorage.getItem('JWT');
}


@NgModule({
    declarations: [
        AppComponent,
        DeleteTaskDialogComponent,
        TimeDialogComponent,
        TypeFinishDateString,
        ChangeFinishDateDialogComponent,
        BlankComponent,
        RootComponent
    ],
    imports: [
        TickistSharedModule,
        TickistSingleTaskModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        environment.e2eTest ?
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 100}) : [],
        StoreModule.forRoot(reducers, {
            initialState: {},
            metaReducers, runtimeChecks: {strictStateImmutability: true, strictActionImmutability: true}
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [],
        SortablejsModule.forRoot({
            animation: 150
        }),
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
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        EffectsModule.forRoot([]),
        TickistRoutingModule,
        TickistCoreModule,
        FontAwesomeModule
        // StoreModule.forFeature('progressBar', fromProgressBar.reducer),
    ],
    bootstrap: [AppComponent],
    entryComponents: [TimeDialogComponent, DeleteTaskDialogComponent, ChangeFinishDateDialogComponent
    ],
    providers: [
        // {provide: LocationStrategy, useClass: HashLocationStrategy},
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
    constructor() {
        // Add an icon to the library for convenient access in other components
        library.add(faBars, faThumbtack, faFilter, faPlus, faSun, faDesktop, faReply, faEllipsisV, faEdit, faFastForward, faTimes, faTags,
        faFolder, faReplyAll, faComment, faRedo, faFilter, faSort, faCalendar, faSitemap, faSearch, faShare, faArrowUp, faArrowDown,
            faPenSquare, faWrench, faBell, faChartLine, faCog, faTag, faList, faQuestion, faArrowsAlt, faTrashAlt, faExpand, faCompress,
            faArrowsAltV, faCompressArrowsAlt, faSquare, faCheckSquare, faPause);
    }

}
