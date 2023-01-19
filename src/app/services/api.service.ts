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

_url="/api/login"



  constructor(
    private http:HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(user:any){
    return this.http.post(this._url, user);
  }

  isAuth():boolean{
    const token:any = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

}
