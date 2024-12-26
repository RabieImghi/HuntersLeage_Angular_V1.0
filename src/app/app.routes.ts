import { Routes } from '@angular/router';
import { HeroComponent } from './front-student/hero/hero.component';
import { CompitionsComponent } from './componenet/compitions/compitions.component';
import { SpeceisComponent } from './componenet/speceis/speceis.component';

export const routes: Routes = [
    {path: '', component: HeroComponent},
    {path: 'competitions', component: CompitionsComponent},
    {path: 'species', component: SpeceisComponent}
];
