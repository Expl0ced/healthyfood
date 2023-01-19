import { Component } from '@angular/core';
import { ArchivoasignService } from 'src/app/services/archivoasign.service';

@Component({
  selector: 'app-archivosubido',
  templateUrl: './archivosubido.component.html',
  styleUrls: ['./archivosubido.component.css']
})
export class ArchivosubidoComponent {

  nombre: any = localStorage.getItem('Nombre')
  apellido: any = localStorage.getItem('Apellido')
  rol: any = localStorage.getItem('Rol')
  id: any = localStorage.getItem('idUser')

  files:any={}


  constructor(private archivo:ArchivoasignService){}

  ngOnInit(){
    this.obtenerArchivos()
  }

  obtenerArchivos(){
    this.archivo.getArchivos(this.id).subscribe((res:any)=>{
      this.files=res
      console.log(this.files)
    })
  }

}
