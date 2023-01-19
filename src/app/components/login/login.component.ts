import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    pass: ""
  }
  datos: any = []
  token = localStorage.getItem('token');

  constructor(
    private api: ApiService,
    private router: Router,
    private tostada: ToastrService
  ) { }
  ngOnInit(): void {
  }

  logIn() {
    this.api.singin(this.user).subscribe((res: any) => {
      console.log(res);
      for (let element of this.user.email) {
        for (let x of element) {
          let caracter = this.user.email.substr(-4)
          let caracter2 = this.user.email.substr(-3)
          if (caracter == '.com' || caracter2 == '.es' || caracter2 == '.cl') {
            if (x == '@') {
              if(this.user.pass.length>=10){
                localStorage.setItem('token', res.token);
                const { Rol }:any = decode(res.token)
                this.tostada.success('Datos Ingresados con exito')
                
              }
              else{
                this.tostada.warning('La contraseña ingresada no cumple con el minimo permitido')
              }
            }
            else {
            }

          }
          else{
            this.tostada.warning('El correo ingresado no corresponde a algun correo permitido')
          }
        }
      }
    })
  }
}
