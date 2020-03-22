import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksFromProjectsComponent} from './pages/tasks-from-projects/tasks-from-projects.component';
import {BlankComponent} from '../../shared/components/blank/blank.component';




const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                outlet: 'content',
                component: TasksFromProjectsComponent
            },
            // Blank component is here bacause angular has a bug: https://github.com/angular/angular/issues/20694#issuecomment-595707956
            {
                path: '',
                component: BlankComponent
            }
        ],
    },
    {
        path: ':projectId',
        children: [
            {
                path: '',
                outlet: 'content',
                component: TasksFromProjectsComponent
            }, {
                path: '',
                component: BlankComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TickistTasksProjectsViewRoutingModule {}
