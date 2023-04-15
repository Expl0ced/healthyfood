import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewRecetaService } from 'src/app/services/view-receta.service';
import { ToastrService } from 'ngx-toastr';
import { SaverecipeService } from 'src/app/services/saverecipe.service';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  public isButtonVisible = true;

  public recetas: any = {}
  public key: string[] = []
  public ingredientes: string[] = []
  public preparacion: string[] = []
  public detalles: string[] = []
  public notas: string[] = []

  public recipe: any = {
    id: 0,
    idReceta: 0,
    idUser: localStorage.getItem('idUser')
  }

  constructor(private recetaService: ViewRecetaService,
    private activerouter: ActivatedRoute, private tostada: ToastrService,
    private saverecipe: SaverecipeService,
    private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.obtenerReceta()
    this.checkRecipe()
    this.updateColor()
  }

  obtenerReceta() {
    let recetaid: any = this.activerouter.snapshot.paramMap.get('id')
    let arrayING = []
    let arrayPREP = []
    let arrayDET = []
    let arrayNOT = []
    this.recetaService.getRecetabyID(recetaid).subscribe((resp: any) => {
      this.recetas = resp
      console.log(this.recetas.IdReceta)

      this.recipe.idReceta = this.recetas.IdReceta



      arrayING = this.recetas.Ingredientes
      if (this.recipe.idReceta <= 1615) {
        let arr = arrayING.split(',')
        let err = arr.map((item: any) => {
          return item.replace("[", "").replace("'", '').replace("]", '').replace("'", '').replace("\n", ', ')
        })
        this.ingredientes = err
      }
      else {
        let arr = arrayING.split('♦')
        console.log(arr)
        let err = arr.map((item: any) => {
          return item.replace("♦\n", ",")
        })
        this.ingredientes = err
      }


      arrayPREP = this.recetas.Preparacion
      if (this.recipe.idReceta <= 1615) {
        let prepsplit = arrayPREP.split(',')
        let prepmap = prepsplit.map((item: any) => {
          return item.replace("'['", "").replace("']'", '').replace("'", "").replace(".'", ".")
        })
        this.preparacion = prepmap
      }
      else {
        let prepsplit = arrayPREP.split('♦')
        let prepmap = prepsplit.map((item: any) => {
          return item.replace("♦", "")
        })
        this.preparacion = prepmap
      }


      arrayNOT = this.recetas.Notas
      if (this.recipe.idReceta <= 1615) {
        let notmap = arrayNOT.replace("'['", '').replace(".','", '.').replace("','", ",").replace("!','", '!').replace("']'", '')
        this.notas = notmap
      }
      else {
        let notmap = arrayNOT.replace("♦", "\n")
        this.notas = notmap
      }



      arrayDET = this.recetas.Detalles
      let comodin = arrayDET.replace("'[',", '')
        if (this.recipe.idReceta <= 1615) {
          let detsplit = comodin.split(',')
          let detmap = detsplit.map((item: any) => {
          return item.replace("[", '').replace("'", "").replace("',", ",").replace("']'", '').replace("'", '').replace("'", "")
        })
        this.detalles = detmap
        }
        else {
          let detsplit = comodin.split('♦')
          let detmap = detsplit.map((item: any) => {
          return item.replace("♦", "\n")
        })
        this.detalles = detmap
        }

    });

  };

  showSuccess() {
    this.tostada.success('Con exito en el portapapeles', 'El link ha sido copiado', { positionClass: 'toast-bottom-right' });
  }

  guardarReceta() {
    console.log(this.recipe)
    this.saverecipe.saveRecipe(this.recipe).subscribe((res: any) => {
      this.recipe = res
      console.log(this.recipe)
      setTimeout(() => {
        location.reload
      }, 500);
    })
  }

  deleteReceta() {
    this.saverecipe.deleteRecipe(this.recipe.idReceta).subscribe((res: any) => {
      this.recipe.idReceta = res
      console.log(res)
      setTimeout(() => {
        location.reload
      }, 500);
    })
  }

  checkRecipe() {
    this.saverecipe.comprobarRecipe(this.recipe.idReceta).subscribe((res: any) => {
      console.log(res)
    })
  }
  updateColor(): void {
    // Actualizar la propiedad color aquí
    this.cd.detectChanges(); // Forzar la detección de cambios después de actualizar color
  }

}
