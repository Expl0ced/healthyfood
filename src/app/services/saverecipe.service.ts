import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SaverecipeService {
  url = 'https://api-rest-tesis.vercel.app/api/saverecipe/'

  constructor(private http: HttpClient) { }

  getRecipe(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get<any>(this.url + id, {
      headers: header
    })
  }


  saveRecipe(recipe: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.post<any>(this.url, recipe, {
      headers: header
    })
  }

  deleteRecipe(id:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.delete<any>(this.url+id,{
        headers: header
      })
  }

  comprobarRecipe(id:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.get<any>(this.url+'comprobar/'+id,{
        headers:header
      })
  }
}
