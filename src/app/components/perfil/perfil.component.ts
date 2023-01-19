import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ListaUsersService } from 'src/app/services/lista-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  id: any = localStorage.getItem('idUser');
  nombre: any = localStorage.getItem('Nombre')
  apellido: any = localStorage.getItem('Apellido')
  rol: any = localStorage.getItem('Rol')

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
    Peso_Anterior:0,
    Peso_Anterior2:0,
    Altura: 0,
    IMC: 0,
    Genero: ''
  }
  title = 'fileUpload';
  images = '';
  imgURL = '/assets/noimage.png';
  multipleImages = [];
  imagenes: any = [];
  userid: any = localStorage.getItem('idUser');

  constructor(private users: ListaUsersService, private http: HttpClient) { }

  ngOnInit(): void {
    this.datosUsuario()
  }

  datosUsuario() {
    this.users.getusuario(this.id).subscribe((res: any) => {
      this.user = res
      console.log(this.user)
    })
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


}
