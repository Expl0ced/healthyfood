import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private api:ApiService,
    public router:Router
  ){}
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data['expectedRole'];
    const token:any = localStorage.getItem('token');

    const { Rol }:any= decode(token)


    if(!this.api.isAuth() || Rol !== expectedRole){
      console.log('usuario no autorizado para la vista');
      return false;
    }else{
      console.log("Usuario Autorizado para entrar")
    }
    
    return true;
  }
}

