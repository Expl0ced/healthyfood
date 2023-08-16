// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';
// import { Router } from '@angular/router';
// import decode from 'jwt-decode';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   user = {
//     email: "",
//     pass: ""
//   }
//   datos: any = []
//   token = localStorage.getItem('token');
//   emailLen: number = 0

//   constructor(
//     private api: ApiService,
//     private router: Router,
//     private tostada: ToastrService
//   ) { }
//   ngOnInit(): void {
//   }

//   logIn() {
//     console.log(this.user)
//     this.api.singin(this.user).subscribe((res: any) => {
//       for (let element of this.user.email) {
//         for (let x of element) {
//           let caracter = this.user.email.substr(-4)
//           let caracter2 = this.user.email.substr(-3)
//           if (caracter == '.com' || caracter2 == '.es' || caracter2 == '.cl') {
//             if (x == '@') {
//               if (this.user.pass.length >= 10) {
//                 localStorage.setItem('token', res.token);
//                 const { Rol }: any = decode(res.token)
//                 this.tostada.success('Datos Ingresados con exito')

//               }
//               else {
//                 this.tostada.warning('La contraseña ingresada no cumple con el minimo permitido')
//               }
//             }
//             else {
//               this.tostada.warning('El correo ingresado no es válido');
//             }

//           }
//           else {
//             this.tostada.warning('El correo ingresado no corresponde a algun correo permitido')
//           }
//         }
//       }
//       this.router.navigate(['/inicio']);
//     })
//   }
//   logInNutri() {
//     console.log(this.user)
//     this.api.singinNutri(this.user).subscribe((res: any) => {
//       for (let element of this.user.email) {
//         for (let x of element) {
//           let caracter = this.user.email.substr(-4)
//           let caracter2 = this.user.email.substr(-3)
//           if (caracter == '.com' || caracter2 == '.es' || caracter2 == '.cl') {
//             if (x == '@') {
//               if (this.user.pass.length >= 10) {
//                 localStorage.setItem('token', res.token);
//                 const { Rol }: any = decode(res.token)
//                 this.tostada.success('Datos Ingresados con exito')

//               }
//               else {
//                 this.tostada.warning('La contraseña ingresada no cumple con el minimo permitido')
//               }
//             }
//             else {
//               this.tostada.warning('El correo ingresado no es válido');
//             }

//           }
//           else {
//             this.tostada.warning('El correo ingresado no corresponde a algun correo permitido')
//           }
//         }
//       }
//       this.router.navigate(['/inicio']);
//     })
//   }

//   enter(){
//     console.log(this.user)
//     this.api.enter(this.user).subscribe((res: any) =>{
//       console.log(res.token)
//     })
//   }
// }
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
  };
  token = localStorage.getItem('token');
  emailExtension: string = "";

  constructor(
    private api: ApiService,
    private router: Router,
    private tostada: ToastrService
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.emailExtension = this.user.email.substr(-4);
    this.performLogin();
  }

  logInNutri() {
    this.emailExtension = this.user.email.substr(-4);
    this.performLoginNutri();
  }

  enter() {
    console.log(this.user);
    this.api.enter(this.user).subscribe((res: any) => {
      console.log(res.token);
    });
  }

  private performLogin() {
    if (this.isValidEmail() && this.user.pass.length >= 10) {
      this.api.singin(this.user).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        const { Rol }: any = decode(res.token);
        this.tostada.success('Datos Ingresados con éxito');
        this.router.navigate(['/inicio']);
      });
    } else {
      this.displayErrorMessage();
    }
  }

  private performLoginNutri() {
    if (this.isValidEmail() && this.user.pass.length >= 10) {
      this.api.singinNutri(this.user).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        const { Rol }: any = decode(res.token);
        this.tostada.success('Datos Ingresados con éxito');
        this.router.navigate(['/inicio']);
      });
    } else {
      this.displayErrorMessage();
    }
  }

  private isValidEmail(): boolean {
    return ['.com', '.es', '.cl'].includes(this.emailExtension);
  }

  private displayErrorMessage() {
    if (!this.isValidEmail()) {
      this.tostada.warning('El correo ingresado no es válido');
    } else {
      this.tostada.warning('La contraseña ingresada no cumple con el mínimo permitido');
    }
  }
}