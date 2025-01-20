import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from '../reducer/species.reducer';

// Selector for the species feature state
export const selectSpeciesState = createFeatureSelector<SpeciesState>('species');

// Selector to get the list of species
export const selectSpeciesList = createSelector(
  selectSpeciesState,
  (state) => state.speciesList
);

// Selector to get the loading state
export const selectIsLoading = createSelector(
  selectSpeciesState,
  (state) => state.isLoading
);

// Selector to get the total number of species
export const selectTotalElements = createSelector(
  selectSpeciesState,
  (state) => state.totalElements
);

// Selector to check if the species list is empty
export const selectIsEmpty = createSelector(
  selectSpeciesState,
  (state) => state.isEmpty
);
