import { Component, OnInit } from '@angular/core';
import { ListaUsersService } from 'src/app/services/lista-users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  constructor(
    private _userservice: ListaUsersService, private tostada: ToastrService,
    private router: Router) { }

  loading = false;
  user = {
    idUser: 0,
    Nombre: "",
    Apellido: "",
    Rol: "",
    Email: "",
    Password: "",
    Sintomas: "",
    Img: "",
    Asignado: "",
    Peso: 0,
    Peso_Anterior: 0,
    Peso_Anterior2: 0,
    Altura: 0,
    IMC: 0,
    IMC_Anterior: 0,
    IMC_Anterior2: 0,
    Contex_Fisica: '',
    Genero: ''
  }
  emailLen: number = 0



  registrarUsuario() {
    this.emailLen = this.user.Email.length
    if ((this.user.Nombre == 'Aquiles' && this.user.Apellido == 'Brinco') || (this.user.Nombre == 'Aquiles' && this.user.Apellido == 'Baeza' || this.user.Apellido == 'Castro' || this.user.Apellido == 'Bailo') || (this.user.Nombre == 'Aquiles' || this.user.Nombre == 'Debora' && this.user.Apellido == 'Baeza Parada')
      || (this.user.Nombre == 'Armando ' && this.user.Apellido == 'Casas') || (this.user.Nombre == 'Débora ' && this.user.Apellido == 'Melo') || (this.user.Nombre == 'Debora ' && this.user.Apellido == 'Melo') || (this.user.Nombre == 'Dévora ' && this.user.Apellido == 'Melo')
      || (this.user.Nombre == 'Devora ' && this.user.Apellido == 'Melo') || (this.user.Nombre == 'Elsa' && this.user.Apellido == 'Polindo' || this.user.Apellido == 'Pato' || this.user.Apellido == 'Pito' || this.user.Apellido == 'Podiondo' || this.user.Apellido == 'Capunta' || this.user.Apellido == 'Pallo') ||
      (this.user.Nombre == 'Elba' && this.user.Apellido == 'Calao' || this.user.Apellido == 'Zurita' || this.user.Apellido == 'Lazo') || (this.user.Nombre == 'Luz' && this.user.Apellido == 'Roja') || (this.user.Nombre == 'Marcia' && this.user.Apellido == 'Ana') || (this.user.Nombre == 'Rosamel' && this.user.Apellido == 'Forrito' || this.user.Apellido == 'Fierro') ||
      (this.user.Nombre == 'Susana' && this.user.Apellido == 'Orio') || (this.user.Nombre == 'Zacarias' || this.user.Nombre == 'Zacarias' && this.user.Apellido == 'Flores del Campo') || (this.user.Nombre == 'Keca' && this.user.Apellido == 'Galindo') || (this.user.Nombre == 'Elma' && this.user.Apellido == 'Montt ') ||
      (this.user.Nombre == 'Sole' && this.user.Apellido == 'Dolio') || (this.user.Nombre == 'Lucho' && this.user.Apellido == 'Pay') || (this.user.Nombre == 'Armando' && this.user.Apellido == 'Mocha') || (this.user.Nombre == 'Paloma Maria' || this.user.Nombre == 'Sevelinda' && this.user.Apellido == 'Parada') || (this.user.Nombre == 'Alma Marcela' && this.user.Apellido == 'Goza de Alegria') ||
      (this.user.Nombre == 'Guillermo' && this.user.Apellido == 'Nigote') || (this.user.Nombre == 'Elvis' && this.user.Apellido == 'Tek') || (this.user.Nombre == 'Alan' && this.user.Apellido == 'Brito Delgado') || (this.user.Nombre == 'Benito' && this.user.Apellido == 'Camelo') || (this.user.Nombre == 'Dolores' && this.user.Apellido == 'Del ano' || this.user.Apellido == 'Delano') ||
      (this.user.Nombre == 'Elmer' && this.user.Apellido == 'Curio') || (this.user.Nombre == 'Mary' && this.user.Apellido == 'Conazo') || (this.user.Nombre == 'Mario' && this.user.Apellido == 'Neta') || (this.user.Nombre == 'Soila' && this.user.Apellido == 'Cerda') || (this.user.Nombre == 'Zampa' && this.user.Apellido == 'Testa') ||
      (this.user.Nombre == 'Pato Carlos' && this.user.Apellido == 'Bustos de la Vaca') || (this.user.Nombre == 'Jorge' && this.user.Apellido == 'Nitales') || (this.user.Nombre == 'Elva' && this.user.Apellido == 'Gins') || (this.user.Nombre == 'Esteban' && this.user.Apellido == 'Dido') || (this.user.Nombre == 'Jose' && this.user.Apellido == 'Lamata Feliz') ||
      (this.user.Nombre == 'Rosa' && this.user.Apellido == 'Molcacho' || this.user.Apellido == 'Meza Cabeza') || (this.user.Nombre == 'Yola' && this.user.Apellido == 'Prieto') || (this.user.Nombre == 'Elvio' && this.user.Apellido == 'Lao') || (this.user.Nombre == 'Elver' && this.user.Apellido == 'Gallina Parada') ||
      (this.user.Nombre == 'Miren' && this.user.Apellido == 'Amiano')) {

      this.tostada.warning('por el Registro Civil Chileno', 'Nombre Prohibido', { positionClass: 'toast-bottom-right' });
    }
    else {
      let caracter: string = this.user.Email.substring(this.emailLen - 4, this.emailLen) || ''
      let caracter2: string = this.user.Email.substring(this.emailLen - 3, this.emailLen) || ''
      for (let element of this.user.Email) {
        for (let x of element) {
          if (caracter == '.com' || caracter2 == '.es' || caracter2 == '.cl') {
            console.log(x)
            if (x == '@') {
              if (this.user.Password.length >= 10) {
                this._userservice.createUser(this.user).subscribe(res => {
                  console.log(res);
                  console.log(this.user)
                }, err => console.log(err))
                this.tostada.success('Ha sido crreado exitosamente ', 'El usuario', {
                  positionClass: 'toast-bottom-right'
                });
                setTimeout(() => {
                  this.router.navigate(['recetas']);
                }, 500);
              }
              else {
                console.log('estoy aqui')
                this.tostada.warning('No tiene el largo minimo permitido', 'La contraseña', {
                  positionClass: 'toast-bottom-right'
                })
              }
            }
            else {
              
              this.tostada.warning('No es valido', 'El correo ingresado', { positionClass: 'toast-bottom-right' })
            }
          } else {
            this.tostada.warning('No es valido', 'El correo ingresado', { positionClass: 'toast-bottom-right' })
          }
        }
      }

    }
    // this._userservice.createUser(this.user).subscribe(res => {
    //   console.log(res);
    //   console.log(this.user)
    // }, err => console.log(err))
  }

  ngOnInit(): void {
  }

  // showTostada() {
  //   this.tostada.success('Usuario registrado con exito')
  //   setTimeout(() => {
  //     this.router.navigate(['recetas']);
  //   }, 500); wwwww
  // }

  usuarioExiste(){
    this._userservice.usuarioExists(this.user.Email, this.user.Password).subscribe((res:any) =>{
      console.log(res)
      if(Object.entries(res).length === 0){
        this.registrarUsuario()
      }
      else{
        this.tostada.warning('ya utilizados', 'Correo o Contraseña', { positionClass: 'toast-bottom-right' })
      }
    })
  }

}

