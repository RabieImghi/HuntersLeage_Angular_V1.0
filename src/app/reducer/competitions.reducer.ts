import { createReducer, on } from '@ngrx/store';
import { loadCompetitions, loadCompetitionsSuccess, loadCompetitionsFailure } from './../actions/competitions.actions';
import { Competition } from '../models/competition.model';

export interface State {
  competitions: Competition[];
  totalElements: number;
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  competitions: [],
  totalElements: 0,
  isLoading: false,
  error: null
};

export const competitionReducer = createReducer(
  initialState,
  on(loadCompetitions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadCompetitionsSuccess, (state, { competitions, totalElements }) => ({
    ...state,
    competitions: competitions,
    totalElements: totalElements,
    isLoading: false,
  })),
  on(loadCompetitionsFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  }))
);
