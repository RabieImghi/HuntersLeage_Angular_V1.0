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
import { AnalysticsComponent } from './analystics/analystics.component';

export const routes: Routes = [
    {path: '', component: HeroComponent},
    {path: 'competitions', component: CompitionsComponent},
    {path: 'species', component: SpeceisComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'top-three-user', component: TopThreeComponent},
    {path: 'results', component: ResultComponent},
    {path: 'admin', component: HomeAdminComponent, children: [
        {path: 'competitions', component: ManageCompetitionsComponent},
        {path: 'hunts', component: ManageHuntsComponent},
        {path: 'species', component: ManageSpeciesComponent},
        {path: 'users', component: ManageUsersComponent},
        {path: 'analytics', component: AnalysticsComponent}
        
    ]},
];

