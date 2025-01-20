import { createAction, props } from '@ngrx/store';
import { Species } from '../models/species.model';

// Action to load species list
export const loadSpecies = createAction(
  '[Species] Load Species',
  props<{ page: number; size: number }>()
);

// Action when species load is successful
export const loadSpeciesSuccess = createAction(
  '[Species] Load Species Success',
  props<{ species: Species[]; totalElements: number }>()
);

// Action when species load fails
export const loadSpeciesFailure = createAction(
  '[Species] Load Species Failure',
  props<{ error: string }>()
);

// Action for searching species
export const searchSpecies = createAction(
  '[Species] Search Species',
  props<{ searchName: string; page: number; size: number }>()
);
