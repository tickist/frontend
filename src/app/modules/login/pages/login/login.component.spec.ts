import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {MockProjectService} from '../../../../testing/mocks/project-service';
import {MockConfigurationService} from '../../../../testing/mocks/configurationService';
import {TickistMaterialModule} from '../../../../material.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LoginComponent} from './login.component';
import {TickistRoutingModule} from '../../../../routing.module';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MockUserService} from '../../../../testing/mocks/userService';
import {AuthService} from '../../../../core/services/auth.service';
import {StoreModule} from '@ngrx/store';

let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

class AuthServiceMock {}

describe('Component: Login', () => {
    beforeEach(async(() => {
        const userService = new MockUserService();
        const configurationService = new MockConfigurationService();

        TestBed.configureTestingModule({
            imports: [TickistMaterialModule, RouterModule.forRoot([]), StoreModule.forRoot({})],
            declarations: [LoginComponent],
            providers: [
                userService.getProviders(),
                configurationService.getProviders(),
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: AuthService, useValue: AuthServiceMock}
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            comp = fixture.componentInstance;

        });
    }));
    it('should create an instance', () => {
        expect(comp).toBeTruthy();
    });
});
