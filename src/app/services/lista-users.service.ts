import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { response } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ListaUsersService {
  _url="/api/usuarios"
  url2='/api/archivo/cuenta'
  urldelete: string="";

  constructor(private http:HttpClient) { }



  obtenerUsers(): Observable<usuario[]> {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

      return this.http.get<usuario[]>(this._url, {
        headers:header
      });
  };

  createUser(user:usuario):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.post<usuario>(this._url, user,{
      headers:header
    });
  };

  getusuario(id:number):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.get<usuario>(this._url+'/'+id)
  }

  updateUser(usuario:usuario):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.put<usuario>(this._url, usuario, {
      headers:header
    });
  };

deleteUser(id:number):Observable<any>{
  let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      
    return this.http.delete<response>(this._url+'/'+id,{
      headers:header
    });
    };

    countFile(id:number):Observable<any>{
      let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

      return this.http.get(this.url2+'/'+id)
    }
}