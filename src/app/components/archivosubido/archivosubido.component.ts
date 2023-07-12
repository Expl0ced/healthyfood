import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ArchivoasignService } from 'src/app/services/archivoasign.service';
import { saveAs } from 'file-saver';

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

  files: any = {}
  path: any = 'C:/Users/explo/app tesis/healthyfood/src/assets/minutas'
  data: any[] = []
  vacio: any = ''
  filename: any[] = []
  digito: any = this.path + this.filename
  fileUrl: SafeUrl | undefined;
  url: any = 'http://localhost:4200/assets/minutas/'
  extension:any=''

  download={
    id:'',
    nombre:'',
    fecha:'',
    imagen:'',
    id_User:''
  }

  constructor(private archivo: ArchivoasignService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.obtenerArchivos()
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(new Blob([this.digito], { type: 'application/pdf' })));

  }

  obtenerArchivos() {
    this.archivo.getArchivos(this.id).subscribe((res: any) => {
      this.files = res
      console.log(this.files)
      for (let elemento = 0; elemento < this.files.length; elemento++) {
        this.data.push(this.files[elemento].imagen)
      }
    })
  }
  prueba() {
    for (let element = 0; element < this.data.length; element++) {
      const ruta = this.data[element];
      console.log(ruta)
      const nombreArchivo = ruta.substring(ruta.lastIndexOf('/') + 1);
      console.log(nombreArchivo, 'esto es de prueba'); // esto imprimirá 'mayo2021.pdf' en la consola
      this.filename.push(nombreArchivo)
    }
  }
  downloadFile() {
    this.archivo.getArchivos(this.id).subscribe((res:any)=>{
        this.download=res
        console.log("AAAAAAAAAAAAAAA",this.download)
    })
    for (let element = 0; element < this.data.length; element++) {
      const ruta = this.data[element];
      this.filename = ruta.substring(ruta.lastIndexOf('/') + 1);

    }
    // const downloadinstance= document.createElement('a')
    // downloadinstance.href=this.url+this.filename
    // downloadinstance.target='_blank';
    // downloadinstance.download='Minuta de '+this.nombre+' '+this.apellido+'.pdf'

    // document.body.appendChild(downloadinstance)
    // downloadinstance.click();
    // document.body.removeChild(downloadinstance)
  } 
}
