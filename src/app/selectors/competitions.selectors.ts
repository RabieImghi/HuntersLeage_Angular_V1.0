import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompetitionState } from './../state/competitions.state';

export const selectCompetitionState = createFeatureSelector<CompetitionState>('competitions');

export const selectAllCompetitions = createSelector(
  selectCompetitionState,
  (state) => state.competitions
);

export const selectIsLoading = createSelector(
  selectCompetitionState,
  (state) => state.isLoading
);

export const selectTotalElements = createSelector(
  selectCompetitionState,
  (state) => state.totalElements
);

export const selectError = createSelector(
  selectCompetitionState,
  (state) => state.error
);
