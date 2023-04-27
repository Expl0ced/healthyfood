import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { response } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ListaUsersService {
  _url = "https://api-rest-tesis.vercel.app/api/usuarios"
  url2 = 'https://api-rest-tesis.vercel.app/api/archivo/cuenta'
  urldelete: string = "";

  constructor(private http: HttpClient) { }



  obtenerUsers(): Observable<usuario[]> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get<usuario[]>(this._url, {
      headers: header
    });
  };

  createUser(user: usuario): Observable<usuario> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<usuario>(this._url, user, {
      headers: header
    });
  };

  getusuario(id: number): Observable<usuario> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get<usuario>(this._url + '/' + id, {headers:header})
  }

  updateUser(usuario: usuario): Observable<usuario> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.put<usuario>(this._url, usuario, {
      headers: header
    });
  };

  deleteUser(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.delete<response>(this._url + '/' + id, {
      headers: header
    });
  };

  countFile(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get(this.url2 + '/' + id,{headers:header})
  }


  usuarioExists(Email:any, Password:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

      return this.http.get(this._url+'usuarioExists/'+Email+'/'+Password,{headers:header})
  }
}