import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import { AuthService } from '../_services/auth.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ErrorLoggerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(`Error log: ${err.message}`)
      return throwError(err);
    }));
  }
}

