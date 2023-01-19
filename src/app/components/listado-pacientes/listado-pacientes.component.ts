import { Component, OnInit } from '@angular/core';
import { ordenNutri } from 'src/app/models/ordenNutri';
import { usuario } from 'src/app/models/usuario';
import { ModificarUserService } from 'src/app/services/modificar-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {

  public usuarios: Array<usuario> = []
  public orden: Array<ordenNutri> = []
  public ordenNutri = {
    idOrden: 0,
    nombreNutri: localStorage.getItem('Nombre'),
    apellidoNutri: localStorage.getItem('Apellido'),
    idClienteNutri: 0
  }
  nombre: any = localStorage.getItem('Nombre')
  apellido: any = localStorage.getItem('Apellido')
  rol: any = localStorage.getItem('Rol')

  constructor(private listado: ModificarUserService, private tostada: ToastrService) { }

  ngOnInit(): void {
    this.UserLibres()
  }
  UserLibres() {
    this.listado.getUserLibres().subscribe((resp: any) => {
      this.usuarios = resp
      console.log(this.usuarios)
    })
  }
  showTostada() {
    this.tostada.success('Usuario Asignado con exito')
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }
  asignarUsuario(id: number) {
    this.ordenNutri.idClienteNutri = id
    this.listado.asigUser(this.ordenNutri).subscribe((resp: any) => {
      console.log(resp)
      console.log(this.ordenNutri)
      this.showTostada()
    })
  }

}
