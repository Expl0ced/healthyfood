import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class ModificarUserService {
  url_='https://api-rest-tesis.vercel.app/api/modificar_user/'
  // id=localStorage.getItem('idUser')
  constructor(private http:HttpClient) { }

  getusuario(id:number):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.get<usuario>(this.url_+id,{
        headers:header
      });
  };

  getUserLibres(id:number):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')  
      return this.http.get<any>(this.url_+"listado/"+id,{
        headers:header
      });
  };
  
  postOrden(usuario:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.post<any>(this.url_, usuario, {
        headers:header
      })
  }

  updateUser(usuario:usuario, id:number):Observable<usuario>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.put<usuario>(this.url_+id, usuario, {
        headers:header
      })

  };

  asigUser(orden:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      return this.http.post<any>(this.url_, orden,{
        headers:header
      })
  }




}
