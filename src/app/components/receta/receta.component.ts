import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewRecetaService } from 'src/app/services/view-receta.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SaverecipeService } from 'src/app/services/saverecipe.service';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  public recetas:any={}
  public key:string[]=[]
  public ingredientes:string[]=[]
  public preparacion:string[]=[]
  public detalles:string[]=[]
  public notas:string[]=[]

  public recipe:any={
    id:0,
    idReceta:0,
    idUser:localStorage.getItem('idUser')
  }

  constructor(private recetaService: ViewRecetaService,
              private activerouter:ActivatedRoute, private tostada:ToastrService,
              private saverecipe: SaverecipeService) { }
  ngOnInit(): void {
    this.obtenerReceta()
  }

  obtenerReceta(){
    let recetaid:any=this.activerouter.snapshot.paramMap.get('id')
    let arrayING=[]
    let arrayPREP=[]
    let arrayDET=[]
    let arrayNOT=[]
    this.recetaService.getRecetabyID(recetaid).subscribe((resp:any)=>{
      this.recetas = resp
      console.log(this.recetas.IdReceta)

      this.recipe.idReceta=this.recetas.IdReceta

      

      arrayING=this.recetas.Ingredientes
      let arr=arrayING.split(',')
      let err=arr.map((item:any)=>{
        return item.replace("[","").replace("'",'').replace("]",'').replace("'",'')
      })
      this.ingredientes=err

      arrayPREP=this.recetas.Preparacion
      let prepsplit=arrayPREP.split(',')
      let prepmap=prepsplit.map((item:any)=>{
        return item.replace("'['","").replace("']'",'').replace("'","").replace(".'",".")
      })
      this.preparacion=prepmap

      arrayNOT=this.recetas.Notas
      let notmap=arrayNOT.replace("'['",'').replace(".','",'.').replace("','",",").replace("!','",'!').replace("']'",'')
      this.notas=notmap
      
      arrayDET=this.recetas.Detalles
      let comodin=arrayDET.replace("'[',",'')
      let detsplit=comodin.split(',')
      let detmap=detsplit.map((item:any)=>{
        return item.replace("'", "").replace("',",",").replace("']'",'').replace("'",'')
      })
      this.detalles=detmap

    });

  };

  showSuccess() {
    this.tostada.success('Con exito en el portapapeles', 'El link ha sido copiado', {positionClass:'toast-bottom-right'});
  }

  guardarReceta(){
    console.log(this.recipe)
    this.saverecipe.saveRecipe(this.recipe).subscribe((res:any)=>{
      this.recipe=res
      console.log(this.recipe)
    })

  }

}
