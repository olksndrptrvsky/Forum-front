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
import {CreateThemeComponent} from './components/create-theme/create-theme.component';


const routes: Routes = [
  { path: '', redirectTo: '/themes/latest/1', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createTheme', component: CreateThemeComponent, canActivate: [AuthGuard], data: { roles: Role.User } },
  { path: 'theme/:id', component: ThemeComponent },
  { path: 'themes/:filter', redirectTo: '/themes/:filter/1', pathMatch: 'full' },
  { path: 'themes/:filter/:page', component: ThemeListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: Role.Admin } },
  { path: 'moder', component: ModerComponent, canActivate: [AuthGuard], data: { roles: Role.Moder } },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
