import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './logger.interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './error.interceptor';

import { CompetitionsEffects } from './effects/competitions.effects';
import { competitionReducer } from './reducer/competitions.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ competitions: competitionReducer }),
    provideEffects([CompetitionsEffects]),
    provideRouter(routes), 
    provideAnimations(), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loggerInterceptor, errorInterceptor]))],
};
