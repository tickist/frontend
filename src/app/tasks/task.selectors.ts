import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TasksState} from './task.reducer';
import * as fromCourse from './task.reducer';
import {
    selectCurrentAssignedToFilter, selectCurrentEstimateTimeFilter,
    selectCurrentMainFilter,
    selectCurrentTagsFilter,
    selectSearchTasksText
} from './filters-tasks.selectors';
import {Task} from '../models/tasks';
import {Tag} from '../models/tags';
import {orderBy} from 'lodash';

import {selectActiveProjectsIds} from '../projects/projects.selectors';
import {selectCurrentSortBy} from './sort-by-tasks.selectors';
export const selectTasksState = createFeatureSelector<TasksState>('task');

export const allTasksLoaded = createSelector(
    selectTasksState,
    tasksState => tasksState.allTasksLoaded
);

export const selectTaskById = (taskId: number) => createSelector(
    selectTasksState,
    tasksState => tasksState.entities[taskId]
);

export const selectAllTasks = createSelector(
    selectTasksState,
    fromCourse.selectAll

);

export const selectAllUndoneTasks = createSelector(
    selectAllTasks,
    tasks => {
        return tasks.filter(task => task.status === 0);
    }
);

export const selectTasksStreamInTagsView = createSelector(
    selectAllTasks,
    selectCurrentTagsFilter,
    selectCurrentAssignedToFilter,
    selectCurrentMainFilter,
    selectSearchTasksText,
    selectCurrentEstimateTimeFilter,
    selectCurrentSortBy,
    (tasks, tagsFilter, assignedToFilter, mainFilter, searchFilter, estimateTimeFilter, currentSortBy) => {
        tasks = tasks
            .filter(Function(`return ${mainFilter.value}`)())
            .filter(Function(`return ${assignedToFilter.value}`)())
            .filter(Function(`return ${estimateTimeFilter.currentFilter_lt.value}`)())
            .filter(Function(`return ${estimateTimeFilter.currentFilter_gt.value}`)());

        if (tagsFilter.value instanceof Array) {
            const tags = new Set(tagsFilter.value);
            tasks = tasks.filter((task: Task) => {
                const result = [];
                task.tags.forEach((tag: Tag) => {
                    if (tags.has(tag.id)) {
                        result.push(tag.id);
                    }
                });
                return result.length === tags.size;
            });
        } else if (tagsFilter.value === 'allTags') {
            tasks = tasks.filter((task) => {
                return !(task.tags.length === 0);
            });
        } else if (tagsFilter.value === 'withoutTags') {
            tasks = tasks.filter((task) => {
                return (task.tags.length === 0);
            });
        }
        if (searchFilter) {
            const re = new RegExp(searchFilter, 'i');
            tasks = tasks.filter((task) => re.test(task.name));
        }
        tasks = orderBy(tasks, currentSortBy.sortKeys, currentSortBy.order);
        return tasks;
    }
);

export const selectTasksStreamInProjectsView = createSelector(
    selectAllTasks,
    selectCurrentTagsFilter,
    selectCurrentAssignedToFilter,
    selectCurrentMainFilter,
    selectSearchTasksText,
    selectCurrentEstimateTimeFilter,
    selectActiveProjectsIds,
    selectCurrentSortBy,
    (tasks, tagsFilter, assignedToFilter, mainFilter, searchFilter, estimateTimeFilter, activeProjectIds, currentSortBy) => {
        tasks = tasks
            .filter(Function(`return ${mainFilter.value}`)())
            .filter(Function(`return ${assignedToFilter.value}`)())
            .filter(Function(`return ${estimateTimeFilter.currentFilter_lt.value}`)())
            .filter(Function(`return ${estimateTimeFilter.currentFilter_gt.value}`)());
        if (activeProjectIds.length > 0) {
            tasks = tasks.filter((task => activeProjectIds.indexOf(task.taskProject.id) > -1));
        }
        if (tagsFilter.value instanceof Array) {
            const tags = new Set(tagsFilter.value);
            tasks = tasks.filter((task: Task) => {
                const result = [];
                task.tags.forEach((tag: Tag) => {
                    if (tags.has(tag.id)) {
                        result.push(tag.id);
                    }
                });
                return result.length === tags.size;
            });
        } else if (tagsFilter.value === 'allTags') {
            tasks = tasks.filter((task) => {
                return !(task.tags.length === 0);
            });
        } else if (tagsFilter.value === 'withoutTags') {
            tasks = tasks.filter((task) => {
                return (task.tags.length === 0);
            });
        }
        if (searchFilter) {
            const re = new RegExp(searchFilter, 'i');
            tasks = tasks.filter((task) => re.test(task.name));
        }
        tasks = orderBy(tasks, currentSortBy.sortKeys, currentSortBy.order);
        return tasks;
    }
);
