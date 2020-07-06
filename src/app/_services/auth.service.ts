import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../_models/User';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl: string = '/api/user';

  constructor(private http: HttpClient) { }

  login(username: string, password: string, rememberMe: boolean): void {
    let userCred: any = {};
    userCred.username = username;
    userCred.password = password;
    this.logout();
    this.http.post<User>(this.userUrl + '/login', JSON.stringify(userCred) )
      .subscribe(user =>
    {
      if (user!= null)
      {
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
    });
  }


  getCurrentUser(): User {
    let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) return currentUser;
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return currentUser;
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  }


  userIsLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null ||
      sessionStorage.getItem('currentUser') != null;
  }


}
