import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from 'src/app/services/receta.service';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-subir-receta',
  templateUrl: './subir-receta.component.html',
  styleUrls: ['./subir-receta.component.css']
})
export class SubirRecetaComponent {
  nombre: any = localStorage.getItem('Nombre');
  apellido: any = localStorage.getItem('Apellido');
  userid: any = localStorage.getItem('idUser');
  rol: any = localStorage.getItem('Rol')
  title = 'fileUpload';
  imagesCabecera: any = '';
  imagesEtiqueta:any='';
  imgURL = '/assets/noimage.png';
  public recetas = {
    IdReceta: 0,
    Encabezado: '',
    Ingredientes: '',
    Preparacion: '',
    Detalles: '',
    Notas: '',
    Imagen: '',
    Etiqueta: '',
  }
  public number:any
  public ultima: any = {}
  private pasteEvent = false;
  constructor(private recipe: RecetaService, private tostada: ToastrService, private router: Router, private http: HttpClient) { }


  ngOnInit(): void {
    this.ultimareceta();
  }

  subirReceta() {
    this.recipe.postReceta(this.recetas).subscribe(res => {
      this.recetas = res
      console.log(this.recetas)

    })
    this.onSubmitEtiqueta(this.ultima.IdReceta)
    this.onSubmitRecipe(this.ultima.IdReceta)
  }
  showTostada() {
    this.tostada.success('Receta agregada con exito')
  }



  selectImageCabecera(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const newName = this.number+'Cabecera.jpg';
      const newFile = new File([file], newName, { type: file.type });

      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      this.imagesCabecera = newFile;
      console.log(this.imagesCabecera)
    }
}
  selectImageEtiqueta(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const newName = this.number+'Etiqueta.jpg';
      const newFile = new File([file], newName, { type: file.type });

      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      this.imagesEtiqueta = newFile;
      console.log(this.imagesEtiqueta)
    }
}
  onSubmitRecipe(idUser: any) {
    idUser = this.ultima.IdReceta
    const formData = new FormData();
    formData.append('file', this.imagesCabecera);
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
    formData.append('file', this.imagesEtiqueta);
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

  ultimareceta() {
    this.recipe.lastRecipe().subscribe(res => {
      this.ultima = res
      console.log(this.ultima, 'ultima receta arriba')
      this.ultima.IdReceta += 1;
      this.number=this.ultima.IdReceta
      console.log(this.ultima, 'id de la receta que se subira')
      console.log(this.number,'number')
    })
  }
  addSymbol(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const lines = textarea.value.split('\n');
    const lastLine = lines.pop(); // Remueve la última línea vacía

    if (lastLine && event.key === 'Enter') {
      const symbol = '♦'; // El símbolo que deseas agregar al final de cada línea
      const newLine = lastLine.trim() + symbol;
      lines.push(newLine);
      textarea.value = lines.join('\n');
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }
}
