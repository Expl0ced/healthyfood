import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  // _url="http://localhost:3000"
  url_ = "/api/recetas/"
  url2 = 'http://localhost:3300/';
  constructor(private http: HttpClient) {
  }

  getReceta(): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get<any>(this.url_, {
      headers: header
    });
  }

  // getRecetabyID(id:string):Observable<Item>{
  //   let header = new HttpHeaders()
  //     .set('Type-content', 'aplication/json')

  //     return this.http.get<Item>(this.url_ + '/'+id, {
  //       headers:header
  //     });

  // }
  getRecetabyID(id: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get<Item>(this.url_ + id, {
      headers: header
    });

  }
  postReceta(receta: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
    return this.http.post<any>(this.url_, receta, {
      headers: header
    })
  }

  updateImagenReceta(recipeIMG:any): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.post<any>(this.url2+"imgrecipe", recipeIMG, {
        headers:header
      })
  }

  lastRecipe():Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    return this.http.get<any>(this.url_+"ultima/ingreso",{
      headers:header
    })
  }
}
