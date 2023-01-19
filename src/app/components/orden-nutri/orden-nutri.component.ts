import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ListaUsersService } from 'src/app/services/lista-users.service';
import { OrdenNutriService } from 'src/app/services/orden-nutri.service';

@Component({
  selector: 'app-orden-nutri',
  templateUrl: './orden-nutri.component.html',
  styleUrls: ['./orden-nutri.component.css']
})
export class OrdenNutriComponent implements OnInit {

  public ordenes: Array<any> = []

  id: any = localStorage.getItem('idUser');
  nombre: any = localStorage.getItem('Nombre')
  apellido: any = localStorage.getItem('Apellido')
  rol: any = localStorage.getItem('Rol')
  // ordenes: any = {
  //   idOrden: 0,
  //   nombreNutri: '',
  //   apellidoNutri: '',
  //   nombreCliente: '',
  //   apellidoCliente: '',
  //   idClienteNutri: 0,
  //   Rol: this.rol
  // }
  comodin:any={
    idClienteNutri:0,
    Img:''
  }
  constructor(private ordenNutri: OrdenNutriService, private users: ListaUsersService) { }

  ngOnInit(): void {
    this.obtenerOrdenesNombre();
  }



  obtenerOrdenes() {
    this.ordenNutri.verOrdenes(this.id).subscribe((resp: any) => {
      this.ordenes = resp
      console.log(this.ordenes)
    })
  }
  obtenerOrdenesNombre() {
    this.ordenNutri.verOrdenesNombre(this.nombre, this.apellido).subscribe((resp: any) => {
      this.ordenes = resp
      console.log(this.ordenes)
    })
  }
}