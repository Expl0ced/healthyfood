import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from 'src/app/services/receta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-receta',
  templateUrl: './subir-receta.component.html',
  styleUrls: ['./subir-receta.component.css']
})
export class SubirRecetaComponent {
  nombre:any = localStorage.getItem('Nombre');
  apellido:any = localStorage.getItem('Apellido');
  userid:any = localStorage.getItem('idUser');
  rol:any=localStorage.getItem('Rol')
  title = 'fileUpload';
  images = '';
  imgURL = '/assets/noimage.png';
  public recetas={
    IdReceta:0,
    Encabezado:'',
    Ingredientes:'',
    Preparacion:'',
    Detalles:'',
    Notas:'',
    Imagen:'',
    Etiqueta:'',
  }
  public ultima:any={}
  constructor(private recipe:RecetaService, private tostada: ToastrService, private router: Router, private http: HttpClient){ }


  ngOnInit(): void {
    this.ultimareceta();
  }

  subirReceta(){
    this.recipe.postReceta(this.recetas).subscribe(res=>{
      this.recetas=res
      console.log(this.recetas)
    })

    this.onSubmitRecipe
    this.onSubmitEtiqueta
  }
  showTostada() {
    this.tostada.success('Receta agregada con exito')
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
  onSubmitRecipe(idUser: any) {
    idUser = this.ultima.IdReceta
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('idUser', this.userid);


    this.http.post<any>('http://localhost:3300/imgrecipe', formData).subscribe(
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
  onSubmitEtiqueta(idUser: any) {
    idUser = this.ultima.IdReceta
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('idUser', this.userid);


    this.http.post<any>('http://localhost:3300/imgetiqueta', formData).subscribe(
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

  ultimareceta(){
    this.recipe.lastRecipe().subscribe(res=>{
      this.ultima=res
      console.log(this.ultima)
    })
  }
}
