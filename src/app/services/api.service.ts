import { Injectable } from '@angular/core';
import { loginI } from '../models/login.interface';
import { response } from '../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  _url = "https://api-rest-tesis.vercel.app/api/login/"

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(user: any): Observable<any> {
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this._url, user,{headers:header});
  }

  singinNutri(user: any): Observable<any> {
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this._url+"nutri", user,{headers:header});
  }

  enter(user: any): Observable<any> {
    return this.http.post(this._url, user);
  }

  isAuth():boolean{
    const token: any = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

}
