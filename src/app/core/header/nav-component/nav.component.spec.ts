import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {MockProjectService} from '../../../testing/mocks/project-service';
import {MockConfigurationService} from '../../../testing/mocks/configurationService';
import {TickistMaterialModule} from '../../../material.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NavComponent} from './nav.component';
import {TickistSharedModule} from '../../../shared/shared.module';
import {MockUserService} from '../../../testing/mocks/userService';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MockTaskService} from '../../../testing/mocks/task-service';
import {MockTasksFiltersService} from '../../../testing/mocks/tasks-filters-service';
import {StoreModule} from '@ngrx/store';

let comp: NavComponent;
let fixture: ComponentFixture<NavComponent>;


describe('Component: Nav', () => {
    beforeEach(async(() => {
        const projectService = new MockProjectService();
        const userService = new MockUserService();
        const tasksService = new MockTaskService();
        const tasksFiltersService = new MockTasksFiltersService();
        const configurationService = new MockConfigurationService();

        TestBed.configureTestingModule({
            imports: [
                TickistMaterialModule,
                TickistSharedModule,
                FlexLayoutModule,
                RouterModule.forRoot([]),
                StoreModule.forRoot({})
            ],
            declarations: [NavComponent],
            providers: [
                userService.getProviders(),
                projectService.getProviders(),
                tasksFiltersService.getProviders(),
                tasksService.getProviders(),
                configurationService.getProviders(),
                {provide: APP_BASE_HREF, useValue: '/'}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(NavComponent);
            comp = fixture.componentInstance;

        });
    }));
    it('should create an instance', () => {
        expect(comp).toBeTruthy();
    });
});
