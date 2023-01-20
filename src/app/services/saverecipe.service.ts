import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaverecipeService {
  url = '/api/saverecipe/'

  constructor(private http: HttpClient) { }

  getRecipe(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get<any>(this.url + id, {
      headers: header
    })
  }


  saveRecipe(recipe: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.post<any>(this.url, recipe, {
      headers: header
    })
  }
}
