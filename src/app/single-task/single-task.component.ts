import {
    Component, OnInit, Input, OnDestroy, OnChanges, SimpleChange, ChangeDetectionStrategy,
    AfterViewInit, ElementRef, ViewChild, Renderer2, HostListener
} from '@angular/core';
import {TaskService} from '../services/task-service';
import {Task} from '../models/tasks';
import {ConfigurationService} from '../services/configurationService';
import {TimeDialogComponent} from './time-dialog/time-dialog.component';
import {MatDialog} from '@angular/material';
import {ProjectService} from '../services/project-service';
import {Project} from '../models/projects';
import {DeleteTaskDialogComponent} from './delete-task-dialog/delete-task.dialog.component';
import * as _ from 'lodash';
import {Subject, pipe} from 'rxjs';
import {RepeatStringExtension} from '../pipes/repeatStringExtension';
import {takeUntil} from 'rxjs/operators';
import {Step} from '../models/steps';


class Timer {
    readonly start = performance.now();

    constructor(private readonly name: string) {
    }

    stop() {
        const time = performance.now() - this.start;
        //console.log('Timer:', this.name, 'finished in', Math.round(time), 'ms');
    }
}


class SingleTask {
    task: Task;
    isRightMenuVisible = false;
    isFastMenuVisible = false;
    isMouseOver = false;

    constructor(public taskService: TaskService, public dialog: MatDialog) {

    }

    changeShowing(show) {
        const oldValue = this.task.menuShowing[show];
        this.task.menuShowing.hideAllMenuElements();
        if (show !== undefined) {
            this.task.menuShowing[show] = !oldValue;
        }
    }

    isSharedList(): boolean {
        return this.task.taskProject.shareWith.length > 0;
    }

    hideAllMenuElements(): void {
        this.task.menuShowing.hideAllMenuElements();
    }

    toggleDoneStep(step) {
        this.task.steps.forEach((s: Step) => {
            if (s.id === step.id) {
                if (s.status === 1) {
                    s.status = 0;
                } else {
                    s.status = 1;
                }
            }
        });
        this.taskService.updateTask(this.task);
    }

    toggleDone() {
        if (this.task.status === 0) {
            this.task.status = 1;
            if (this.task.taskProject.dialogTimeWhenTaskFinished) {
                const dialogRef = this.dialog.open(TimeDialogComponent, {
                    data: {'task': this.task}
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        debugger;
                        this.task.estimateTime = result['estimateTime'];
                        this.task.time = result['realTime'];
                    }
                    this.taskService.updateTask(this.task);
                });
            } else {
                this.taskService.updateTask(this.task);
            }
        } else if (this.task.status === 1) {
            this.task.status = 0;
            this.taskService.updateTask(this.task);
        } else if (this.task.status === 2) {
            this.task.status = 0;
            this.taskService.updateTask(this.task);
        }

    }

    togglePin(): void {
        this.task.pinned = !this.task.pinned;
        this.taskService.updateTask(this.task);
    }

    changePriority(priority: string) {
        if (this.task.priority !== priority) {
            this.task.priority = priority;
            this.taskService.updateTask(this.task);
        }
    }

    changeDate(date: string) {
        let delta;
        if (date === 'today') {
            delta = 'today';
        } else if (date === 'next_day') {
            delta = 1;
        } else if (date === 'next_week') {
            delta = 7;
        } else if (date === 'next_month') {
            delta = 30;
        }
        this.task.moveFinishDateFromPreviousFinishDate(delta);
        this.taskService.updateTask(this.task);
    }


    deleteTask() {
        const dialogRef = this.dialog.open(DeleteTaskDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(this.task);
            }
        });
    }

    saveTimeValues(time) {
        this.task.time = time.time;
        this.task.estimateTime = time.estimateTime;
    }


}


