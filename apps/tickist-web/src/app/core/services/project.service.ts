import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStore} from '../../store';
import {InviteUser, InviteUserStatus, Project} from '@data/projects';
import {SimpleUser, User} from '@data/users/models';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {TasksFiltersService} from './tasks-filters.service';
import {selectActiveProject, selectActiveProjectsIds, selectAllProjects} from '../selectors/projects.selectors';
import {AngularFirestore} from '@angular/fire/firestore';
import {RequestUpdateProject} from '../actions/projects/projects.actions';
import {Editor} from '@data/users';

const projectsCollectionName = 'projects';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    projects$: Observable<Project[]>;
    team: SimpleUser[];
    selectedProject$: Observable<Project>;
    selectedProjectsIds$: Observable<Array<string>>;

    constructor(private db: AngularFirestore, private store: Store<{}>, public snackBar: MatSnackBar,
                private router: Router, private tasksFiltersService: TasksFiltersService) {

        this.projects$ = this.store.select(selectAllProjects);
        this.selectedProject$ = this.store.select(selectActiveProject);
        this.selectedProjectsIds$ = this.store.select(selectActiveProjectsIds);
    }

    selectProject(project: Project | null) {
        // @TODO move to Efect

        // this.store.dispatch(new projectsAction.SelectProject(project));
        // this.store.dispatch(new tasksAction.DeleteNonFixedAssignedTo({}));
        if (project) {
            // project.shareWith.map((user: (SimpleUser | PendingUser)) => {
            //     if (user.hasOwnProperty('id') && user['id'] !== undefined
            //     && user['id'] !== parseInt(localStorage.getItem('USER_ID'), 10)) {
            //         // this.store.dispatch(new tasksAction.AddNewAssignedTo(
            //         //     new Filter({
            //         //         'id': user['id'],
            //         //         'label': 'assignedTo',
            //         //         'value': (task: Task) => task.owner.id === user['id'],
            //         //         'name': user.username
            //         //     })
            //         // ));
            //     }
            // });
            // this.tasksFiltersService.resetAssignedFilterToAssignedToAll();
        } else {
            // this.team.map((user) => {
            //     this.store.dispatch(new tasksAction.AddNewAssignedTo(
            //             new Filter({
            //                 'id': user.id,
            //                 'label': 'assignedTo',
            //                 'value': (task: Task) => task.owner.id === user.id,
            //                 'name': user.username
            //             })
            //         )
            //     );
            // });
            this.tasksFiltersService.resetAssignedFilterToAssignedToMe();
        }
    }

    addUserToProject(project, email) {
        const entry = {email: email, status: InviteUserStatus.Processing};
        // return Object.assign({}, project, {inviteUserByEmail: [...project.inviteUserByEmail, entry]});

        this.store.dispatch(new RequestUpdateProject(
            {
                project: {
                    id: project.id,
                    changes: Object.assign({}, project, {inviteUserByEmail: [...project.inviteUserByEmail, entry]})
                }
            }));
    }

    removeUserFormShareWithList(project, deletedUser) {
        const shareWith = project.shareWith.filter(user => user.id !== deletedUser.id);
        const shareWithIds = project.shareWithIds.filter(userId => userId !== deletedUser.id);
        this.store.dispatch(new RequestUpdateProject(
            {
                project: {
                    id: project.id,
                    changes: Object.assign({}, project, {shareWith, shareWithIds})
                }
            }));
    }

    deleteUserFromInviteList(project: Project, deletedUser: InviteUser) {
        const inviteUserByEmail = project.inviteUserByEmail.filter(invitedUser => invitedUser.email !== deletedUser.email);
        this.store.dispatch(new RequestUpdateProject(
            {
                project: {
                    id: project.id,
                    changes: Object.assign({}, project, {inviteUserByEmail})
                }
            }));

    }

    createProject(project: Project, user: User) {
        const newProject = this.db.collection(projectsCollectionName).ref.doc();
        const editor = {
            id: user.id,
            email: user.email,
            username: user.username
        } as Editor;
        const newProjectWithLastEditor = {...project, lastEditor: editor};
        return newProject.set(JSON.parse(JSON.stringify({...newProjectWithLastEditor, id: newProject.id})));

        // return this.http.post(`${environment['apiUrl']}/project/`, toSnakeCase(project))
        //     .pipe(map((payload: IProjectApi) => new Project(payload)));
        // .subscribe((payload: IProjectApi) => {
        //     this.snackBar.open('Project has been saved successfully', '', {
        //         duration: 2000,
        //     });
        //     const newProject = new Project(payload);
        //     this.store.dispatch(new projectsAction.CreateProject(newProject));
        //     this.router.navigate(['/home/projects', newProject.id]);
        //     this.loadProjects().subscribe(); // we need to update getAllDescendant set.
        // });
    }

    updateProject(project: Project, user: User, withoutSnackBar = false) {
        const editor = {
            id: user.id,
            email: user.email,
            username: user.username
        } as Editor;
        const projectWithLastEditor = {...project, lastEditor: editor};
        return this.db.collection(projectsCollectionName).doc(project.id).update(JSON.parse(JSON.stringify(projectWithLastEditor)));
    }


    deleteProject(projectId: string) {
        return this.db.collection(projectsCollectionName).doc(projectId).update({isActive: false});
    }

    leaveProject(project: Project) {
        // @TODO remove user from shareWith
        // @TODO remove user from shareWithIds
        return this.db.collection(projectsCollectionName).doc(project.id).update({isActive: false});
    }
}
