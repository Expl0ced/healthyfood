import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewRecetaService } from 'src/app/services/view-receta.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private recetaService: ViewRecetaService,
              private activerouter:ActivatedRoute, private tostada:ToastrService) { }
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
      // this.key.push(this.recetas.Ingredientes)
      // console.log(this.recetas.Ingredientes)
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
      console.log(detsplit)
      let detmap=detsplit.map((item:any)=>{
        return item.replace("'", "").replace("',",",").replace("']'",'').replace("'",'')
      })
      this.detalles=detmap

    });

  };

  showSuccess() {
    this.tostada.success('Con exito en el portapapeles', 'El link ha sido copiado', {positionClass:'toast-bottom-right'});
  }

}
