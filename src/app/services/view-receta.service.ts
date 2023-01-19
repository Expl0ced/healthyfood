import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class ViewRecetaService {


  private recipe!:Item[];

  constructor(private http:HttpClient) { }

  url_="/api/recetas/"





  getRecetabyID(id:string):Observable<Item>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

      return this.http.get<Item>((this.url_+id), {
        headers:header
      });

  }
}
