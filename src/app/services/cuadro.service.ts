import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CuadroService {

  url='https://api-rest-tesis.vercel.app/api/usuarios/'
  url_prueba="api/usuarios/"



  constructor(private http:HttpClient) { }

  

  updateUser(usuario:usuario, id:number):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.put<usuario>(this.url+`actualizar/${id}`, usuario, {
        headers:header
      })
    };
    getusuario(id:number):Observable<usuario>{
      let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
        return this.http.get<usuario>(this.url+id,{
          headers:header
        });
    };
  }