@Component({
    selector: 'app-single-task',
    templateUrl: './single-task.component.html',
    styleUrls: ['./single-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleTaskComponent extends SingleTask implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @Input() task;
    @Input() mediaChange;
    @ViewChild('container') container: ElementRef;

    dateFormat = 'DD-MM-YYYY';
    projects: Project[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    typeFinishDateOptions: {};
    repeatString = '';
    repeatStringExtension;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.isMouseOver = true;
        this.changeRightMenuVisiblity();
        this.isRightMenuVisible = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isMouseOver = false;
        this.changeRightMenuVisiblity();
        if (!this.isFastMenuVisible) {
            this.isRightMenuVisible = false;
        }

    }

    changeRightMenuVisiblity() {
        if (this.isMouseOver) {
            this.isRightMenuVisible = true;
        }
        if (!this.isMouseOver && this.isFastMenuVisible) {
            this.isRightMenuVisible = true;
        }
        if (!this.isMouseOver && !this.isFastMenuVisible) {
            this.isRightMenuVisible = false;
        }
    }

    private timer: Timer;
    private t2: Timer;

    constructor(public taskService: TaskService, public configurationService: ConfigurationService,
                public dialog: MatDialog, protected projectService: ProjectService, private renderer: Renderer2) {
        super(taskService, dialog);
        this.repeatStringExtension = new RepeatStringExtension(this.configurationService);
    }

    ngOnInit() {
        this.projectService.projects$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((projects) => {
            this.projects = _.orderBy(projects, ['isInbox', 'name'], ['desc', 'asc']);
            // this.t2.stop();  // Prints the time elapsed to the JS console.
        });
        if (this.mediaChange && this.mediaChange.mqAlias === 'xs') {
            this.dateFormat = 'DD-MM';
        }
        const repeatDelta = this.task.repeatDelta;
        const repeatDeltaExtension = this.repeatStringExtension.transform(this.task.repeat);
        this.repeatString = `every ${repeatDelta} ${repeatDeltaExtension}`;
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.container.nativeElement, 'flow');
        this.renderer.addClass(this.container.nativeElement, 'row');
    }

    // When change detection begins
    ngDoCheck() {
        this.timer = new Timer(`single task component ${this.task.name}`);
    }


    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngAfterViewChecked() {
        this.timer.stop();  // Prints the time elapsed to the JS console.
    }

    changeAssignedTo(event) {
        this.task.owner = this.task.taskProject.shareWith.find(user => user.id === event.value);
        this.taskService.updateTask(this.task, true, true);
    }

    changeProject(event) {
        this.task.taskProject = this.projects.find(project => project.id === event.value);
        this.taskService.updateTask(this.task, true, true);
    }

    removeTag(tag) {
        this.task.removeTag(tag);
        this.taskService.updateTask(this.task);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes.hasOwnProperty('mediaChange') && changes['mediaChange'].hasOwnProperty('currentValue')
            && changes['mediaChange'].currentValue && changes['mediaChange'].currentValue.mqAlias === 'xs') {
            this.dateFormat = 'DD-MM';
        } else {
            this.dateFormat = 'DD-MM-YYYY';
        }
    }

    changeFastMenuVisible(value) {
        this.isFastMenuVisible = value;
        this.changeRightMenuVisiblity();
        console.log(value);
    }
}


@Component({
    selector: 'app-single-task-simplified',
    templateUrl: './single-task-simplified.component.html',
    styleUrls: ['./single-task-simplified.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleTaskSimplifiedComponent extends SingleTask implements OnInit, AfterViewInit {
    @Input() task;
    finishDateVisible = true;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.isMouseOver = true;
        this.changeRightMenuVisiblity();
        this.isRightMenuVisible = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isMouseOver = false;
        this.changeRightMenuVisiblity();
        if (!this.isFastMenuVisible) {
            this.isRightMenuVisible = false;
        }

    }

    constructor(public taskService: TaskService, public dialog: MatDialog) {
        super(taskService, dialog);
    }

    ngOnInit() {
        console.time(`simple single task component ${this.task.name}`);
    }

    ngAfterViewInit() {
        console.log('stop');
        console.timeEnd(`simple single task component ${this.task.name}`);
    }

    changeRightMenuVisiblity() {
        if (this.isMouseOver) {
            this.isRightMenuVisible = true;
            this.finishDateVisible = false;
        }
        if (!this.isMouseOver && this.isFastMenuVisible) {
            this.isRightMenuVisible = true;
            this.finishDateVisible = false;
        }
        if (!this.isMouseOver && !this.isFastMenuVisible) {
            this.isRightMenuVisible = false;
            this.finishDateVisible = true;
        }
    }

    changeFastMenuVisible(value) {
        this.isFastMenuVisible = value;
        this.changeRightMenuVisiblity();
        console.log(value);
    }

}
