import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public baseUrl = 'https://chatapi.edwisor.com/api/v1/';

  // private authToken = 'Mjc4MjVlOTY5M2I3NTE5ZDY1ZWViYzYzMGVjZGMwZWUwMWFhNjkyMmE3M2ExZjZmMmY0MGIwYTg3ZmY0MGIwZTYzYzQ2YmFiZWNhZTI4ZWFjZDExN2E2MjM3MTlhY2MzZmUxMzg4YTgwYjNjMmMzN2Q5NzBhYmE0Y2NiOTJmZGM2ZQ==';

  public signUpFn(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    return this.http.post<any>(this.baseUrl + 'user/signup', params).pipe(
      catchError(this.handleError)
    )
  }

  public loginFn(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post<any>(this.baseUrl + 'users/login', params).pipe(
      catchError(this.handleError)
    )
  }
  
  public handleError(error:HttpErrorResponse) {
    return throwError(error || 'Server error');
  }

  constructor(private http: HttpClient) { }
}
