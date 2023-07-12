import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecetaService } from 'src/app/services/receta.service';
import Swal from 'sweetalert2';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { list } from 'firebase/storage';

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
  imagesEtiqueta: any = '';
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
  images2: any = [];
  public number: any
  public ultima: any = {}
  private pasteEvent = false;
  constructor(private recipe: RecetaService, private tostada: ToastrService, private router: Router, private http: HttpClient, private storage: Storage) { }


  ngOnInit(): void {
    this.ultimareceta();
  }

  subirReceta() {
    this.recipe.postReceta_prueba(this.recetas).subscribe(res => {
      this.recetas = res
      console.log(this.recetas)

    })
  }
  showTostada() {
    this.tostada.success('Receta agregada con exito')
  }



  selectImageCabecera(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const newName = this.number + 'Cabecera.jpg';
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
      const newName = this.number + 'Etiqueta.jpg';
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
  Recibe_imgCabecera(event: any) {
    this.images2 = [];
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `imagenes de receta/portada/${file.name}`)

    uploadBytes(imgRef, file).then(async x => {
      const url = await getDownloadURL(imgRef)
      this.recetas.Imagen = url
      console.log(this.recetas.Imagen)
      return this.recetas.Imagen
    }).catch(error => console.log(error))
  }
  Recibe_imgEtiqueta(event: any) {
    this.images2 = [];
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `imagenes de receta/Etiqueta/${file.name}`)

    uploadBytes(imgRef, file).then(async x => {
      const url = await getDownloadURL(imgRef)
      this.recetas.Etiqueta = url
      console.log(this.recetas.Etiqueta)
      return this.recetas.Etiqueta
    }).catch(error => console.log(error))
  }

  getImagesCabecera() {
    const imagesRef = ref(this.storage, `${this.userid} ${this.nombre} ${this.apellido}`);

    listAll(imagesRef).then(async (images) => {
      this.images2 = [];
      for (let image of images.items) {
        const url = await getDownloadURL(image)
        this.images2.push(url)
        console.log(url)
      }
    }).catch(error => console.log(error))
  }

  ultimareceta() {
    this.recipe.lastRecipe().subscribe(res => {
      this.ultima = res
      console.log(this.ultima, 'ultima receta arriba')
      this.ultima.IdReceta += 1;
      this.number = this.ultima.IdReceta
      console.log(this.ultima, 'id de la receta que se subira')
      console.log(this.number, 'number')
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

  onPaste(event: ClipboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    const clipboardData:any = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const lines = pastedText.split('\n');
  
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim() + '♦';
    }
  
    const modifiedText = lines.join('\n');
    textarea.setRangeText(modifiedText, textarea.selectionStart, textarea.selectionEnd, 'end');
    event.preventDefault();
  }

  handleContextMenu(event: MouseEvent): void {
    const isCopyAction = (event.target as HTMLElement).getAttribute('data-copy-action');
    if (isCopyAction) {
      const textarea = event.target as HTMLTextAreaElement;
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      const lines = selectedText.split('\n');
      const modifiedLines = lines.map((line) => line.trim() + '♦');
      const modifiedText = modifiedLines.join('\n');
      // Aquí puedes ejecutar tu código para copiar el contenido modificado
      console.log('Texto copiado:', modifiedText);
    }
  }


}
