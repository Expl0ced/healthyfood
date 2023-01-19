import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  public recetas:Array<any>=[]
  datos:any=[]
  // constructor(private _cuadroservice: CuadrosRecetaService) { }
  constructor(private recetaService:RecetaService,  private router: Router, private route:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.obtenerRecetas();
  }
  obtenerRecetas(){
    this.recetaService.getReceta().subscribe((resp:any[])=>{
      this.recetas=resp,
      (error:any)=>console.error(error)
    });
  }

  resetPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['./'],{
      relativeTo:this.route,
      queryParamsHandling:"merge"
    })
  }

}
