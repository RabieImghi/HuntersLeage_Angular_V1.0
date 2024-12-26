import { Routes } from '@angular/router';
import { HeroComponent } from './front-student/hero/hero.component';
import { CompitionsComponent } from './componenet/compitions/compitions.component';
import { SpeceisComponent } from './componenet/speceis/speceis.component';
import { LoginComponent } from './componenet/auth/login/login.component';
import { RegisterComponent } from './componenet/auth/register/register.component';
import { TopThreeComponent } from './componenet/top-three/top-three.component';
import { ResultComponent } from './componenet/result/result.component';
export const routes: Routes = [
    {path: '', component: HeroComponent},
    {path: 'competitions', component: CompitionsComponent},
    {path: 'species', component: SpeceisComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'top-three-user', component: TopThreeComponent},
    {path: 'results', component: ResultComponent}
];
