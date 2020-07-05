import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeListComponent } from './components/theme-list/theme-list.component';
import { ThemeComponent } from './components/theme/theme.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { AdminComponent } from './components/admin/admin.component';
import { ModerComponent } from './components/moder/moder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ThemeListComponent,
    ThemeComponent,
    LoginComponent,
    RegisterComponent,
    CreateThemeComponent,
    CreateMessageComponent,
    AdminComponent,
    ModerComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
