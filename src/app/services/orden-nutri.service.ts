import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenNutriService {
  url_="https://api-rest-tesis.vercel.app/api/orden_nutri/"

  constructor(private http:HttpClient) { }


  verOrdenes(id:number): Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

      return this.http.get<any>(this.url_+id, {
        headers:header
      });
  }
  verOrdenesNombre(nombre:string, apellido:string): Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

      return this.http.get<any>(this.url_+'nombre/'+nombre+'/apellido/'+apellido, {
        headers:header
      });
  }

  verOrden(): Observable<orden>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

      return this.http.get<orden>(this.url_, {
        headers:header
      });
  }

  obtenerImgUser(id:number){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get<any>(this.url_+"imguser/"+id,{
      headers:header
    })

  }
}
