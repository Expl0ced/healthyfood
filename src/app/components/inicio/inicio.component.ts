import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router){}

  id: any = localStorage.getItem('idUser');
  nombre: any = localStorage.getItem('Nombre')
  apellido: any = localStorage.getItem('Apellido')
  rol: any = localStorage.getItem('Rol')

  ngOnInit(){
    this.reloadPage()
  }

  reloadPage() {

    if(this.rol=='nutricionista'){
      this.router.navigate(['orden'])
    }
    else{
      this.router.navigate(['recetas'])
    }

  }

}



