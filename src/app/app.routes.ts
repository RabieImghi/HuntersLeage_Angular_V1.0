import { Routes } from '@angular/router';
import { HeroComponent } from './front-student/hero/hero.component';
import { CompitionsComponent } from './componenet/compitions/compitions.component';
import { SpeceisComponent } from './componenet/speceis/speceis.component';
import { LoginComponent } from './componenet/auth/login/login.component';
import { RegisterComponent } from './componenet/auth/register/register.component';
import { TopThreeComponent } from './componenet/top-three/top-three.component';
import { ResultComponent } from './componenet/result/result.component';
import { HomeAdminComponent } from './front-admin/home-admin/home-admin.component';
import { ManageCompetitionsComponent } from './front-admin/manage-competitions/manage-competitions.component';
import { ManageHuntsComponent } from './front-admin/manage-hunts/manage-hunts.component';
import { ManageSpeciesComponent } from './front-admin/manage-species/manage-species.component';
import { ManageUsersComponent } from './front-admin/manage-users/manage-users.component';
import { AnalysticsComponent } from './front-admin/analystics/analystics.component';
import { isJuryGuardGuard } from './guard/is-jury-guard.guard';
import { isAdminGuardGuard } from './guard/is-admin-guard.guard';
import { UnauthorizedComponent } from './componenet/unauthorized/unauthorized.component';
import { LogoutComponent } from './componenet/auth/logout/logout.component';

export const routes: Routes = [
    {path: '', component: HeroComponent},
    {path: 'competitions', component: CompitionsComponent},
    {path: 'Unauthorized', component: UnauthorizedComponent},
    {path: 'species', component: SpeceisComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'admin/logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'top-three-user', component: TopThreeComponent},
    {path: 'results', component: ResultComponent},
    {path: 'admin', component: HomeAdminComponent,canActivate: [isJuryGuardGuard], children: [
        {path: 'competitions', component: ManageCompetitionsComponent},
        {path: 'hunts', component: ManageHuntsComponent},
        {path: 'species', component: ManageSpeciesComponent, canActivate: [isAdminGuardGuard]},
        {path: 'users', component: ManageUsersComponent,canActivate: [isAdminGuardGuard]},
        {path: 'analytics', component: AnalysticsComponent}

    ]},
];

