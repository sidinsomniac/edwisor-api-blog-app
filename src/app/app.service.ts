import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public baseUrl = 'https://chatapi.edwisor.com/api/v1/';

  // private authToken = 'Mjc4MjVlOTY5M2I3NTE5ZDY1ZWViYzYzMGVjZGMwZWUwMWFhNjkyMmE3M2ExZjZmMmY0MGIwYTg3ZmY0MGIwZTYzYzQ2YmFiZWNhZTI4ZWFjZDExN2E2MjM3MTlhY2MzZmUxMzg4YTgwYjNjMmMzN2Q5NzBhYmE0Y2NiOTJmZGM2ZQ==';

  constructor(private http: HttpClient, private cookie: CookieService) { }

  public getUserInfoLocalStorage() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoLocalStrorage(data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  public signUpFn(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    return this.http.post<any>(this.baseUrl + 'users/signup', params).pipe(
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

  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.cookie.get('authtoken'))
    return this.http.post(`${this.baseUrl}/api/v1/users/logout`, params);
  }
  
  public handleError(error:HttpErrorResponse) {
    return throwError(error || 'Server error');
  }

}
