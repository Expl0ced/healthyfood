import { Component } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ListaUsersService } from 'src/app/services/lista-users.service';

@Component({
  selector: 'app-subir-pdf',
  templateUrl: './subir-pdf.component.html',
  styleUrls: ['./subir-pdf.component.css']
})
export class SubirPDFComponent {
  id:any = localStorage.getItem('idUser')
  rol: any = localStorage.getItem('Rol')
  token: any = localStorage.getItem('token');
  private filetemp: any;
  imagenactual=''

  title = 'fileUpload';
  images = '';
  imgURL = '/assets/noimage.png';
  multipleImages = [];
  imagenes: any = [];
  nombre:any = localStorage.getItem('Nombre');
  apellido:any = localStorage.getItem('Apellido');
  userid:any = localStorage.getItem('idUser');
  custom: any = {
    idUser: this.userid,
    nombre: this.nombre,
    apellido: this.apellido
  }


  constructor(private archivo: ArchivosService, private http: HttpClient, private users:ListaUsersService) { }

  ngOnInit() {
    this.mostrarImg();
    this.imagenActual();
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      this.images = file;
      console.log(this.images)
    }
  }

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(idUser: any) {
    idUser = this.userid
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('idUser', this.userid);
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);


    this.http.post<any>('http://localhost:3300/img', formData).subscribe(
      (res) => console.log(res, Swal.fire({
        icon: 'success',
        title: 'Imagen cargada!!',
        text: 'La imagen se subio correctamente!'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      })
      ),
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no subio nada!!'
      })
    );
    this.imgURL = '/assets/noimage.png';
  }
  onSubmitFile(idUser: any) {
    idUser = this.userid
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('idUser', this.userid);
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);


    this.http.post<any>('http://localhost:3300/file', formData).subscribe(
      (res) => console.log(res, Swal.fire({
        icon: 'success',
        title: 'Imagen cargada!!',
        text: 'La imagen se subio correctamente!'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      })
      ),
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no subio nada!!'
      })
    );
    this.imgURL = '/assets/noimage.png';
  }


  mostrarImg() {

    this.http.get<any>('http://localhost:3300/upload').subscribe(res => {

      this.imagenes = res;
      const reader = new FileReader();
      reader.onload = (this.imagenes);

    });

  }

  deleteImg(id: any) {

    Swal.fire({
      icon: 'info',
      title: 'Desea eliminar la imagen?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<any>(`http://localhost:3300/delete/${id}`).subscribe(res => {

          console.log(res, location.reload());

        });
      }
    });
  }
  imagenActual(){
    this.users.getusuario(this.id).subscribe(res=>{
      this.imagenactual=res.Img
      console.log(this.imagenactual)
    })
  }
}


