import { createAction, props } from '@ngrx/store';
import { Competition } from '../models/competition.model';

export const loadCompetitions = createAction(
  '[Competition] Load Competitions',
  props<{ page: number; size: number; searchCode?: string }>() 
);

export const loadCompetitionsSuccess = createAction(
  '[Competition] Load Competitions Success',
  props<{ competitions: Competition[]; totalElements: number }>()
);

export const loadCompetitionsFailure = createAction(
  '[Competition] Load Competitions Failure',
  props<{ error: string }>()
);

export const participateInCompetition = createAction(
  '[Competition] Participate In Competition',
  props<{ competitionId: string }>()
);

export const participateInCompetitionSuccess = createAction(
  '[Competition] Participate In Competition Success',
  props<{ competitionId: string }>()
);

export const participateInCompetitionFailure = createAction(
  '[Competition] Participate In Competition Failure',
  props<{ error: string }>()
);
