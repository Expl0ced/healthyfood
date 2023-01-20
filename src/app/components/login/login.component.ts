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
  emailLen:number=0

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
      this.emailLen=this.user.email.length || 0
      let caracter: string = this.user.email.substring(this.emailLen - 4, this.emailLen) || ''
      let caracter2: string = this.user.email.substring(this.emailLen - 3, this.emailLen) || ''
      for (let element of this.user.email) {
        for (let x of element) {
          if (x == '@') {
            if (this.user.pass.length >= 10) {
              localStorage.setItem('token', res.token);
              const { Rol }: any = decode(res.token)
              this.tostada.success('Datos Ingresados con exito')

            }
            else {
              this.tostada.warning('La contraseña ingresada no cumple con el minimo permitido')
            }
          }
          else {
          }

        }
      }
    })
  }
}
