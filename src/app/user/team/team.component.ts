import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {SimpleUser} from '../models';
import {ConfigurationService} from '../../services/configuration.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {selectTeam} from '../team.selectors';
import {Store} from '@ngrx/store';
import {AppStore} from '../../store';

@Component({
    selector: 'tickist-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
    team$: Observable<SimpleUser[]>;
    staticUrl: string;

    constructor(private store: Store<AppStore>, private configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.configurationService.changeOpenStateLeftSidenavVisibility('close');
        this.configurationService.changeOpenStateRightSidenavVisibility('close');
        this.staticUrl = environment['staticUrl'];
        this.team$ = this.store.select(selectTeam);
    }

    ngOnDestroy(): void {
        this.configurationService.updateLeftSidenavVisibility();
        this.configurationService.updateRightSidenavVisibility();
        this.configurationService.updateAddTaskComponentVisibility(true);
    }

}
