import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeekdaysComponent} from './pages/weekdays/weekdays.component';
import {BlankComponent} from '../../shared/components/blank/blank.component';


// Blank component is here bacause angular has a bug: https://github.com/angular/angular/issues/20694#issuecomment-595707956
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: '',
                outlet: 'content',
                component: WeekdaysComponent
            },
            {
                path: '',
                component: BlankComponent
            }
        ],
    },
    {
        path: ':date',
        children: [
            {
                path: '',
                outlet: 'content',
                component: WeekdaysComponent
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
export class TickistWeekdaysRoutingModule {
}
