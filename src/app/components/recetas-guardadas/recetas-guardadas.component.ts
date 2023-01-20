import { Component } from '@angular/core';
import { SaverecipeService } from 'src/app/services/saverecipe.service';

@Component({
  selector: 'app-recetas-guardadas',
  templateUrl: './recetas-guardadas.component.html',
  styleUrls: ['./recetas-guardadas.component.css']
})
export class RecetasGuardadasComponent {


  constructor(private saverecipe: SaverecipeService){

  }
  iduser:any=localStorage.getItem('idUser')
  recipe:any={
    id:0,
    idReceta:0,
    idUser:this.iduser,
    Encabezado:'',
    Imagen:''
  }
  nombre=localStorage.getItem('Nombre')
  apellido=localStorage.getItem('apellido')

  ngOnInit(){
    this.obtenerRecetas()
  }

  obtenerRecetas(){
    this.saverecipe.getRecipe(this.iduser).subscribe((resp:any)=>{
      this.recipe=resp,
      console.log(resp)
    });
  }

}
