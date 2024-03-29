import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArchivosService } from 'src/app/services/archivos.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private location: Location, private archivo: ArchivosService, private http:HttpClient) { }
  datos: any = []
  token = localStorage.getItem('token');
  rol = localStorage.getItem('Rol');
  id = Number(localStorage.getItem('idUser'));
  img: any = []
  imagenes: any = [];
  ngOnInit(): void {
    this.getParametros()
  }

  getParametros() {
    const token: any = localStorage.getItem('token');
    const { idUser, Nombre, Apellido, Rol }: any = decode(token);
    const { idNutria, NombreNutria, ApellidoNutria, RolNutria  }: any = decode(token);
    if( Rol == 'usuario' || Rol=='admin'){
      localStorage.setItem('Nombre', Nombre)
      localStorage.setItem('Apellido', Apellido)
      localStorage.setItem('idUser', idUser)
      localStorage.setItem('Rol', Rol)
    }
    if( RolNutria == 'nutricionista'){
      localStorage.setItem('Nombre', NombreNutria)
      localStorage.setItem('Apellido', ApellidoNutria)
      localStorage.setItem('Rol', RolNutria)
      localStorage.setItem('idNutri', idNutria)
    }

    this.datos = localStorage.getItem('Nombre') + " " + localStorage.getItem('Apellido')
  }
  removeToken() {
    const removerToken: any = localStorage.removeItem('token');
    const removerNombre: any = localStorage.removeItem('Nombre');
    const removerApellido: any = localStorage.removeItem('Apellido');
    const removerID: any = localStorage.removeItem('idUser');
    const removeRol: any = localStorage.removeItem('Rol')
    const removerIDnutri: any = localStorage.removeItem('idNutri')
  }
  refresh() {
    window.location.reload()
  }

}
