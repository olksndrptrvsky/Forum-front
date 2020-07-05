import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ThemeComponent} from './components/theme/theme.component';
import {ThemeListComponent} from './components/theme-list/theme-list.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuard} from './_guard/auth.guard';
import {Role} from './_models/Role';
import {ModerComponent} from './components/moder/moder.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/themes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'theme/:id', component: ThemeComponent },
  { path: 'themes', component: ThemeListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: Role.Admin } },
  { path: 'moder', component: ModerComponent, canActivate: [AuthGuard], data: { roles: Role.User } },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
