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

  addUserToModers(username: string) : Observable<any> {
    return this.http.post(`${this.userUrl}/addToModers`, JSON.stringify(username)).pipe(catchError(err => {
      return of(err);
    }));
  }

  getAllModers(): Observable<string[]> {

    return this.http.get<string[]>(`${this.userUrl}/moders`);
  }

}
