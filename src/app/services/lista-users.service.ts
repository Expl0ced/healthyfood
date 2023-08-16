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
  comodin = "https://api-rest-tesis.vercel.app/api/usuarios/usuarioExists/"
  url2 = 'https://api-rest-tesis.vercel.app/api/archivo/cuenta'
  urldelete: string = "";
  url_prueba = 'https://api-rest-tesis.vercel.app/api/archivo/subir-Archivo/'
  prueba = "https://api-rest-tesis.vercel.app/api/archivo/subir-Archivo/"
  imagen_prueba="https://api-rest-tesis.vercel.app/api/usuarios"
  url_peso="https://api-rest-tesis.vercel.app/api/usuarios/peso_historico/"
  url_imc="https://api-rest-tesis.vercel.app/api/usuarios/imc_historico/"

  constructor(private http: HttpClient) { }



  obtenerUsers(): Observable<any[]> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get<usuario[]>(this._url, {
      headers: header
    });
  };

  createUser(user: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<any>(this._url, user, {
      headers: header
    });
  };

  getusuario(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get<any>(this._url + '/' + id, { headers: header })
  }

  updatePhotoUser(usuario: any, id: Number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.put<any>(this._url + `/${id}`, usuario, {
      headers: header
    });
  };

  deleteUser(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.delete<response>(this._url + `/${id}`, {
      headers: header
    });
  };

  countFile(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get(this.url2 + '/' + id, { headers: header })
  }


  usuarioExists(Email: any, Password: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get(this._url + '/usuarioExists/' + Email + '/' + Password, { headers: header })
  }


  subirArchivo(archivo: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.post(this.url_prueba, archivo, {
      headers: header
    })
  }
  actualizarFotoPerfil(id: number, imagen: any): Observable<any> {
    // let header = new HttpHeaders()
    //   .set('Content-Type', 'text/html; charset=utf-8')
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
      console.log('service', imagen)
    return this.http.put<any>(this._url+ `/update-img/${id}`,imagen, {
      headers: header
    })
  }
  actualizarFotoNutri(idnutri:number, imagen: any): Observable<any> {
    // let header = new HttpHeaders()
    //   .set('Content-Type', 'text/html; charset=utf-8')
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
      console.log('service 2', imagen)
    return this.http.put<any>(this._url+ `/update-imgNutri/${idnutri}`,imagen, {
      headers: header
    })
  }

  deleteAsignado(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.delete<response>(this._url+`/asignacion/${id}`, {
      headers: header
    });
  };

  createNutria(user: any): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<any>(this._url+'/registro_nutria/', user, {
      headers: header
    });
  };
  getPeso_hist(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get<any>(this.url_peso + `${id}`, { headers: header })
  }
  getIMC_hist(id: number): Observable<any> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get<any>(this.url_imc + `${id}`, { headers: header })
  }
}