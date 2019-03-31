import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProgressBarState} from '../core/reducers/progress-bar.reducer';
import {ApiErrorState} from '../core/reducers/detect-api-error.reducer';
import {OfflineModeBarState} from '../core/reducers/offline-mode.reducer';
import {AddTaskButtonVisibilityState} from '../core/reducers/add-task-button-visibility.reducer';



export const selectProgressBarState = createFeatureSelector<ProgressBarState>('progressBar');
export const selectApiErrorState = createFeatureSelector<ApiErrorState>('detectApiError');
export const selectOfflineModeState = createFeatureSelector<OfflineModeBarState>('offlineMode');
export const selectAddTaskButtonVisibilityState = createFeatureSelector<AddTaskButtonVisibilityState>('addTaskButtonVisibility');


export const selectProgressBarIsEnabled = createSelector(
    selectProgressBarState,
    progressBar => progressBar.progressBar.isEnabled
);
export const selectApiErrorBarIsVisible = createSelector(
    selectApiErrorState,
    apiError => apiError.apiError.showApiErrorBar
);
export const selectOfflineModeBarIsVisible = createSelector(
    selectOfflineModeState,
    offlineMode => offlineMode.offlineModeBar.isEnabled
);

export const selectAddTaskButtonVisibility = createSelector(
    selectAddTaskButtonVisibilityState,
    addTaskButtonVisibility => addTaskButtonVisibility.addTaskButtonVisibility.isVisible
);



