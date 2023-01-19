import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { usuario } from 'src/app/models/usuario';
import { ModificarUserService } from 'src/app/services/modificar-user.service';

@Component({
  selector: 'app-listado-pacientes-form',
  templateUrl: './listado-pacientes-form.component.html',
  styleUrls: ['./listado-pacientes-form.component.css']
})
export class ListadoPacientesFormComponent implements OnInit {

  constructor(private listado:ModificarUserService, private activerouter:ActivatedRoute) { }
  public usuarios:any={}
  nombre=localStorage.getItem('Nombre')
  apellido=localStorage.getItem('Apellido')
  orden={
    idOrden:0,
    nombreNutri:this.nombre,
    apellidoNutri:this.apellido,
    nombreCliente:'',
    apellidoCliente:'',
    idClienteNutri:10
  }
  ngOnInit(): void {
    this.verUser()
  } 
  

  verUser(){
    let userid:any=this.activerouter.snapshot.paramMap.get('id')
    this.listado.getusuario(userid).subscribe((resp:any)=>{
      this.usuarios=resp
      console.log(this.usuarios)
    })
  }

  InsertOrden(){
    this.listado.postOrden(this.orden).subscribe(resp=>{
      console.log(resp)
      this.orden=resp
    })
  }
}
