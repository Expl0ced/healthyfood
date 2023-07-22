import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuadroService } from 'src/app/services/cuadro.service';
import { ListaUsersService } from 'src/app/services/lista-users.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent {

  usuarioid: any = this.activerouter.snapshot.paramMap.get('id')
  rol:any=localStorage.getItem('Rol')
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
    IMC_Anterior:0,
    IMC_Anterior2:0,
    Contex_Fisica:'',
    Genero: ''
  }


  constructor(private activerouter: ActivatedRoute, private router: Router, private usuario:ListaUsersService, private _Cuadroservice: CuadroService){

  }
  ngOnInit(): void{
    this.ObtenerUsuario()
  }
  ObtenerUsuario() {
    this._Cuadroservice.getusuario(this.usuarioid).subscribe(res => {
      this.user = res
    })
  }
  ModificarUsuario(){
    this._Cuadroservice.updateUser(this.user, this.user.idUser).subscribe(res =>{
      this.user=res
    })
  }
}
