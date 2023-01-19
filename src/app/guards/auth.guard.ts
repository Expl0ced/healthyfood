import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private api:ApiService,
    private router:Router
  ){ }
  canActivate():boolean{    
    if(!this.api.isAuth()){
      console.log('Token no es valido o ya expiro')
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
  
}
