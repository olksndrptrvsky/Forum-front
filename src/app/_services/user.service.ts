import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserToRegister} from '../_models/UserToRegister';
import {Observable, of, throwError} from 'rxjs';
import {RegistrationResult} from '../_models/RegistrationResult';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string = '/api/user';

  constructor(private http: HttpClient) { }


  register(user: UserToRegister): Observable<RegistrationResult> {
    return this.http.post<RegistrationResult>(this.userUrl + '/registration', user).pipe(
      catchError( err => {
        return of(err.error);
      })
    );
  }

}
