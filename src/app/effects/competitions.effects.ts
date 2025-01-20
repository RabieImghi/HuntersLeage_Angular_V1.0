import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CompetitionActions from './../actions/competitions.actions';
import { CompitetionServiceService } from '../service/compitetion-service.service';
import { ParticipationService } from '../service/participation.service';
import Swal from 'sweetalert2';

@Injectable()
export class CompetitionsEffects {
  constructor(
    private actions$: Actions,
    private competitionService: CompitetionServiceService,
    private participationService: ParticipationService
  ) {}

  loadCompetitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.loadCompetitions),
      mergeMap((action) =>
        this.competitionService.getCompitetionList(action.page, action.size).pipe(
          map((response) =>
            CompetitionActions.loadCompetitionsSuccess({
              competitions: response.content,
              totalElements: response.totalElements,
            })
          ),
          catchError((error) =>
            of(CompetitionActions.loadCompetitionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  participateInCompetition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.participateInCompetition),
      mergeMap((action) =>
        this.participationService.createParticipation({ competitionId: action.competitionId }).pipe(
          map(() =>
            CompetitionActions.participateInCompetitionSuccess({
              competitionId: action.competitionId,
            })
          ),
          catchError((error) =>
            of(CompetitionActions.participateInCompetitionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  participateInCompetitionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.participateInCompetitionSuccess),
      map(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'You have successfully participated in the competition!',
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
      })
    ),
    { dispatch: false }
  );

  participateInCompetitionFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.participateInCompetitionFailure),
      map((action) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error participating in the competition: ' + action.error,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
      })
    ),
    { dispatch: false }
  );
}
