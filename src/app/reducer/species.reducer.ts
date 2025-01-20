import { createReducer, on } from '@ngrx/store';
import * as SpeciesActions from '../actions/species.actions';
import { Species } from '../models/species.model';

export interface SpeciesState {
  speciesList: Species[];
  totalElements: number;
  isLoading: boolean;
  isEmpty: boolean;
  error: string | null;
}

export const initialState: SpeciesState = {
  speciesList: [],
  totalElements: 0,
  isLoading: false,
  isEmpty: false,
  error: null,
};

export const speciesReducer = createReducer(
  initialState,
  on(SpeciesActions.loadSpecies, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(SpeciesActions.loadSpeciesSuccess, (state, { species, totalElements }) => ({
    ...state,
    speciesList: species,
    totalElements,
    isLoading: false,
    isEmpty: species.length === 0,
  })),
  on(SpeciesActions.loadSpeciesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(SpeciesActions.searchSpecies, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  }))
);
