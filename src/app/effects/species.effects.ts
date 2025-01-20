import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SpeciesActions from '../actions/species.actions';
import { SpeciesServiceService } from '../service/species-service.service';

@Injectable()
export class SpeciesEffects {
  constructor(
    private actions$: Actions,
    private speciesService: SpeciesServiceService
  ) {}

  // Effect to load species
  loadSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeciesActions.loadSpecies),
      mergeMap((action) =>
        this.speciesService.getSpeciesList(action.page, action.size).pipe(
          map((response) =>
            SpeciesActions.loadSpeciesSuccess({
              species: response.content,
              totalElements: response.totalElements,
            })
          ),
          catchError((error) =>
            of(SpeciesActions.loadSpeciesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  searchSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeciesActions.searchSpecies),
      mergeMap((action) =>
        this.speciesService.searchSpecies(action.searchName, action.page, action.size).pipe(
          map((response) =>
            SpeciesActions.loadSpeciesSuccess({
              species: response.content,
              totalElements: response.totalElements,
            })
          ),
          catchError((error) =>
            of(SpeciesActions.loadSpeciesFailure({ error: error.message }))
          )
        )
      )
    )
  );
  
}
