import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {AppStore} from '../../../store';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Task} from '@data/tasks/models/tasks';
import {Project} from '@data/projects';
import {ProjectService} from '../../services/project.service';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {TagService} from '../../services/tag.service';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {ConfigurationService} from '../../services/configuration.service';
import _ from 'lodash';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SideNavVisibility} from '@data/configurations';


@Component({
    selector: 'tickist-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    tasks: Task[];
    projects: Project[];
    leftSidenavVisibility: SideNavVisibility;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private store: Store<{}>, private taskService: TaskService, private userService: UserService,
                private router: Router, private projectService: ProjectService, private tagService: TagService,
                private media: MediaObserver, private configurationService: ConfigurationService,
                private cd: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.leftSidenavVisibility = new SideNavVisibility(
            {'open': true, 'mode': '', 'position': 'start'});

        this.media.media$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((change: MediaChange) => {
            this.configurationService.updateLeftSidenavVisibility();
            this.cd.detectChanges();
        });

        this.configurationService.leftSidenavVisibility$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((visibility: SideNavVisibility) => {
                if (!_.isEmpty(visibility)) {
                    this.leftSidenavVisibility = visibility;
                    this.cd.detectChanges();
                }
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    closeLeftSidenavVisiblity() {
        this.configurationService.changeOpenStateLeftSidenavVisibility('close');
    }
}
